import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import '../css/CardUser.css';

function CardUser({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://cancat.onrender.com/api/users/${userId}`);
                const data = await response.json();
                setUser(data.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    if (!user) {
        return <div>Cargando...</div>;
    }

    let role = '';
    if (user.roleId === 1) {
        role = 'Admin';
    } else if (user.roleId === 2) {
        role = 'Usuario';
    }

    return (
        <div className="CardUser">
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
            <h3>{role}</h3>
        </div>
    );
}

CardUser.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default CardUser;
