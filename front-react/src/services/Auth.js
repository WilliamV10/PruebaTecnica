import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from './api'; // Asegúrate de que la ruta sea correcta
import { isTokenValid } from './Auth'; // Asegúrate de que la ruta sea correcta

const AuthComponent = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const tokenValid = await isTokenValid();
      if (!tokenValid) {
        Swal.fire({
          icon: 'warning',
          title: 'Acceso denegado',
          text: 'Tu sesión ha expirado, por favor inicia sesión nuevamente.',
        });
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/productos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductos(response.data);
      } catch (error) {
        if (error.response?.status === 403) {
          Swal.fire({
            icon: 'warning',
            title: 'Acceso denegado',
            text: 'No tienes acceso a este recurso, por favor inicia sesión.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener la lista de productos',
          });
        }
      }
    };

    fetchProductos();
  }, []);

  return (
    <div>
      {/* Renderiza la lista de productos o cualquier otro contenido */}
      {productos.map((producto) => (
        <div key={producto.id}>
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <p>Precio: ${producto.precio}</p>
          <p>Categoría: {producto.categoria}</p>
        </div>
      ))}
    </div>
  );
};

export default AuthComponent;