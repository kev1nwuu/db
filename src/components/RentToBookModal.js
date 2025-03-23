import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const RentToBookModal = (props) => {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formValues, setFormValues] = useState({ 
        payment: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    const changeRental = async () => {
        try {
            const startDate = props.startDate;
            const endDate = props.endDate;
            const roomID = props.roomID;
            const bookingID = props.bookingID;
            const ssn = props.ssn;
            const data = {startDate,endDate,roomID,bookingID,ssn}
            const resRent = fetch("http://localhost:5000/createRental", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            }); 



            

            
            handleClose();
            
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <Fragment>
            <InputGroup className="mb-3">
              <InputGroup.Text>Payment:</InputGroup.Text>
              <Form.Control placeholder={props.payment} name="payment" value={formValues.payment} onChange={handleInputChange} 

              />
              
            </InputGroup>
            <Button variant = "primary" onClick = {handleShow}>
                Change Status
            </Button>

            <Modal show = {show} onHide = {handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Booking To Rental</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant = "secondary" onClick = {handleClose}>
                        Close
                    </Button>
                    <Button variant = "success" onClick={changeRental}>
                    Change Booking To Rental
                    </Button>

                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}
export default RentToBookModal;