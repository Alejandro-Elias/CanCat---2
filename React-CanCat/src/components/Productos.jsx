import  { useState, useEffect } from 'react';

function Productos() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://cancat.onrender.com/apis/products')
      .then(response => response.json())
      .then(data => setProducts(data.formattedProducts))
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  return products;
}

export default Productos;
