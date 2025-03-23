import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const EditRentalModal = (props) => {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formValues, setFormValues] = useState({ 
        startDate: props.startDate,
        endDate: props.endDate,
        roomID: props.roomID
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    const editRental = async () => {
        try {
            const editRoom = fetch("http://localhost:5000/editRental", {
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
                Edit Rental
            </Button>

            <Modal show = {show} onHide = {handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Rental</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>

                <InputGroup className="mb-3">
              <InputGroup.Text>Start Date:</InputGroup.Text>
              <Form.Control placeholder={props.startDate} name="startDate" value={formValues.startDate} onChange={handleInputChange} 

              />
              
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>End Date:</InputGroup.Text>
              <Form.Control placeholder={props.endDate} name="endDate" value={formValues.endDate} onChange={handleInputChange} 

              />
              
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Room ID:</InputGroup.Text>
              <Form.Control placeholder={props.roomID} name="roomID" value={formValues.roomID} onChange={handleInputChange} 

              />
              
            </InputGroup>

        
        

            
          </Form>
          </Modal.Body>
                <Modal.Footer>
                    <Button variant = "secondary" onClick = {handleClose}>
                        Close
                    </Button>
                    <Button variant = "success" onClick={editRental}>
                        Confirm
                    </Button>

                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}
export default EditRentalModal;