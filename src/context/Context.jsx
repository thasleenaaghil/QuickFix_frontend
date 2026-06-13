
import React, { createContext, useState } from 'react'

export const BookingStatusContext = createContext()
export const DeleteStatusContext = createContext()
export const isAuthorizedContext = createContext()

function Context({children}) {
    const[bookingStatus,setBookingStatus]=useState({})
    const[deleteStatus,setDeleteStatus]=useState({})
    const [isAuthorized,setIsAuthorized]=useState(true)
  
  return (
    //to provide context to all component
    <BookingStatusContext.Provider value={{bookingStatus,setBookingStatus}}>
       <DeleteStatusContext.Provider value={{deleteStatus,setDeleteStatus}}> 
        <isAuthorizedContext.Provider value={{isAuthorized,setIsAuthorized}}>
          
            {children}
           
          </isAuthorizedContext.Provider>
        </DeleteStatusContext.Provider>
    </BookingStatusContext.Provider>
  )
}

export default Context