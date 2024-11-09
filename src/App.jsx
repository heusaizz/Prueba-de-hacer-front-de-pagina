import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import ProfessorDashboard from './components/ProfessorDashboard';
import ClientDashboard from './components/ClientDashboard';
import Login from './components/Login'; // Importa el componente Login

const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Iniciar Sesión</Link></li> {/* Agrega un enlace al Login */}
                    <li><Link to="/professor-dashboard">Dashboard del Profesor</Link></li>
                    <li><Link to="/client-dashboard">Dashboard del Estudiante</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} /> {/* Agrega la ruta para el Login */}
                <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
                <Route path="/client-dashboard" element={<ClientDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;