import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrarProducto from './pages/RegistrarProducto';
import VerProductos from './pages/VerProductos';
import Navbar from './components/Navbar';
import RegistrarUsuario from './pages/RegistrarUsuario';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Monitorea cambios en el localStorage para actualizar el estado
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />} {/* Navbar solo si hay sesión */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/registrar-producto"
          element={isLoggedIn ? <RegistrarProducto /> : <Navigate to="/login" />}
        />
        <Route
          path="/ver-productos"
          element={isLoggedIn ? <VerProductos /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/registrar-usuario" element={<RegistrarUsuario />} />
      </Routes>
    </Router>
  );
};

export default App;