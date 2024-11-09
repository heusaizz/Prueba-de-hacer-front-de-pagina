import { useState } from 'react';
import { authenticateUser  } from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await authenticateUser (username, password);
      localStorage.setItem('jwtToken', token); // Guarda el token en el localStorage
      // Redirigir a la página de dashboard (puedes usar react-router-dom para esto)
    } catch (error) {
      console.error('Error de autenticación:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;