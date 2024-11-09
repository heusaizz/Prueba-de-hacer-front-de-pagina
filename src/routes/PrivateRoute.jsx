
// src/routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Importa PropTypes

const PrivateRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('jwtToken'); // Verifica si el usuario está autenticado

    return isLoggedIn ? children : <Navigate to="/no-access" />; // Redirige a /no-access si no está autenticado
};

// Agrega la validación de propiedades
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired, // children debe ser un nodo React y es requerido
};

export default PrivateRoute;