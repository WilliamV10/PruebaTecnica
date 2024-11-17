package com.productos.productos.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RegistroUsuarioRequest {
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private String telefono;
    private LocalDate fechaNacimiento;
    private String rol;
}
