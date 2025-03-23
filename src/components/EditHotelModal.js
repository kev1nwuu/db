import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const EditHotelModal = (props) => {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formValues, setFormValues] = useState({ 
        hotelID: props.hotelID,
        rating: props.rating,
        numRooms: props.numRooms,
        address: props.address,
        email: props.email,
        phone: props.phone
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    const editHotel = async () => {
        try {
            const editRoom = fetch("http://localhost:5000/editHotel", {
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
                Edit Hotel
            </Button>

            <Modal show = {show} onHide = {handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Booking To Rental</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>

                <InputGroup className="mb-3">
              <InputGroup.Text>Hotel ID:</InputGroup.Text>
              <Form.Control placeholder={props.hotelID} name="hotelID" value={formValues.hotelID} onChange={handleInputChange} 

              />
              
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Rating:</InputGroup.Text>
              <Form.Control placeholder={props.rating} name="rating" value={formValues.rating} onChange={handleInputChange} 

              />
              
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Number Of Rooms:</InputGroup.Text>
              <Form.Control placeholder={props.numRooms} name="numRooms" value={formValues.numRooms} onChange={handleInputChange} 

              />
              
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Address:</InputGroup.Text>
              <Form.Control placeholder={props.address} name="address" value={formValues.address} onChange={handleInputChange} 

              />
              
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Email:</InputGroup.Text>
              <Form.Control placeholder={props.email} name="email" value={formValues.email} onChange={handleInputChange} 

              />
              
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Phone:</InputGroup.Text>
              <Form.Control placeholder={props.phone} name="phone" value={formValues.phone} onChange={handleInputChange} 

              />
              
            </InputGroup>

        

            
          </Form>
          </Modal.Body>
                <Modal.Footer>
                    <Button variant = "secondary" onClick = {handleClose}>
                        Close
                    </Button>
                    <Button variant = "success" onClick={editHotel}>
                        Confirm
                    </Button>

                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}
export default EditHotelModal;