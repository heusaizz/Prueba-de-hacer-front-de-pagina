const API_URL = 'https://localhost:7251/api'; // Cambia esto según la URL de tu API

// Función para autenticar al usuario
export const authenticateUser  = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/Authentication/Authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ UserName: username, Password: password }),
    });

    if (!response.ok) {
      throw new Error('Error de autenticación');
    }

    // Aquí asumimos que la respuesta es un token JWT
    const token = await response.text(); // Cambia a text() en lugar de json()
    console.log('Token JWT:', token);
    return token; // Devuelve el token directamente
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para obtener todos los usuarios (Ejemplo para el dashboard del administrador)
export const fetchAllUsers = async () => {
  const token = localStorage.getItem('token'); // Obtén el token del localStorage

  try {
    const response = await fetch(`${API_URL}/Admin/GetAllUsers`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllEnrollments = async () => {
  const response = await fetch(`${API_URL}/Admin/GetAllEnrollments`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'application/json',
      },
  });
  return response.json();
};

export const fetchAllCourses = async () => {
  const response = await fetch(`${API_URL}/Admin/GetAllCourses`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'application/json',
      },
  });
  return response.json();
};