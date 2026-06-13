import React from 'react'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Header from '../components/Header'
import Bookcard from '../components/Bookcard'
import Myprofile from './Myprofile'
import Complaint from '../components/Complaint'
import { getUserBookingAPI } from '../../services/allAPI'

function Mybookings() {
//for storing booking
const [userBooking,setUserBooking]=useState([])

 //for getting booking
 

   const UserBookings=async()=>{
        if(sessionStorage.getItem("token")){
          const token= sessionStorage.getItem("token")
          const reqHeader={
             "Content-Type":'application/json',
                "Authorization":`Bearer ${token}`
          }
          const result = await getUserBookingAPI(reqHeader)
          setUserBooking(result.data);
          
        }
   }
  //for deleting booking
  const deletes = ()=>{
    UserBookings()
  }
    useEffect(()=>{
     UserBookings()
    },[])
    console.log(userBooking);
  return (
    <>
    <Header/>
    <Container fluid>
      <Row>
    <Col sm={12} md={6}>
        <div className='text-center mt-3'>
        <h3>My Bookings</h3>
       {userBooking?.length>0? userBooking?.map((item)=>(<Bookcard booking={item} deletes={deletes}/> )):
      <h3 className='mt-3 text-center text-warning'>No Bookings Yet☹️</h3>
        }
         <Complaint/>
       </div>
        </Col>
         <Col sm={12} md={6}>
        <Myprofile/>
        </Col>
      </Row>
     
    </Container>
    
    
    
    
    </>
  )
}

export default Mybookings