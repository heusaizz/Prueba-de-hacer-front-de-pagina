import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../services/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Dashboard del Administrador</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;