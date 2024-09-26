import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, FormLabel, Image, Modal, Row } from 'react-bootstrap';



export const ModalCreate = ({ showForm, handleCloseForm }) => {

  const [defaultImage] = useState('https://bubbleerp.sysfosolutions.com/img/default-pro.jpg');
  const [miniatura1, setMiniatura1] = useState(defaultImage);
  const [miniatura2, setMiniatura2] = useState(defaultImage);
  const [species, setSpecies] = useState([]);
  const [flavor, setFlavor] = useState([]);
  const [filing, setFiling] = useState([]);

  useEffect(() => {
    fetch('https://cancat.onrender.com/apis/species')
      .then(response => response.json())
      .then(data => setSpecies(data.formattedSpecies))
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  useEffect(() => {
    fetch('https://cancat.onrender.com/apis/flavor')
      .then(response => response.json())
      .then(data => setFlavor(data.formattedFlavor))
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  useEffect(() => {
    fetch('https://cancat.onrender.com/apis/filing')
      .then(response => response.json())
      .then(data => setFiling(data.formattedFiling))
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);


  const handleImagenChange1 = (event) => {
    const file = event.target.files[0];
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
    const reader = new FileReader();

    reader.onloadend = () => {
      setMiniatura2(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
  
    console.log(data);

    fetch('https://cancat.onrender.com/apis/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        console.log('Datos enviados exitosamente');
        handleCloseForm();
      } else {
        console.error('Fallo al enviar los datos');
      }
    })
    .catch(error => console.error('Error:', error));
  };



  return (
    <Modal
      size="xl"
      show={showForm}
      onHide={handleCloseForm}>
      <Modal.Header style={{ backgroundColor: "#0A6069" }} className='text-light d-flex w-100 justify-content-between px-4' >
        <Modal.Title>Producto : </Modal.Title>
        <Button variant="outline-light" onClick={handleCloseForm}>
          Cerrar
        </Button>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#0A6069" }} className=' text-light'>

        <Form onSubmit={handleSubmit}>
          <div className='d-flex flex-row gap-5'>
            <div className='col-6 ms-2'>

              <Row className="mb-2">
                <Form.Group as={Col} >
                  <Form.Label htmlFor="nombre">Nombre del Articulo</Form.Label>
                  <Form.Control type="text" name='nombre' placeholder="Nombre del Articulo..." />
                </Form.Group>
                <Form.Group as={Col} >
                  <Form.Label htmlFor="categoria">Especie</Form.Label>
                  <Form.Control as="select"  name='categoria' placeholder="Especie...">
                    <option value="" hidden>Seleccione...</option>
                    {species.map((opcion, index) => (
                      <option key={index} value={opcion.id}>{opcion.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

              </Row>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="brand">Marca</Form.Label>
                  <Form.Control type="text"  name='brand' placeholder="Marca..." />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="precio">Precio -$</Form.Label>
                  <Form.Control type="text"  name='precio' placeholder="$" />
                </Form.Group>

              </Row>

              <Row className="mb-2">
                <Form.Group as={Col} >
                  <Form.Label htmlFor="descuento">Descuento -%</Form.Label>
                  <Form.Control type="text"  name='descuento' placeholder="%" />
                </Form.Group>
                <Form.Group as={Col} >
                  <Form.Label htmlFor="stock">Stock</Form.Label>
                  <Form.Control type="text"  name='stock' placeholder="Stock..." />
                </Form.Group>
              </Row>

              <Row className="mb-4">
                <Form.Group as={Col} >
                  <Form.Label htmlFor="sabores">Sabor</Form.Label>
                  <Form.Control as="select"  name='sabores' placeholder="Especie...">
                    <option value="" hidden>Seleccione...</option>
                    {flavor.map((opcion, index) => (
                      <option key={index} value={opcion.id}>{opcion.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} >
                  <Form.Label htmlFor="measure">Medida</Form.Label>
                  <Form.Control as="select"  name='measure' placeholder="Especie...">
                    <option value="" hidden>Seleccione...</option>
                    {filing.map((opcion, index) => (
                      <option key={index} value={opcion.id}>{opcion.measure}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} >
                  <Form.Label htmlFor="value">Valor</Form.Label>
                  <Form.Control type="number" name='value' placeholder="Valor..." />
                </Form.Group>
              </Row>

            </div>

            <Row className="mt-2 mb-3 me-2 w-100 d-flex justify-content-between align-item-center">

              <Form.Group as={Col} className='d-flex flex-column justify-content-between gap-2'controlId="image1">
                <Form.Control type="file" placeholder="name@example.com" onChange={handleImagenChange1} hidden />
                <div className=" d-flex flex-column justify-content-betweem gap-3 justify-content-between">
                  <Image className='rounded w-auto img-fluid max-height  bg-light' style={{ height: "230px", maxHeight: '100%', width: 'auto', objectFit: 'contain' }} src={miniatura1} />
                </div>
                <FormLabel className='btn btn-outline-light mx-3 '  >Agregar imagen</FormLabel>
              </Form.Group>

              <Form.Group as={Col} className='d-flex flex-column justify-content-between gap-2'controlId="image2">
                <Form.Control type="file" placeholder="name@example.com" onChange={handleImagenChange2} hidden />
                <div className=" d-flex flex-column justify-content-betweem gap-3 justify-content-between">
                  <Image className='rounded w-auto img-fluid max-height  bg-light' style={{ height: "230px", maxHeight: '100%', width: 'auto', objectFit: 'contain' }} src={miniatura2} />
                </div>
                <FormLabel className='btn btn-outline-light mx-3 ' >Agregar imagen</FormLabel>
              </Form.Group>

            </Row>
          </div>
          <Row className="mb-2">
            <Form.Group as={Col} >
              <Form.Label htmlFor="descripcion" >Descripción del Producto</Form.Label>
              <Form.Control as="textarea"  name='descripcion' placeholder="Descripción..." rows={3} />
            </Form.Group>
          </Row>
      <Modal.Footer style={{ backgroundColor: "#0A6069" }} className='text-light px-4 mt-3'>
        <Button type='submit' variant="outline-light" >
          Enviar
        </Button>
      </Modal.Footer>

        </Form>
      </Modal.Body>
    </Modal>
  );
}
ModalCreate.propTypes = {
  showForm: PropTypes.bool,
  handleCloseForm: PropTypes.func,
}

