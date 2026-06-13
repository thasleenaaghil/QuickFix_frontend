import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Button, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { deleteBookingAPI } from '../../services/allAPI'
import { toast } from 'react-toastify'
import { DeleteStatusContext } from '../../context/Context'


function Bookcard({remove,booking,deletes}) {

//for like button
const[likedItems,setLikedItems]=useState([])

 //for delete status
 const {setDeleteStatus}=useContext(DeleteStatusContext)
//function for like button
const handleLike=(id)=>{
  let updateLikes;
    if(likedItems.includes(id)){
      updateLikes = likedItems.filter(item=>item!==id)
    }else{
      updateLikes = [...likedItems,id]
    }
    setLikedItems(updateLikes)
    localStorage.setItem("likedItems",JSON.stringify(updateLikes))
    
}
//to delete a bookiing
const handleDelete=async(id)=>{
      if(sessionStorage.getItem("token")){
        const token = sessionStorage.getItem("token")
        const reqHeader ={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }

        const result = await deleteBookingAPI(id,reqHeader)
        console.log(result);
        if(result.status==200){
          
          toast.success('Booking deleted successfully')
          setDeleteStatus(result.data)
          if(deletes){
            deletes(id)
          }
        }else{
          toast.error('Delete failed')
        }
        
      }
}
 
 useEffect(()=>{
  const savedLikes= JSON.parse(localStorage.getItem("likedItems")) || [];
  setLikedItems(savedLikes)
 },[])
  return (




    <>
<div className='px-3'>
  
  <Card className='W-100 mt-3' style={{ maxWidthW: '24rem' }} >
        <ListGroup variant="flush">
        <div className="d-flex">
            <ListGroup.Item>Service :{booking.service}</ListGroup.Item>
            <button className='btn ms-auto border-0 bg-transparent' onClick={()=>handleLike(booking._id)} style={{color:likedItems.includes(booking._id)?"red":'white'}}> <FontAwesomeIcon icon={faHeart} /></button>
        </div>
        
          <div className='d-flex'>
          <ListGroup.Item>Date:{new Date(booking.Date).toLocaleString('en-IN')}</ListGroup.Item>
           
          {remove? <Button variant="primary" className='btn ms-auto m-1'onClick={()=>handleDelete(booking._id)} >Cancel</Button>:
              <FontAwesomeIcon icon={faTrashCan} bounce className='ms-auto mt-2 me-2' onClick={()=>handleDelete(booking._id)}/>}
           </div>
        </ListGroup>
      </Card>
 
     
      
</div>
     

        
        

     


    </>
  )
}

export default Bookcard