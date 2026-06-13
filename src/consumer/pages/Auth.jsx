import React, { useContext, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { loginAPI, registerAPI } from '../../services/allAPI';
import { isAuthorizedContext } from '../../context/Context';

function Auth({register}) {
  const{setIsAuthorized}=useContext(isAuthorizedContext)
  //state to hold user details
const[user,setUser]=useState({
  username:"",
  email:"",
  password:""
})
//for navigate to another page
const navigate = useNavigate()
//function to call register
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/
const getregister =async(e)=>{
  e.preventDefault()
  const {username,email,password}=user

  if(!username || !email || !password){
    toast.info('please fill the form completely')
  }else if(!emailRegex.test(email)){
    toast.warning('invalid mailId')
  }else{
    const result = await registerAPI(user)
    console.log(result);
    if(result.status==200){
     
        toast.success("Registration successfull")
         navigate('/login')
         setUser({
           username:"",
           email:"",
           password:""
         })
        
    }else{
      toast.warning(result.response.data);
      
    }
    
    
  }


}

//function to login
const userlogin=async(e)=>{
  e.preventDefault()
  const {email,password} = user
  if(!email || !password){
    toast.info('please fill the form completely')
  }else{
    const result = await loginAPI(user)
    console.log(result);
    if(result.status==200){
      toast.success('login successfull')
      sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token",result.data.token)
      setUser({
         username:"",
          email:"",
          password:""
      })
      setTimeout(() => {
        navigate('/')
      }, 3000);
      setIsAuthorized(true)
    }else{
      toast.error(result.response.data)
      console.log(result);
      
    }
    

  }
}

console.log(user);



  const registerForm=register?true:false
  return (


    
    <>
    
    <Container fluid>
  <div className='w-100 d-flex justify-content-center align-items-center flex-column' style={{height:'100vh'}}>
                <Link to={'/'} style={{ textDecoration: 'none', color: 'blue' }} >

              <h5>  <FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back to home</h5>
              </Link>
       <Row className=' bg-primary p-3 w-75 rounded shadow '>
        <Col sm={12} md={6}>
       {registerForm?  <img src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyZGRjcjEyb2d5Nzc1b2phcmVkMGM1cnh2NnBiM3piendsdWEyeTA0cyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Ltz1ZA728qKw4mEY94/giphy.gif" alt="" width={'100%'} height={'100%'} className='rounded shadow' />:<img src="https://cdn-icons-gif.flaticon.com/17905/17905768.gif" alt="" width={'100%'} height={'100%'} className='rounded shadow' />}
        </Col>
       <Col sm={12} md={6} className='mt-4'>
       <h2><FontAwesomeIcon icon={faTruckFast} bounce className='me-2'/>QuickFix</h2>
      {registerForm && <TextField id="outlined-basic" label="Name" variant="outlined" value={user.username} className='pb-2 w-100' onChange={(e)=>setUser({...user,username:e.target.value})}/>}
       <br />
       <TextField id="outlined-basic" label="EmailId" variant="outlined" value={user.email} className='pb-2 w-100' type='email' onChange={(e)=>setUser({...user,email:e.target.value})}/><br />
       <TextField id="outlined-basic" label="Password" variant="outlined" type='password' value={user.password} className='w-100' onChange={(e)=>setUser({...user,password:e.target.value})} />
      {registerForm? <div>
                    
                    <Button variant="secondary" type="submit" className="w-100 mt-3" onClick={getregister}>Register</Button>
                      <p className='text-light'>Already a user? click here to <Link to={'/login'} className='text-danger'>login</Link></p>
                  </div>:
                    <div>
                      <Button variant="secondary" type="submit" className="w-100 mt-3"onClick={userlogin}>Login</Button>
                      <p className='text-light'>New user? click here to <Link to={'/register'} className='text-danger'>register</Link></p>
                    </div>}
       </Col>

       </Row>

  </div>
    </Container>
    
    
    
    </>
  )
}

export default Auth