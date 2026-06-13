import React, { useContext, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { bookAPI } from '../../services/allAPI';
import { BookingStatusContext } from '../../context/Context';
function Jobcard() {

  //state to hold booking details
  const [bookDetails, setBookDetails] = useState({
    phoneNo: "",
    location: {
      latitude:"",
      longitude:""
    }
  })
  //state to hold the service name
  const [serviceName,setServiceName]=useState("")
  const [show, setShow] = useState(false);
  //for update booking instantly
  const {setBookingStatus} = useContext(BookingStatusContext)
  
//for token storing
const[token,setToken]=useState("")
  const handleClose = () => setShow(false);
  const handleShow = (service) => {
       setServiceName(service)
       setBookDetails({...bookDetails,service})
       setShow(true)
  };
//function to clear the data entered in the modal
const handleClose1=()=>{
  setBookDetails({
    phoneNo: "",
    location: {
      latitude:"",
      longitude:""
    },
    service:""
  })
  handleClose()
}
//to get location
const getLocation =()=>{
  navigator.geolocation.getCurrentPosition(
    (position)=>{
      setBookDetails({
        ...bookDetails,location:{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
        }
      })
    }
  )
}
//to verify phone
const phoneRegex = /^[0-9]{10}$/
//function to book service
const handleBook=async(e)=>{
   e.preventDefault()
   const {phoneNo,location}=bookDetails
   if(!phoneNo || !location.latitude || !location.longitude){
    toast.warning('please fill the form completely')
   }else if(!phoneRegex.test(phoneNo)){
    toast.error('Enter valid phone number')
   }else{
    if(token){
       const reqHeader = {
        "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await bookAPI(bookDetails,reqHeader)
    if(result.status==200){
    toast.success('Booked Succesfully')
        handleClose1()
        handleClose()
        setBookingStatus(result.data)
    }else{
      toast.error('something went wrong')
      console.log(result);
      
      handleClose()
      handleClose1()
    }
    
    
    }
   
   }
}
  console.log(bookDetails);

  useEffect(()=>{
       if(sessionStorage.getItem("token")){
        setToken(sessionStorage.getItem("token"))
       }else{
        setToken("")
       }
  })
  console.log(token);
  
  return (

    <>
      <Row className='p-1'>
        <Col sm={4} md={4} className='pb-2'>
          <Card style={{ width: '20rem' }} >
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7qqMqvu6Qg7tkx0RSKfrNVgW_VSLcyk8Z7A&s" />
            <Card.Body>
              <Card.Title>Electrician</Card.Title>

              <Button variant="primary" onClick={()=>handleShow("Electrician")} >Book your Service</Button>
            </Card.Body>
          </Card></Col>
        <Col sm={4} md={4} className='pb-2'>
          <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx6ygCN0uYOfXRDTm_na3Tooz3tcyA47g7fQ&s" />
            <Card.Body>
              <Card.Title>Plumber</Card.Title>

              <Button variant="primary" onClick={()=>handleShow("Plumber")}>Book your Service</Button>
            </Card.Body>
          </Card></Col>
        <Col sm={4} md={4}>
          <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" style={{ height: '320px' }} src="https://img.freepik.com/free-vector/hand-drawn-carpenter-logo-design_23-2150637754.jpg?semt=ais_hybrid&w=740&q=80" />
            <Card.Body>
              <Card.Title>Carpenter</Card.Title>

              <Button variant="primary" onClick={()=>handleShow("Carpenter")}>Book your Service</Button>
            </Card.Body>
          </Card></Col>

      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{serviceName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone no</Form.Label>
              <Form.Control
                type="" placeholder="9876543210" autoFocus value={bookDetails.phoneNo} onChange={(e)=>setBookDetails({...bookDetails,phoneNo:e.target.value})}/>
            </Form.Group>

           <Button variant='info'onClick={getLocation}>use current location</Button>
               {bookDetails.location.latitude && <p className='text-success mt-3'>Location captured ✅</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBook}>
            Book
          </Button>
        </Modal.Footer>
      </Modal>



    </>
  )
}

export default Jobcard