package com.productos.productos.repository;

import com.productos.productos.productos.Producto;
import com.productos.productos.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByUsuario(Usuario usuario);

    Optional<Producto> findByIdAndUsuario(Long id, Usuario usuario);

}
