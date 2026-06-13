import React, { useContext, useEffect, useState } from 'react'
import proImg from '../../assets/userImage.jpg'
import { toast } from 'react-toastify'
import { updateProfileAPI } from '../../services/allAPI'
import { serverUrl } from '../../services/baseUrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Collapse from 'react-bootstrap/Collapse';


function Myprofile() {
  //for collapse
  const [open, setOpen] = useState(false);
  //for storing userdetails
  const[updateStatus,setUpdateStatus]=useState(false)
  const[userDetails,setUserDetails]=useState({
    username:"",
    password:"",
    email:"",
    address:"",
    location:{
      latitude:"",
      longitude:""
    },
    profile:""
  })
  //for removing location after logout
  
//profile preview setting
const[preview,setPreview]=useState("")
//for existingimage
const[existingImage,setExistingImage]=useState("")
  const getLocation=(e)=>{
    e.preventDefault()
  navigator.geolocation.getCurrentPosition(
    (position)=>{
      setUserDetails({
        ...userDetails,location:{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
        }
      })
    })
   
    
  }
  console.log(userDetails);
  //to update the profile
  const handleUpdate=async(e)=>{
    
        e.preventDefault()
        const {username,password,email,address,location,profile}=userDetails
        if(!username || !address || !location){
         toast.warning('please fill the form completely')
        }else{
          const reqBody = new FormData()
          reqBody.append("username",username)
          reqBody.append("password",password)
          reqBody.append("email",email)
          reqBody.append("address",address)
          reqBody.append("location",JSON.stringify(location))
         
           if(preview){
            reqBody.append("profile",profile)
           }else{
            reqBody.append("profile",existingImage)
           }
           const token=sessionStorage.getItem("token")
           if(token){
            const reqHeader = {
              "Content-Type":preview?"multipart/form-data":"application/json",
              "Authorization":`Bearer ${token}` 
            }
            const result = await updateProfileAPI(reqBody,reqHeader)
            
            
            if(result.status==200){
              toast.success('update profile successfully')
              sessionStorage.setItem("existingUser",JSON.stringify(result.data))
              setUpdateStatus(!updateStatus)
              
               
            }else{
              toast.error('something went wrong')
              console.log(result.data);
              
            }
           }
     
        }
  }

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({...userDetails,username:user.username,password:user.password,email:user.mailId,address:user.address,location:user.location})
      setExistingImage(user.profile)
    }
  },[updateStatus])
  
  

  useEffect(()=>{
    if(userDetails.profile){
      setPreview(URL.createObjectURL(userDetails.profile))
    }
  },[userDetails.profile])
 
  
  return (
    <>
    
   <div className='mt-3 ms-4' onMouseEnter={()=>setOpen(true)} > 
   <div className='d-flex' >
      <h3 >My Profile</h3>
         <button className='btn btn-outline-secondary ms-3 mb-2 '  onClick={() => setOpen(!open)}><FontAwesomeIcon icon={faAngleDown} size='xs'   /></button>
   </div>
     
   
  <Collapse in={open}>
    
       <div>
       
  
          <div className='bg-primary w-75 rounded shadow p-3 d-flex justify-content-center align-items-center flex-column' >
             
             <label htmlFor='image'>
            <input id='image' type="file" style={{display:'none'}}  onChange={(e)=>setUserDetails({...userDetails,profile:e.target.files[0]})} />
          { existingImage==""?
            <img src={preview?preview:"https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png"} alt="img" height={'150px'} width={'150px'} style={{borderRadius:'50%'}} className='mb-2' />:
            <img src={preview?preview:`${serverUrl}/uploads/${existingImage}`} alt="" height={'150px'} width={'150px'} style={{borderRadius:'50%'}} className='mb-2' />
            }
           
            </label>
         
      
      <div className='mb-3 w-100'><input type="text" className='form-control' placeholder='Name' value={userDetails.username} onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})} /></div>
      
      <div className='mb-3 w-100'><textarea className='form-control'name="" id="" placeholder='Address' rows={3} value={userDetails.address} onChange={(e)=>setUserDetails({...userDetails,address:e.target.value})}></textarea></div>
      <div className=' w-100'><button type='button' className='btn btn-secondary w-100' value={location}  onClick={getLocation}>Get current location</button></div>
      <div className='mt-2'>
        
       {userDetails.location.latitude  && userDetails.location.longitude ? (<iframe src={`https://www.google.com/maps?q=${userDetails.location.latitude},${userDetails.location.longitude}&z=15&output=embed`} width="100%" height="200" style="border:0;" title='map' style={{border:0}}></iframe>):null}
      </div>
      <div className='w-100 mt-3'><button type='button' className='btn btn-success w-100'onClick={handleUpdate}>Update</button></div>
          </div>
       </div>
     
  </Collapse>
    
    
    
    </div>
    
    
    
    </>
  )
}

export default Myprofile