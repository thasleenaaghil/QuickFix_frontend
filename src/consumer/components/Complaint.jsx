import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { complaintAPI } from '../../services/allAPI';


function Complaint() {
  //storing complaints
  const[complaints,setComplaints]=useState({
    title:"",
    issue:""
  })
  
  console.log(complaints);
  const handleComplaint=async(e)=>{
        e.preventDefault()
        const {title,issue}=complaints
        if(!title || !issue){
          toast.warning("Please fill the form completely")
        }else{
          if(sessionStorage.getItem("token")){
            const token = sessionStorage.getItem("token")
          const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
          const result = await complaintAPI(complaints,reqHeader)
         
        if(result.status==200){
          toast.success('complaint registered successfully')
          setComplaints(result.data)
          setTimeout(()=>{
            setComplaints({
            title:"",
            issue:""
          })
          },2000)
        }else{
          toast.error('something went wrong')
          console.log(result);
          
        }
        }
          
        }

  }
  return (
    <>
    
    <Container fluid>
      <div>
            <h3 className='text-center mt-5'>Register A Complaint</h3>
      <div className='mt-3 d-flex justify-content-center align-items-center mb-5 w-100' style={{maxWidth:"80rem"}}> 
        
        
        <div className='bg-primary w-75 rounded shadow p-3 justify-content-center align-items-center flex-column'>
    
    <div className='mb-3 w-100'><input type="text" className='form-control' value={complaints.title} placeholder='complaint about' onChange={(e)=>setComplaints({...complaints,title:e.target.value})} /></div>
    
    <div className='mb-3 w-100'><textarea className='form-control'name="" id="" value={complaints.issue} placeholder='Issue' rows={3} onChange={(e)=>setComplaints({...complaints,issue:e.target.value})}></textarea></div>
    <div className=' w-100'><button className='btn btn-secondary' onClick={handleComplaint}>Submit</button></div>
        </div>
        
        
        
        </div>
      </div>
    </Container>
    
    
    </>
  )
}

export default Complaint