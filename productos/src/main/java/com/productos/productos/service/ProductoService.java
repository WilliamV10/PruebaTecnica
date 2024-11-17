package com.productos.productos.service;

import com.productos.productos.productos.Producto;
import com.productos.productos.repository.ProductoRepository;
import com.productos.productos.repository.UsuarioRepository;
import com.productos.productos.usuario.Usuario;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProductoService {
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    public ProductoService(ProductoRepository productoRepository, UsuarioRepository usuarioRepository) {
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Producto registrarProducto(Producto producto, String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        producto.setUsuario(usuario);
        return productoRepository.save(producto);
    }

    public List<Producto> listarProductosPorUsuario(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return productoRepository.findByUsuario(usuario);
    }

    public Producto editarProducto(Long id, Producto producto, String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Producto productoExistente = productoRepository.findByIdAndUsuario(id, usuario)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado o no pertenece al usuario"));
        productoExistente.setNombre(producto.getNombre());
        productoExistente.setDescripcion(producto.getDescripcion());
        productoExistente.setPrecio(producto.getPrecio());
        productoExistente.setCategoria(producto.getCategoria());
        return productoRepository.save(productoExistente);
    }

    public void eliminarProducto(Long id, String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Producto producto = productoRepository.findByIdAndUsuario(id, usuario)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado o no pertenece al usuario"));
        productoRepository.delete(producto);
    }
}
