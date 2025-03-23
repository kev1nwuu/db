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
        startDate: props.startDate,
        endDate: props.endDate,
        roomID: props.roomID,
        payment: "",
        ssn: ""
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
            const ssn = props.ssn;
            const data = {startDate,endDate,roomID,ssn}
            const resRent = fetch("http://localhost:5000/createRental", {
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
                Change Status
            </Button>

            <Modal show = {show} onHide = {handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Room To rental</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Payment:</InputGroup.Text>
                    <Form.Control placeholder={props.payment} name="payment" value={formValues.payment} onChange={handleInputChange} 

                    />

                <InputGroup.Text>SSN:</InputGroup.Text>
                    <Form.Control placeholder={props.ssn} name="ssn" value={formValues.ssn} onChange={handleInputChange} 

                    />
              
            </InputGroup>

                </Modal.Body>
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