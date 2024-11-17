import React, { useState } from 'react';
import api from '../services/api';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './RegistrarProducto.css';

const RegistrarProducto = () => {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
  });

  const [error, setError] = useState({
    nombre: false,
    descripcion: false,
    precio: false,
    categoria: false,
  });

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    const newError = {
      nombre: !producto.nombre,
      descripcion: !producto.descripcion,
      precio: !producto.precio,
      categoria: !producto.categoria,
    };

    if (Object.values(newError).some((field) => field)) {
      setError(newError);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
      });
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Obtén el token almacenado
      await api.post('/productos/registrar', producto, {
        headers: { Authorization: `Bearer ${token}` }, // Envía el token
      });
      Swal.fire({
        icon: 'success',
        title: 'Producto registrado',
        text: 'El producto se registró correctamente',
      });
      setProducto({ nombre: '', descripcion: '', precio: '', categoria: '' }); // Limpia el formulario
      setError({ nombre: false, descripcion: false, precio: false, categoria: false }); // Limpia los errores
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar el producto',
      });
    }
  };

  return (
    <div className="registrar-container">
      <h1>Registrar Producto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={handleChange}
          className={error.nombre ? 'error' : ''}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={producto.descripcion}
          onChange={handleChange}
          className={error.descripcion ? 'error' : ''}
        ></textarea>
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={producto.precio}
          onChange={handleChange}
          className={error.precio ? 'error' : ''}
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={producto.categoria}
          onChange={handleChange}
          className={error.categoria ? 'error' : ''}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistrarProducto;