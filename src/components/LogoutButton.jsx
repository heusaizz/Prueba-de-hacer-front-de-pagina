// src/components/LogoutButton.jsx
import { useNavigate } from 'react-router-dom';
import "./LogoutButton.css";


const LogoutButton = () => {
    const history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken'); // Elimina el token
        history.push('/login'); // Redirige a la página de inicio de sesión
    };

    // Verifica si el usuario está logueado
    const isLoggedIn = !!localStorage.getItem('jwtToken');

    if (!isLoggedIn) {
        return null; // No renderiza el botón si no hay token
    }

    return (
        <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
        </button>
    );
};

export default LogoutButton;