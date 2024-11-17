import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Swal from 'sweetalert2';
import './VerProductos.css';

const VerProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/productos/listar', {
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

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          await api.delete(`/productos/eliminar/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProductos(productos.filter((producto) => producto.id !== id));
          Swal.fire({
            icon: 'success',
            title: 'Producto eliminado',
            text: 'El producto se eliminó correctamente',
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el producto',
          });
        }
      }
    });
  };

  const handleEdit = (producto) => {
    setProductoSeleccionado(producto);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.put(`/productos/editar/${productoSeleccionado.id}`, productoSeleccionado, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(
        productos.map((producto) =>
          producto.id === productoSeleccionado.id ? productoSeleccionado : producto
        )
      );
      setProductoSeleccionado(null);
      Swal.fire({
        icon: 'success',
        title: 'Producto editado',
        text: 'El producto se editó correctamente',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo editar el producto',
      });
    }
  };

  const handleChange = (e) => {
    setProductoSeleccionado({ ...productoSeleccionado, [e.target.name]: e.target.value });
  };

  return (
    <div className="ver-productos-container">
      <h1>Lista de Productos</h1>
      <div className="productos-list">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-item">
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <p>Categoría: {producto.categoria}</p>
            <button onClick={() => handleEdit(producto)}>Editar</button>
            <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
          </div>
        ))}
      </div>

      {productoSeleccionado && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Producto</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={productoSeleccionado.nombre}
                onChange={handleChange}
                required
              />
              <textarea
                name="descripcion"
                placeholder="Descripción"
                value={productoSeleccionado.descripcion}
                onChange={handleChange}
                required
              ></textarea>
              <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={productoSeleccionado.precio}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="categoria"
                placeholder="Categoría"
                value={productoSeleccionado.categoria}
                onChange={handleChange}
                required
              />
              <button type="submit">Guardar Cambios</button>
              <button type="button" onClick={() => setProductoSeleccionado(null)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerProductos;