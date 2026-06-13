import React, { useContext, useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import Header from '../components/Header'
import Jobcard from '../components/Jobcard'
import Bookcard from '../components/Bookcard'
import { getLimitBookingAPI } from '../../services/allAPI'
import { BookingStatusContext, DeleteStatusContext } from '../../context/Context'

function Quickjob({cancel}) {
  //for cancelling service
  const remove = cancel
//for storing bookings
const[limitBookings,setLimitBookings]=useState([])
//for booking display instantly
const {bookingStatus} = useContext(BookingStatusContext)
//for delete update status
const{deleteStatus}=useContext(DeleteStatusContext)
//for delete bookings and pass it on bookcard
const deletes = ()=>{
  getLimitBooking
}
  //for limit bookings
  const getLimitBooking= async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
   const result = await getLimitBookingAPI(reqHeader)
      setLimitBookings (result.data);
    }
    
      
  }

  useEffect(()=>{
    getLimitBooking()
  },[bookingStatus,deleteStatus])
  
  
  return (
    <>
       <Header remove={remove}/>
      <Container fluid>
        <h1 className='text-center mt-3'>Hello User,Book Your Service</h1>
       <div className='d-flex justify-content-evenly ps-2 '>
      <Jobcard/>
       </div>
       <div>
          <h3 className='text-center'>
       

        Recent Booked
        
     </h3>
          <div className='row'>
            <div className="col-md-4"></div>
            <div className="col-md-4 mb-3">
            {limitBookings?.length>0? limitBookings?.map((item)=>(<Bookcard remove={remove} deletes={deletes} booking={item}/>)): <h3 className='mt-3 text-center text-warning'>No Bookings Yet☹️</h3> }
            </div>
            <div className="col-md-4"></div>

          </div>
        
       </div>
      </Container>
    </>
  )
}

export default Quickjob