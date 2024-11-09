import { useEffect, useState } from 'react';
import { fetchAllUsers, fetchAllEnrollments, fetchAllSubjects } from '../services/api'; // Asegúrate de que estas funciones están correctamente definidas en api.js
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="admin-dashboard">
            <h1>Dashboard del Administrador</h1>
            <section>
                <h2>Usuarios</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name} - {user.role}</li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Inscripciones</h2>
                <ul>
                    {enrollments.map(enrollment => (
                        <li key={enrollment.id}>{enrollment.courseName}</li>
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