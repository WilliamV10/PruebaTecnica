import React from 'react';
import './Dashboard.css'; // Importamos estilos

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token
    window.location.href = '/login'; // Redirige al login
  };

  return (
    <div className="dashboard-container">
      
      <div className="dashboard-content">
        <h1>Bienvenido a tu sección de registro de productos</h1>
        <div className="options">
          <div className="card">
            <h3>Registrar Producto</h3>
            <p>Accede al formulario para registrar un nuevo producto en el sistema.</p>
            <button onClick={() => (window.location.href = '/registrar-producto')}>
              Registrar Producto
            </button>
          </div>
          <div className="card">
            <h3>Ver Productos</h3>
            <p>Consulta la lista de productos registrados en el sistema.</p>
            <button onClick={() => (window.location.href = '/ver-productos')}>
              Ver Productos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;