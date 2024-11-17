import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Swal from 'sweetalert2';
import './LoginPage.css';

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Realiza la solicitud al backend para iniciar sesión
      const response = await api.post('/usuarios/login', { email, password });

      // Guarda el token en el localStorage
      localStorage.setItem('token', response.data);

      // Actualiza el estado de autenticación
      setIsLoggedIn(true);

      // Alerta de éxito con SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: 'Serás redirigido al dashboard.',
        timer: 3000,
        showConfirmButton: false,
        willClose: () => {
          navigate('/dashboard'); // Redirige al dashboard
        },
      });
    } catch (error) {
      // Maneja errores específicos basados en la respuesta del backend
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data || 'Ocurrió un error inesperado', // Usa el mensaje del backend si existe
      });
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
        <button
          type="button"
          className="register-button"
          onClick={() => navigate('/registrar-usuario')}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default LoginPage;