package com.productos.productos.persona;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    @NotBlank(message = "El nombre no puede estar vacío")
    private String nombre;

    @Column(nullable = false, length = 50)
    @NotBlank(message = "El apellido no puede estar vacío")
    private String apellido;

    @Column(nullable = false, unique = true, length = 100)
    @Email(message = "El correo debe tener un formato válido")
    private String email;

    @Column(nullable = false)
    @Past(message = "La fecha de nacimiento debe ser una fecha pasada")
    private LocalDate fechaNacimiento;

    @Column(nullable = false, length = 15)
    @NotBlank(message = "El teléfono no puede estar vacío")
    @Pattern(regexp = "^[0-9]{8,15}$", message = "El teléfono debe contener entre 8 y 15 dígitos numéricos")
    private String telefono;
}
