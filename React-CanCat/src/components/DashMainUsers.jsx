
import "../css/DashMainUsers.css";
import CardUser from './CardUser.jsx'
import UserTable from './UserTable.jsx'
import { useState, useEffect } from 'react';

function DashMainUsers() {
    const [latestUser, setLatestUser] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://cancat.onrender.com/api/users');
                const data = await response.json();//
                setLatestUser(data.data[data.data.length - 1]);
                setTotalUsers(data.meta.total);
                
                setTotalAdmins(data.data.filter(user => user.roleId === 1).length);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="main_users">
            <div className="main-user_information">
                <div className='main-user_ultimo-creado'>
                    <h3>Ultimo Usuario creado</h3>
                    <CardUser userId={latestUser?.id} />
                </div>
                <div className='main-user_total'>
                    <h1>Total de Usuarios</h1>
                    <h2>{totalUsers}</h2>
                </div>
                <div className='main-user_admin'>
                    <h1>Total de Admin</h1>
                    <h2>{totalAdmins}</h2>
                </div>
            </div>
        <div className="main-users_dasboard">
            <div className='main-users_dasboard_header'>
                <h3 className='my-3 mx-2'>Usuarios</h3>
            </div>
            <div className='user_table'>
                <UserTable />
            </div>
        </div>
    </div>
    )
}

export default DashMainUsers;
