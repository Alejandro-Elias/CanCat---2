import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import '../css/CardProduct.css';

function CardProduct({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://cancat.onrender.com/apis/products/${productId}`)
      .then(response => response.json())
      .then(data => setProduct(data.Producto))
      .catch(error => console.error('Error al obtener el producto:', error));
  }, [productId]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="CardProduct">
      <div >{product.image1 && <img className="CardProduct_imagen" src={product.image1} alt={product.name} />}</div>
      <div className='CardProduct_datos'>
      <div className="CardProduct_nombre">{product.name}</div>
      <div className="CardProduct_marca">Marca: {product.Marca}</div>
      <div className="CardProduct_tamaño">{product.tamaño}</div>
      <div className="CardProduct_description">{product.description}</div>
      </div>
    </div>
  );
}

CardProduct.propTypes = {
  productId : PropTypes.number.isRequired
}

export default CardProduct;
