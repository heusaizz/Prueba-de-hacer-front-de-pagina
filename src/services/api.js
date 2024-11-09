const API_URL = 'https://localhost:7251/api'; // Cambia esto según la URL de tu API

// Función para autenticar al usuario
export const authenticateUser   = async (username, password) => {
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

    const token = await response.text(); // Cambia a text() en lugar de json()
    console.log('Token JWT:', token);
    return token; // Devuelve el token directamente
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para obtener todos los usuarios
export const fetchAllUsers = async () => {
  const token = localStorage.getItem('jwtToken'); // Obtén el token del localStorage

  try {
    const response = await fetch(`${API_URL}/Admin/GetAllUsers`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Asegúrate de incluir el token
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

// Función para obtener todas las inscripciones
export const fetchAllEnrollments = async () => {
  const token = localStorage.getItem('jwtToken'); // Obtén el token del localStorage

  try {
    const response = await fetch(`${API_URL}/Enrollment/GetAllEnrollment`, { // Cambiado a /Enrollments
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Asegúrate de incluir el token
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener inscripciones');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para obtener todas las asignaturas (cursos)
export const fetchAllSubjects = async () => {
  const token = localStorage.getItem('jwtToken'); // Obtén el token del localStorage

  try {
    const response = await fetch(`${API_URL}/Subject/GetAllSubjects`, { // Cambiado a /Subjects
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Asegúrate de incluir el token
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener asignaturas');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};