import { useEffect, useState } from 'react';
import { fetchAllUsers, fetchAllEnrollments, fetchAllCourses } from '../services/api'; // Asegúrate de tener estas funciones en tu servicio
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await fetchAllUsers();
                const enrollmentsData = await fetchAllEnrollments();
                const coursesData = await fetchAllCourses();
                setUsers(usersData);
                setEnrollments(enrollmentsData);
                setCourses(coursesData);
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
                        <li key={enrollment.id}>{enrollment.title} - {enrollment.description}</li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Cursos</h2>
                <ul>
                    {courses.map(course => (
                        <li key={course.id}>{course.name}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminDashboard;