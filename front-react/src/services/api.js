import axios from 'axios';
import Swal from 'sweetalert2';

// Crear una instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // URL base del backend
});


// Interceptar errores globalmente
api.interceptors.response.use(
  (response) => response, // Si hay una respuesta exitosa
  (error) => {
    if (error.response?.status === 403) {
      // Si es un error 403 (sin acceso)
      Swal.fire({
        icon: 'warning',
        title: 'Acceso denegado',
        text: 'No tienes acceso a este recurso, por favor inicia sesión.',
      });
    } else {
      // Para otros errores genéricos
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Ocurrió un error inesperado',
      });
    }
    return Promise.reject(error); // Asegúrate de rechazar para que las llamadas sepan del error
  }
);

export default api;
