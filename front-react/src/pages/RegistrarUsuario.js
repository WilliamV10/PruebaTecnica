import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir al login
import api from '../services/api';
import Swal from 'sweetalert2';
import './RegistrarUsuario.css';

const RegistrarUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    fechaNacimiento: '',
  });

  const [error, setError] = useState({
    nombre: false,
    apellido: false,
    email: false,
    password: false,
    telefono: false,
    fechaNacimiento: false,
  });

  const navigate = useNavigate(); // Hook para redirigir

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    const newError = {
      nombre: !usuario.nombre,
      apellido: !usuario.apellido,
      email: !usuario.email,
      password: !usuario.password,
      telefono: !usuario.telefono,
      fechaNacimiento: !usuario.fechaNacimiento,
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
      // Enviar los datos al backend
      await api.post('/usuarios/registrar', usuario);

      // Mensaje de éxito y redirección
      Swal.fire({
        icon: 'success',
        title: '¡Usuario registrado!',
        text: 'Serás redirigido al dashboard.',
        timer: 3000, // Tiempo de duración
        showConfirmButton: false, // Sin botón de confirmación
      });

      // Redirige al dashboard (o ruta de productos)
      setTimeout(() => navigate('/ver-productos'), 3000); // Redirige después del tiempo
    } catch (error) {
      // Mensaje de error con SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar usuario',
        text: error.response?.data?.message || 'Ocurrió un error inesperado',
      });
    }
  };

  return (
    <div className="registrar-usuario-container">
      <h1>Registrar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={usuario.nombre}
          onChange={handleChange}
          className={error.nombre ? 'error' : ''}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={usuario.apellido}
          onChange={handleChange}
          className={error.apellido ? 'error' : ''}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={usuario.email}
          onChange={handleChange}
          className={error.email ? 'error' : ''}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={usuario.password}
          onChange={handleChange}
          className={error.password ? 'error' : ''}
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono (8 a 15 dígitos)"
          value={usuario.telefono}
          onChange={handleChange}
          pattern="[0-9]{8,15}" // Validación en el frontend
          title="Debe contener entre 8 y 15 dígitos numéricos"
          className={error.telefono ? 'error' : ''}
          required
        />
        <input
          type="date"
          name="fechaNacimiento"
          placeholder="Fecha de Nacimiento"
          value={usuario.fechaNacimiento}
          onChange={handleChange}
          className={error.fechaNacimiento ? 'error' : ''}
          required
        />
        <button type="submit">Registrar</button>
        <button type="button" onClick={() => navigate('/login')}>
          Ir al Login
        </button>
      </form>
    </div>
  );
};

export default RegistrarUsuario;