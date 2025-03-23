import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const AddEmployeeModal = (props) => {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formValues, setFormValues] = useState({ 
        name: props.name,
        address: props.address,
        role: props.role,
        hotelID: props.hotelID,
        ssn: props.ssn
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    const addEmployee = async () => {
        try {
            const editRoom = fetch("http://localhost:5000/createEmployee", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formValues)
            }); 

            handleClose();
            
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Fragment>
            <Button variant = "primary" onClick = {handleShow}>
                Add Employee
            </Button>

            <Modal show = {show} onHide = {handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Booking To Rental</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>

            <InputGroup className="mb-3">
              <InputGroup.Text>SSN:</InputGroup.Text>
              <Form.Control placeholder={props.ssn} name="ssn" value={formValues.ssn} onChange={handleInputChange} 

              />
              
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Name:</InputGroup.Text>
              <Form.Control placeholder={props.name} name="name" value={formValues.name} onChange={handleInputChange} 

              />
              
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Address:</InputGroup.Text>
              <Form.Control placeholder={props.address} name="address" value={formValues.address} onChange={handleInputChange} 

              />
              
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Role:</InputGroup.Text>
              <Form.Control placeholder={props.role} name="role" value={formValues.role} onChange={handleInputChange} 

              />
              
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Hotel ID:</InputGroup.Text>
              <Form.Control placeholder={props.hotelID} name="hotelID" value={formValues.hotelID} onChange={handleInputChange} 

              />
              
            </InputGroup>
            
          </Form>
          </Modal.Body>
                <Modal.Footer>
                    <Button variant = "secondary" onClick = {handleClose}>
                        Close
                    </Button>
                    <Button variant = "success" onClick={addEmployee}>
                        Confirm
                    </Button>

                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}
export default AddEmployeeModal;