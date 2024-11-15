import { useEffect, useState } from 'react';
import { fetchAllUsers, fetchAllEnrollments, fetchAllSubjects, createUser, updateUser, deleteUser } from '../services/api'; // Asegúrate de que estas funciones están correctamente definidas en api.js
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false); // Falta agregar un cancel para poder sustraer el formulario si no se quiere usar
    const [formData, setFormData] = useState({ name: '', role: '', id: '' }); // Estado para los datos del formulario


    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await fetchAllUsers();
                const enrollmentsData = await fetchAllEnrollments();
                const subjectsData = await fetchAllSubjects();
                setUsers(usersData);
                setEnrollments(enrollmentsData);
                setSubjects(subjectsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                // Si hay un id, se actualiza
                await updateUser (formData.id, formData);
            } else {
                // Si no hay id, se crea un nuevo usuario
                await createUser (formData);
            }
            // Recargar los usuarios después de la operación
            const usersData = await fetchAllUsers();
            setUsers(usersData);
            setShowForm(false); // Cerrar el formulario después de enviar
            setFormData({ name: '', role: '', id: '' }); // Resetear el formulario
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser (id);
            const usersData = await fetchAllUsers();
            setUsers(usersData);
        } catch (error) {
            console.error("Error al eliminar el usuario: ", error);
        }
    }


    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="admin-dashboard">
            <h1>Vista Administrador</h1>

            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cerrar Formulario' : 'Agregar/Editar Usuario'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder='Nombre de la persona'
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    placeholder="Nombre de usuario"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    placeholder="Contraseña"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Correo electrónico"
                    required
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                    required
                >
                    <option value="0">Rol Admin</option>
                    <option value="1">Rol Alumno</option>
                    <option value="2">Rol Profesor</option>
                </select>
                <input
                    type="hidden"
                    name="id"
                    value={formData.id}
                />
                <button type="submit">Enviar</button>
            </form>
            )}

            <section>
                <h2>Usuarios</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.name} - {user.username} - {user.role}
                            <button onClick={() => setFormData({ name: user.name, role: user.role, id: user.id })}>Editar</button>
                            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Usuarios</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name} - {user.role}  <h3>Legajo: </h3> {user.id}</li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Inscripciones</h2>
                <ul>
                    {enrollments.map(enrollment => (
                        <li key={enrollment.id}>{enrollment.subjectTitle} <h3>Legajo: </h3> {enrollment.clientId} </li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Asignaturas</h2>
                <ul>
                    {subjects.map(subject => (
                        <li key={subject.id}>{subject.title}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminDashboard;