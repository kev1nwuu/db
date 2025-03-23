import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';

const BookingModal = (props) => {
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState({ SSN: "", name: "", address: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createBooking = async () =>{
    try {
      const resCus = fetch("http://localhost:5000/createCustomer", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formValues)
      });

      const startDate = props.startDate;
      const endDate = props.endDate;
      const roomID = props.roomID;
      const ssn = formValues.SSN;
      const data = {startDate, endDate, roomID, ssn};
      const resBook = fetch("http://localhost:5000/createBooking", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
  
      props.handleReloadEmployees();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      <Button variant="primary" onClick={handleShow}>
        Book Room
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Room #{props.roomID}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text>Social Security Number:</InputGroup.Text>
              <Form.Control placeholder="SSN" name="SSN" value={formValues.SSN} onChange={handleInputChange} autoFocus 
                isValid={formValues.SSN.length === 9 && !isNaN(Number(formValues.SSN))}
                isInvalid={formValues.SSN.length !== 9 || isNaN(Number(formValues.SSN))}
              />
              <Form.Control.Feedback type="invalid">
                Please Enter a Valid Social Security Number
              </Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Full Name:</InputGroup.Text>
              <Form.Control placeholder="John Doe" name="name" value={formValues.name} onChange={handleInputChange} 
                isValid={formValues.name.length > 0}
                isInvalid={formValues.name.length === 0}
              />
              <Form.Control.Feedback type="invalid">
                Please Enter a Name
              </Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Address:</InputGroup.Text>
              <Form.Control placeholder="123 Center Town, Ottawa" name="address" value={formValues.address} onChange={handleInputChange} 
                isValid={formValues.address.length > 0}
                isInvalid={formValues.address.length === 0}
              />
              <Form.Control.Feedback type="invalid">
                Please Enter a Address
              </Form.Control.Feedback>
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={createBooking}>
            Book Room
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default BookingModal;