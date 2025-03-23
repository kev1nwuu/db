import React, { Fragment, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Tab, Tabs } from 'react-bootstrap';
import RentToBookModal from './RentToBookModal.js';
import EditRoomModal from './EditRoomModal.js';
import EditCustomerModal from './EditCustomerModal.js';
import EditHotelModal from './EditHotelModal.js';
import EditRentalModal from './EditRentalModal.js';
import EditEmployeeModal from './EditEmployeeModal.js';
import AddEmployeeModal from './AddEmployeeModal.js';
import RoomToRentalModal from './RoomToRentalModal.js';

const EmployeeView = (props) => {
  const [rooms, setRooms] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [bookings,setBookings] = useState([]);
  const [rentals,setRentals] = useState([]);
  const [hotels,setHotels] = useState([]);
  const [tabKey, initTabKey] = useState('one');

  var currentDateObj = new Date();
  var utcDate = new Date(Date.UTC(currentDateObj.getFullYear(), currentDateObj.getMonth(), currentDateObj.getDate()));
  var utcNextDate = new Date(Date.UTC(currentDateObj.getFullYear(), currentDateObj.getMonth(), currentDateObj.getDate() + 1));
  const currentDate = utcDate.toJSON().slice(0,10);
  const nextDate = utcNextDate.toJSON().slice(0,10);

  const [selectedStartDate, setSelectedStartDate] = useState(currentDate);
  const [selectedEndDate, setSelectedEndDate] = useState(nextDate);
  const [selectedMinEndDate, setSelectedMinEndDate] = useState(nextDate);

  const getRooms = async () => {
    try {
      const res = await fetch('http://localhost:5000/rooms');
      const jsonData = await res.json();
      setRooms(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  const getCustomers = async () => {
    try {
      const res = await fetch('http://localhost:5000/customers');
      const jsonData = await res.json();
      setCustomers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  const getEmployees = async () => {
    try {
      const res = await fetch('http://localhost:5000/employees');
      const jsonData = await res.json();
      setEmployees(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  const getBookings = async () => {
    try {
      const res = await fetch('http://localhost:5000/bookings');
      const jsonData = await res.json();
      setBookings(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  const getRentals = async() => {
    try {
      const res = await fetch('http://localhost:5000/rentals');
      const jsonData = await res.json();
      setRentals(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  const getHotels = async() => {
    try {
      const res = await fetch('http://localhost:5000/hotels');
      const jsonData = await res.json();
      setHotels(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  

  useEffect(() => {
    getRooms();
    getCustomers();
    getEmployees();
    getBookings();
    getRentals();
    getHotels();
  }, []);

  useEffect(() => {
    getCustomers();
  }, [props.update]);


  return (
    <Fragment>
      <div className='container'>
        <h2 className="mb-3 text-center">Employee View</h2>
        <Tabs activeKey={tabKey} onSelect={(e) => initTabKey(e)}>
          <Tab eventKey="one" title="Rooms">
            <h2>List of Rooms</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Room ID</th>
                  <th>Room Number</th>
                  <th>Price</th>
                  <th>Capacity</th>
                  <th>Outside View</th>
                  <th>Extendable</th>
                  <th>Damages</th>
                  <th>Is Rented</th>
                  <th>Hotel ID</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map(room => (
                  <tr key={room.room_id}>
                    <td>{room.room_id}</td>
                    <td>{room.room_num}</td>
                    <td>{room.price}</td>
                    <td>{room.capacity}</td>
                    <td>{room.outside_view}</td>
                    <td>{room.can_be_extended ? "True" : "False"}</td>
                    <td>{room.has_damage ? "True" : "False"}</td>
                    <td>{room.is_rented ? "True" : "False"}</td>
                    <td>{room.hotel_id}</td>
                    <td><EditRoomModal roomID = {room.room_id} 
                    roomNumber = {room.room_num} 
                    price = {room.price} 
                    capacity = {room.capacity} 
                    outsideView = {room.outside_view} 
                    extended = {room.can_be_extended} 
                    damage = {room.has_damage} 
                    rented = {room.is_rented}/></td>
                    <td><RoomToRentalModal roomID = {room.room_id} startDate = {selectedStartDate} endDate = {selectedEndDate}/></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="two" title="Customers">
            <h2>List of Customers</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Registration Date</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.reg_date}</td>
                    <td><EditCustomerModal id = {customer.id}
                    name = {customer.name}
                    address = {customer.address}
                    ssn = {customer.ssn}/></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="three" title="Hotels">
            <h2>List of Hotels</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Hotel ID</th>
                  <th>Hotel Rating</th>
                  <th>Number Of Rooms</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map(hotel => (
                  <tr>
                    <td>{hotel.hotel_id}</td>
                    <td>{hotel.rating}</td>
                    <td>{hotel.num_rooms}</td>
                    <td>{hotel.address}</td>
                    <td>{hotel.email}</td>
                    <td>{hotel.phone}</td>
                    <td><EditHotelModal hotelID = {hotel.hotel_id}
                    rating = {hotel.rating}
                    numRooms = {hotel.num_rooms}
                    address = {hotel.address}
                    email = {hotel.email}
                    phone = {hotel.phone}/></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="four" title="Employees">
            <h2>List of Employees</h2>
            <AddEmployeeModal />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Role</th>
                  <th>Hotel ID</th>
                  <th>Edit Employee</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(employee => (
                  <tr>
                    <td>{employee.name}</td>
                    <td>{employee.address}</td>
                    <td>{employee.role_pos}</td>
                    <td>{employee.hotel_id}</td>
                    <td><EditEmployeeModal name = {employee.name}
                    address = {employee.address}
                    role = {employee.role_pos}
                    hotelID = {employee.hotel_id}
                    ssn = {employee.ssn}/></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="five" title="Bookings">
            <h2>List of Bookings</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Room ID</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>

                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr>
                    <td>{booking.booking_id}</td>
                    <td>{booking.room_id}</td>
                    <td>{booking.start_date}</td>
                    <td>{booking.end_date}</td>
                    <td>{<RentToBookModal ssn = {booking.ssn} roomID = {booking.room_id} bookingID = {booking.booking_id} startDate = {booking.start_date} endDate = {booking.end_date}/>}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="six" title="Rentals">
            <h2>List of Rentals</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Room ID</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map(rental => (
                  <tr>
                    <td>{rental.start_date}</td>
                    <td>{rental.end_date}</td>
                    <td>{rental.room_id}</td>
                    <td><EditRentalModal startDate = {rental.start_date}
                    endDate = {rental.end_date}
                    roomID = {rental.room_id}/></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>

      </div>

    </Fragment>

  );
};

export default EmployeeView;