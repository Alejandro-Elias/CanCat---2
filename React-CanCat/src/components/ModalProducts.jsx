import { Button, Image, Modal, Row, Col } from "react-bootstrap"
import PropTypes from 'prop-types';

export const ModalProducts = ({ show, handleClose, prod }) => {
    return (
        <Modal
            size="lg"
            centered
            show={show}
            onHide={handleClose}>
            <Modal.Header className='bg-dark text-light' >
                <Modal.Title>{prod.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-dark text-light'>
                <Row> 
                    <Col className="d-flex justify-content-center" sm={12} lg={4}>
                        <Image style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 400px)', objectFit: 'contain' }} className="img-fluid " src={prod.image1} alt={prod.name} />
                    </Col>
                    <Col sm={12} lg={8}>
                        <p>Descripción:  <strong>{prod.description}</strong> </p>
                        <p>Precio:  <strong>${prod.price}</strong></p>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className='bg-dark text-light'>
                <Button variant="outline-light" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
ModalProducts.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    prod: PropTypes.object
}