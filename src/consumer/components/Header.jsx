import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthorizedContext } from '../../context/Context';

function Header({remove}) {
  const navigate = useNavigate()
  const {setIsAuthorized}=useContext(isAuthorizedContext)
 
  const handleLogout=()=>{
    sessionStorage.clear("existingUser")
    sessionStorage.removeItem("token")
       
    navigate('/')
    toast.success('Logout sucessfull')
    setIsAuthorized(false)
    
  }
  return (
    <> 
    <Navbar className="bg-primary">
        <Container>
          <Navbar.Brand href="#home">
        <Link to={'/'} style={{textDecoration:'none'}}><h1>  <FontAwesomeIcon icon={faTruckFast} bounce className='me-2'/>QuickFix</h1></Link>  
           
        
          </Navbar.Brand>
          <div className='ms-auto'>
           {! remove? <Link to={'/services'}><button className='btn btn-secondary me-3 mb-3 mb-md-0'>Book your service</button></Link>:
              <Link to={'/bookings'}><button className='btn btn-secondary me-3 mb-3 mb-md-0'>My Bookings</button></Link>}
               <button className='btn btn-secondary' onClick={handleLogout}>Logout</button>
          </div>
        </Container>
      </Navbar>
      
      </>
  )
}

export default Header