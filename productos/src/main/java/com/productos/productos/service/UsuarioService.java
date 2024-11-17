package com.productos.productos.service;

import com.productos.productos.dto.RegistroUsuarioRequest;
import com.productos.productos.repository.UsuarioRepository;
import com.productos.productos.usuario.Usuario;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(); // Instancia de codificador de contraseñas
    }

    public Usuario registrarUsuario(Usuario usuario) {
        // Verificar si el email ya está registrado
        Optional<Usuario> existente = usuarioRepository.findByEmail(usuario.getEmail());
        if (existente.isPresent()) {
            throw new IllegalArgumentException("El correo ya está registrado.");
        }

        // Encriptar contraseña
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword())); // Usa la instancia global
        return usuarioRepository.save(usuario);
    }

    public Usuario buscarUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario crearUsuarioDesdeDto(RegistroUsuarioRequest dto) {
        // Verificar si el email ya está registrado
        Optional<Usuario> existente = usuarioRepository.findByEmail(dto.getEmail());
        if (existente.isPresent()) {
            throw new IllegalArgumentException("El correo ya está registrado.");
        }

        // Crear el usuario a partir del DTO
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(passwordEncoder.encode(dto.getPassword())); // Codificar contraseña
        usuario.setTelefono(dto.getTelefono());
        usuario.setFechaNacimiento(dto.getFechaNacimiento());
        usuario.setRol(dto.getRol() != null && !dto.getRol().isEmpty() ? dto.getRol() : "USUARIO"); // Asignar rol por defecto

        // Guardar el usuario en la base de datos
        return usuarioRepository.save(usuario);
    }
}
