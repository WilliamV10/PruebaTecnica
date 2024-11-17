package com.productos.productos.controller;

import com.productos.productos.dto.LoginRequest;
import com.productos.productos.dto.RegistroUsuarioRequest;
import com.productos.productos.repository.UsuarioRepository;
import com.productos.productos.seguridad.JwtService;
import com.productos.productos.service.UsuarioService;
import com.productos.productos.usuario.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;
    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository; // Inyección de UsuarioRepository
    private final PasswordEncoder passwordEncoder; // Inyección de PasswordEncoder

    public UsuarioController(UsuarioService usuarioService, JwtService jwtService,
                             UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository; // Inicializar UsuarioRepository
        this.passwordEncoder = passwordEncoder; // Inicializar PasswordEncoder
    }

    @PostMapping("/registrar")
    public ResponseEntity<Usuario> registrarUsuario(@RequestBody RegistroUsuarioRequest registroUsuarioRequest) {
        Usuario usuario = usuarioService.crearUsuarioDesdeDto(registroUsuarioRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }

    @GetMapping("/buscar")
    public ResponseEntity<Usuario> buscarUsuarioPorEmail(@RequestParam String email) {
        Usuario usuario = usuarioService.buscarUsuarioPorEmail(email);
        return ResponseEntity.ok(usuario);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.listarUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // Busca el usuario por email
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

        if (usuarioOpt.isPresent() && passwordEncoder.matches(password, usuarioOpt.get().getPassword())) {
            // Genera un token si la contraseña coincide
            String token = jwtService.generarToken(email);
            return ResponseEntity.ok(token); // Devuelve el token
        }

        // Si no coincide, devuelve un error 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo o contraseña incorrectos");
    }
}
