import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get('/productos/listar');
        setProductos(response.data);
      } catch (error) {
        alert('Error al cargar los productos');
      }
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - {producto.precio}$
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductosPage;
