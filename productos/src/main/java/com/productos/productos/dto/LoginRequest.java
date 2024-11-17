package com.productos.productos.dto;

import lombok.Data;

@Data // Generar automáticamente getters, setters, toString, equals, y hashCode
public class LoginRequest {
    private String email;
    private String password;
}
