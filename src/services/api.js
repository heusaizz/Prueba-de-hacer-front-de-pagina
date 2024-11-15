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

export const createUser  = async (userData) => {
  const token = localStorage.getItem('jwtToken'); // Obtén el token del localStorage

  try {
    const response = await fetch(`${API_URL}/Admin/CreateUser`, { // Eliminar espacio
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        username: userData.username,
        password: userData.password,
        email: userData.email,
        role: userData.role // Asegúrate de que sea un número
      }),
    });

    if (!response.ok) {
      throw new Error('Error al crear el usuario');
    }

    const data = await response.json();
    return data; // Devuelve los datos del nuevo usuario
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para actualizar un usuario
export const updateUser  = async (id, userData) => {
  const token = localStorage.getItem('jwtToken'); // Obtén el token del localStorage

  try {
    const response = await fetch(`${API_URL}/Admin/UpdateUser/${id}`, { // Eliminar espacio
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
        email: userData.email,
        role: userData.role // Asegúrate de que sea un número
      }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el usuario');
    }

    const data = await response.json();
    return data; // Devuelve los datos del usuario actualizado
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser  = async (id) => {
  const token = localStorage.getItem('jwtToken'); // Obtén el token del localStorage

  try {
    const response = await fetch(`${API_URL}/Admin/DeleteUser/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el usuario');
    }

    return true; // Devuelve true si la eliminación fue exitosa
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para crear una nueva inscripción
export const createEnrollment = async (enrollmentData) => {
  const token = localStorage.getItem('jwtToken'); // Obtén el token del localStorage

  try {
      const response = await fetch(`${API_URL}/Enrollment/CreateEnrollment`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(enrollmentData),
      });

      if (!response.ok) {
          throw new Error('Error al crear la inscripción');
      }

      const data = await response.json();
      return data; // Devuelve los datos de la nueva inscripción
  } catch (error) {
      console.error(error);
      throw error;
  }
};

// Función para eliminar una inscripción
export const deleteEnrollment = async (id) => {
  const token = localStorage.getItem('jwtToken'); // Obtén el token del localStorage

  try {
      const response = await fetch(`${API_URL}/Enrollment/DeleteEnrollment/${id}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error('Error al eliminar la inscripción');
      }

      return true; // Devuelve true si la eliminación fue exitosa
  } catch (error) {
      console.error(error);
      throw error;
  }
};

// Función para crear una nueva asignatura
export const createSubject = async (subjectData) => {
  const token = localStorage.getItem('jwtToken'); // Obtén el token del localStorage

  try {
      const response = await fetch(`${API_URL}/Subject/CreateSubject`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(subjectData),
      });

      if (!response.ok) {
          throw new Error('Error al crear la asignatura');
      }

      const data = await response.json();
      return data; // Devuelve los datos de la nueva asignatura
  } catch (error) {
      console.error(error);
      throw error;
  }
};

// Función para eliminar una asignatura
export const deleteSubject = async (id) => {
  const token = localStorage.getItem('jwtToken'); // Obtén el token del localStorage

  try {
      const response = await fetch(`${API_URL}/Subject/DeleteSubject/${id}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error('Error al eliminar la asignatura');
      }

      return true; // Devuelve true si la eliminación fue exitosa
  } catch (error) {
      console.error(error);
      throw error;
  }
};
