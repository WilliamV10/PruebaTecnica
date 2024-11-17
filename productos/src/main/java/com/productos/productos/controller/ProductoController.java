package com.productos.productos.controller;

import com.productos.productos.productos.Producto;
import com.productos.productos.seguridad.JwtService;
import com.productos.productos.service.ProductoService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService productoService;
    private final JwtService jwtService;

    public ProductoController(ProductoService productoService, JwtService jwtService) {
        this.productoService = productoService;
        this.jwtService = jwtService;
    }

    // Registrar producto
    @PostMapping("/registrar")
    public ResponseEntity<Producto> registrarProducto(@RequestBody Producto producto, @RequestHeader("Authorization") String token) {
        String email = jwtService.validarToken(token.replace("Bearer ", ""));
        Producto nuevoProducto = productoService.registrarProducto(producto, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
    }

    // Listar productos del usuario autenticado
    @GetMapping("/listar")
    public ResponseEntity<List<Producto>> listarProductos(@RequestHeader("Authorization") String token) {
        String email = jwtService.validarToken(token.replace("Bearer ", ""));
        List<Producto> productos = productoService.listarProductosPorUsuario(email);
        return ResponseEntity.ok(productos);
    }

    // Editar producto
    @PutMapping("/editar/{id}")
    public ResponseEntity<Producto> editarProducto(
            @PathVariable Long id,
            @RequestBody Producto producto,
            @RequestHeader("Authorization") String token) {
        String email = jwtService.validarToken(token.replace("Bearer ", ""));
        Producto productoEditado = productoService.editarProducto(id, producto, email);
        return ResponseEntity.ok(productoEditado);
    }

    // Eliminar producto
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminarProducto(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {
        String email = jwtService.validarToken(token.replace("Bearer ", ""));
        productoService.eliminarProducto(id, email);
        return ResponseEntity.noContent().build();
    }
}
