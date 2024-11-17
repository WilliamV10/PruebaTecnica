import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token de sesión
    setIsLoggedIn(false); // Actualiza el estado de autenticación
    navigate('/login'); // Redirige al login
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-title">
        <h2>Registro de productos</h2>
      </Link>
      <div className="navbar-links">
        <Link to="/registrar-producto">Registrar Producto</Link>
        <Link to="/ver-productos">Ver Productos</Link>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default Navbar;