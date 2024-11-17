package com.productos.productos.usuario;
import com.productos.productos.persona.Persona;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuarios") // Nombre de la tabla en la base de datos
public class Usuario extends Persona {

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 20)
    private String rol; // Ejemplo: "ADMIN", "USUARIO", etc.
}
