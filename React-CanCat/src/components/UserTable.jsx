import { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetch('https://cancat.onrender.com/api/users')
      .then(response => response.json())
      .then(data => setUsers(data.data))
      .catch(error => console.error('Error al obtener los usuarios:', error));
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.roleId.toString().includes(searchTerm)
  );

  useEffect(() => {
    setNoResults(filteredUsers.length === 0);
  }, [filteredUsers]);

  const handleButtonClick = (event, userId) => {
    const role = event.target.value;
  
    enviarRolAlServidor(userId, role);
  };
  
  const enviarRolAlServidor = (userId, role) => {
    const data = {
      roleId: role == 1 ? 2 : 1
    };
  
    fetch(`https://cancat.onrender.com/api/users/jerarquia/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        console.log('Enviado exitosamente');
        return response.json();
      } else {
        throw new Error('Fallo el envio');
      }
    })
    .then(() => {
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return { ...user, roleId: data.roleId };
        }
        return user;
      });
      setUsers(updatedUsers);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Buscar por nombre, email, rol..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {noResults && <p>Usuario no encontrado</p>}
      {!noResults && (
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr className="table_users_header">
              <th className="table_users_header_name">Nombre</th>
              <th className="table_users_header_mail">Mail</th>
              <th className="table_users_header_rol">Rol</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className={`btn btn-${user.roleId == 1 ? "success" : "primary"} w-50 d-flex justify-content-center`} key={user.id} onClick={(event) => handleButtonClick(event, user.id)} value={user.roleId} >{user.roleId == 1 ? "Admin" : "Usuario"}  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserTable;
