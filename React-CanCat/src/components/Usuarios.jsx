import { useState, useEffect } from 'react';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('https://cancat.onrender.com/apis/users')
      .then(response => response.json())
      .then(data => setUsuarios(data.usuarios))
      .catch(error => console.error('Error al obtener los usuarios:', error));
  }, []);

  return usuarios;
}

export default Usuarios;