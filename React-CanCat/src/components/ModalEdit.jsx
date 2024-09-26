import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, FormLabel, Image, Modal, Row } from 'react-bootstrap';

export const ModalEdit = ({ showForm, handleCloseForm, prod }) => {
  const [defaultImage] = useState('https://bubbleerp.sysfosolutions.com/img/default-pro.jpg');
  const [miniatura1, setMiniatura1] = useState(defaultImage);
  const [miniatura2, setMiniatura2] = useState(defaultImage);
  const [species, setSpecies] = useState([]);
  const [flavor, setFlavor] = useState([]);
  const [filing, setFiling] = useState([]);
  const [file1, setFile1] = useState(null)
  const [file2, setFile2] = useState(null)
  const [formValue, setFormValue] = useState({
    "nombre": prod?.name || '',
    "categoria": prod?.specieId || '',
    "brand": prod?.brandId || '',
    "precio": prod?.price || '',
    "descuento": prod?.discount || '',
    "stock": prod?.product_stock[0]?.amount || '',
    "sabores": prod?.product_flavor?.name || '',
    "measure": prod?.filingId || '',
    "value": prod?.value || '',
    "descripcion": prod?.description || '',
    "image1": prod?.image1 || '',
    "image2": prod?.image2 || '',
  });

  useEffect(() => {
    fetch('https://cancat.onrender.com/apis/species')
      .then(response => response.json())
      .then(data => setSpecies(data.formattedSpecies))
      .catch(error => console.error('Error al obtener las especies:', error));

    fetch('https://cancat.onrender.com/apis/flavor')
      .then(response => response.json())
      .then(data => setFlavor(data.formattedFlavor))
      .catch(error => console.error('Error al obtener los sabores:', error));

    fetch('https://cancat.onrender.com/apis/filing')
      .then(response => response.json())
      .then(data => setFiling(data.formattedFiling))
      .catch(error => console.error('Error al obtener las medidas:', error));
  }, []);

  const handleImagenChange1 = (event) => {
    const file = event.target.files[0];
    setFile1(file)
    const reader = new FileReader();

    reader.onloadend = () => {
      setMiniatura1(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImagenChange2 = (event) => {
    const file = event.target.files[0];
    setFile2(file)
    const reader = new FileReader();

    reader.onloadend = () => {
      setMiniatura2(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setFormValue(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData1 = new FormData();
    formData1.append('image1', file1)

    const formData2 = new FormData();
    formData2.append('image2', file2)

    try {
      const response = await fetch(`https://cancat.onrender.com/apis/products/${prod.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValue)
    });      
        if (response.ok) {
          console.log('Datos enviados exitosamente');
          handleCloseForm();
        } else {
          console.error('Fallo al enviar los datos');
        }

  const response2 = await fetch(`https://cancat.onrender.com/productos/update/${prod.id}`, {
    method: 'PUT',
    body: formData1     
  });

  const result1 = await response2.json();

  const response3 = await fetch(`https://cancat.onrender.com/productos/update/${prod.id}`, {
    method: 'PUT',
    body: formData2     
  });

  const result2 = await response3.json()

  if (result1.success || result2.success) {
    console.log('imagen/es subidas');    
  } else {
    console.log('no se subieron imagenes');
  }

    } catch (error) {
      error => console.error('Error:', error)
    }

  } 

  return (
    <Modal
      size="xl"
      show={showForm}
      onHide={handleCloseForm}>
      <Modal.Header style={{ backgroundColor: "#0A6069" }} className='text-light d-flex w-100 justify-content-between px-4' >
        <Modal.Title>Producto : {formValue.nombre}</Modal.Title>
        <Button variant="outline-light" onClick={handleCloseForm}>
          Cerrar
        </Button>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#0A6069" }} className=' text-light'>
        <Form onSubmit={handleSubmit}>
          <div className='d-flex flex-row gap-5'>
            <div className='col-6 ms-2'>
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label htmlFor="nombre">Nombre del Articulo</Form.Label>
                  <Form.Control id="nombre" name='nombre' type="text" value={formValue.nombre} onChange={handleInputChange} placeholder="Nombre del Articulo..." />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="categoria">Especie</Form.Label>
                  <Form.Control as="select" name='categoria' onChange={handleInputChange} placeholder="Especie...">
                    {species.map((opcion, index) => (
                      <option key={index} value="{opcion.id}">{opcion.name}</option>
                    ))}
                  </Form.Control>



                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="brand">Marca</Form.Label>
                  <Form.Control id="brand" name='brand' type="text" value={formValue.brand} onChange={handleInputChange} placeholder="Marca..." />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="precio">Precio -$</Form.Label>
                  <Form.Control id="precio" name='precio' type="number" value={formValue.precio} onChange={handleInputChange} placeholder="$" />
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label htmlFor="descuento">Descuento -%</Form.Label>
                  <Form.Control id="descuento" name='descuento' type="number" value={formValue.descuento} onChange={handleInputChange} placeholder="%" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="stock">Stock</Form.Label>
                  <Form.Control id="stock" name='stock' type="number" value={formValue.stock} onChange={handleInputChange} placeholder="Stock..." />
                </Form.Group>
              </Row>
              <Row className="mb-4">
                <Form.Group as={Col}>
                  <Form.Label htmlFor="sabores">Sabor</Form.Label>
                  <Form.Control as="select" name='sabores' onChange={handleInputChange} placeholder="Especie...">
                    {flavor.map((opcion, index) => (
                      <option key={opcion + index} value="{opcion.id}">{opcion.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="measure">Medida</Form.Label>
                  <Form.Control as="select" name='measure'  onChange={handleInputChange} placeholder="Medidas...">
                    {filing.map((opcion, index) => (
                      <option key={opcion + index} value="{opcion.id}">{opcion.measure}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="value">Valor</Form.Label>
                  <Form.Control id="value" name='value' type="number" value={formValue.value} onChange={handleInputChange} placeholder="Valor..." />
                </Form.Group>
              </Row>
            </div>
            <Row className="mt-2 mb-3 me-2 w-100 d-flex justify-content-between align-item-center">
              <Form.Group as={Col} className='d-flex flex-column justify-content-between gap-2' controlId="image1">
                <Form.Control type="file" placeholder="name@example.com" onChange={handleImagenChange1} hidden />
                <div className=" d-flex flex-column justify-content-betweem gap-3 justify-content-between">
                  <Image className='rounded w-auto img-fluid max-height  bg-light' style={{ height: "230px", maxHeight: '100%', width: 'auto',objectFit: 'contain' }} src= {miniatura1 != defaultImage ? miniatura1 : formValue.image1} />
                </div>
                <FormLabel className='btn btn-outline-light mx-3 '  >Agregar imagen</FormLabel>
              </Form.Group>
              <Form.Group as={Col} className='d-flex flex-column justify-content-between gap-2' controlId="image2">
                <Form.Control type="file" placeholder="name@example.com" onChange={handleImagenChange2} hidden />
                <div className=" d-flex flex-column justify-content-betweem gap-3 justify-content-between">
                  <Image className='rounded w-auto img-fluid max-height  bg-light' style={{ height: "230px", maxHeight: '100%', width: 'auto', objectFit: 'contain' }} src={miniatura2 != defaultImage ? miniatura2 : formValue.image2} />
                </div>
                <FormLabel className='btn btn-outline-light mx-3 ' >Agregar imagen</FormLabel>
              </Form.Group>
            </Row>
          </div>
          <Row className="mb-2">
            <Form.Group as={Col}>
              <Form.Label htmlFor="descripcion" >Detalle del Producto</Form.Label>
              <Form.Control id="descripcion" name='descripcion' as="textarea" value={formValue.descripcion} onChange={handleInputChange} placeholder="Descripción..." rows={3} />
            </Form.Group>
          </Row>
          <Modal.Footer style={{ backgroundColor: "#0A6069" }} className='text-light px-4 mt-3' >
            <Form.Control type="hidden" name="id" value={prod.id} />
            <Button type='submit' variant="outline-light" >
              Enviar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

ModalEdit.propTypes = {
  showForm: PropTypes.bool,
  handleCloseForm: PropTypes.func,
  prod: PropTypes.object
}
