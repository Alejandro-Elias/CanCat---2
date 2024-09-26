import  { useState, useEffect, useContext } from 'react';
import '../css/DashMainProducts.css';
import ProductTable from './ProductTable.jsx';
import CardProduct from './CardProduct.jsx';
import { ProductsContext } from './ProductsProvider.jsx';
import { Button } from 'react-bootstrap';
import { ModalCreate } from './ModalCreate.jsx';

function DashMainProducts() {
  const products = useContext(ProductsContext);
  const [ultimoProducto, setUltimoProducto] = useState(null);
  const [totalProductos, setTotalProductos] = useState(0);
  const [productosSinStock, setProductosSinStock] = useState([]);
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    fetch('https://cancat.onrender.com/apis/species')
      .then(response => response.json())
      .then(data => setSpecies(data.formattedSpecies))
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);
  

  const [showForm, setShowForm] = useState(false);

  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = async () => {
    setShowForm(true)      
    }

  useEffect(() => {
    if (products.length > 0) {
      setUltimoProducto(products[products.length - 1]);
      setTotalProductos(products.length);
      setProductosSinStock(products.filter(product => product.stock === 0));
    }
  }, [products]);

  return (
    <div className="main-products">
      <div className="main-products_information">
        <div className='main-products_ultimo-agregado'>
          <h2>Último agregado</h2>
          {ultimoProducto && <CardProduct productId={ultimoProducto.id} />}
        </div>
        <div className='main-products_metricas'>
          <div className='main-products_total'>
            <h1>Total de productos</h1>
            <h2>{totalProductos}</h2>
          </div>
          <div className='main-products_sin-stock'>
            <h1>Productos sin stock</h1>
            <h2>{productosSinStock.length}</h2>
          </div>
        </div>
        <div className='main-products_all_genres'>
          <h1>Géneros</h1>
          {species.map((genero, index) => (
            <h2 key={index}>{genero.name}</h2>
          ))}
        </div>
      </div>
      <div className="main-products_dasboard">
        <div className='main-products_dasboard_header'>
          <h3 className='my-3 mx-2'>Productos</h3>
          <Button variant="outline-light" onClick={() => handleShowForm()} >Nuevo producto</Button>
        </div>
        <div className='Product-Table'>
          <ProductTable />
        </div>
      </div>
      <ModalCreate
        showForm={showForm} 
        handleCloseForm={handleCloseForm} 
        />
    </div>
  );
}

export default DashMainProducts;
