import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const EditRoomModal = (props) => {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formValues, setFormValues] = useState({ 
        roomID: props.roomID, 
        roomNumber: props.roomNumber, 
        price: props.price,
        capacity: props.capacity,
        outsideView: props.outsideView,
        extended: props.extended,
        damage: props.damage,
        rented: props.rented,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    const editRoom = async () => {
        try {
            const roomID = props.roomID;
            const roomNumber = props.roomNumber;
            const price = props.price;
            const capacity = props.capacity;
            const outsideView = props.outsideView;
            const extended = props.extended;
            const damage = props.damage;
            const rented = props.rented;
            const data = {roomID,roomNumber,price,capacity,outsideView,extended,damage,rented}
            const editRoom = fetch("http://localhost:5000/editRoom", {
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
                Edit Room
            </Button>

            <Modal show = {show} onHide = {handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Booking To Rental</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text>Room ID:</InputGroup.Text>
              <Form.Control placeholder={props.roomID} name="roomID" value={formValues.roomID} onChange={handleInputChange} 

              />
              
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Room Number:</InputGroup.Text>
              <Form.Control placeholder={props.roomNumber} name="roomNumber" value={formValues.roomNumber} onChange={handleInputChange} 

              />
              
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Price:</InputGroup.Text>
              <Form.Control placeholder={props.price} name="price" value={formValues.price} onChange={handleInputChange} 

              />
              
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Capacity:</InputGroup.Text>
              <Form.Control placeholder={props.capacity} name="capacity" value={formValues.capacity} onChange={handleInputChange} 
              />
              
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Outside View:</InputGroup.Text>
              <Form.Control placeholder={props.outsideView} name="outsideView" value={formValues.outsideView} onChange={handleInputChange} 

              />
              
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Extended:</InputGroup.Text>
              <Form.Control placeholder={props.extended} name="extended" value={formValues.extended} onChange={handleInputChange} 
              />
              
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Damage:</InputGroup.Text>
              <Form.Control placeholder={props.damage} name="damage" value={formValues.damage} onChange={handleInputChange} 

              />
              
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Rented:</InputGroup.Text>
              <Form.Control placeholder={props.rented} name="rented" value={formValues.rented} onChange={handleInputChange} 
              />
              
            </InputGroup>
            
          </Form>
          </Modal.Body>
                <Modal.Footer>
                    <Button variant = "secondary" onClick = {handleClose}>
                        Close
                    </Button>
                    <Button variant = "success" onClick={editRoom}>
                        Confirm
                    </Button>

                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}
export default EditRoomModal;