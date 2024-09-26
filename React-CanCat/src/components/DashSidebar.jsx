import { useState } from 'react';
import '../css/DashSidebar.css';
import PropTypes from 'prop-types';

function DashSidebar({ setDisplayProducts, setDisplayUsers }) {
  const [selectedButton, setSelectedButton] = useState('Productos');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    if (buttonName === 'Productos') {
      setDisplayProducts(true);
      setDisplayUsers(false);
    } else if (buttonName === 'Usuarios') {
      setDisplayProducts(false);
      setDisplayUsers(true);
    }
  };

  return (
    <div className="sidebar">
      <h1>CanCat</h1>
      <button
        className={`sidebar_button ${selectedButton === 'Productos' ? 'selected' : ''}`}
        onClick={() => handleButtonClick('Productos')}
      >
        Productos
      </button>
      <button
        className={`sidebar_button ${selectedButton === 'Usuarios' ? 'selected' : ''}`}
        onClick={() => handleButtonClick('Usuarios')}
      >
        Usuarios
      </button>
    </div>
  );
}

DashSidebar.propTypes = {
  setDisplayProducts: PropTypes.func.isRequired,
  setDisplayUsers: PropTypes.func.isRequired,
};

export default DashSidebar;
