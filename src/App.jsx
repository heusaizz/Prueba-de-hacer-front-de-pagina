// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import ProfessorDashboard from './components/ProfessorDashboard';
import ClientDashboard from './components/ClientDashboard';
import Login from './components/Login';
import AdminDashboard from "./components/AdminDashboard";
import LogoutButton from './components/LogoutButton'; // Importa el LogoutButton
import PrivateRoute from './routes/PrivateRoute'; // Importa el componente PrivateRoute
import NoAccess from './routes/NoAccess'; // Importa la página de acceso denegado

const App = () => {
    // Verifica si el usuario está autenticado
    const isLoggedIn = !!localStorage.getItem('jwtToken');

    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Iniciar Sesión</Link></li>
                    {isLoggedIn && (
                        <>
                            <li><Link to="/professor-dashboard">Dashboard del Profesor</Link></li>
                            <li><Link to="/client-dashboard">Dashboard del Estudiante</Link></li>
                            <li><Link to="/admin-dashboard">Dashboard del Administrador</Link></li>
                            <LogoutButton /> {/* Renderiza el botón de cerrar sesión solo si está logueado */}
                        </>
                    )}
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route 
                    path="/professor-dashboard" 
                    element={
                        <PrivateRoute>
                            <ProfessorDashboard />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/client-dashboard" 
                    element={
                        <PrivateRoute>
                            <ClientDashboard />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/admin-dashboard" 
                    element={
                        <PrivateRoute>
                            <AdminDashboard />
                        </PrivateRoute>
                    } 
                />
                <Route path="/no-access" element={<NoAccess />} /> {/* Ruta para acceso denegado */}
            </Routes>
        </Router>
    );
};

export default App;