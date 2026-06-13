import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { faInstagram,faFacebook,faLinkedin,faTwitter } from '@fortawesome/free-brands-svg-icons'


function Footer() {
  return (
    <>
     
    <div className='mt-5 w-100  p-4 bg-primary' >
  <div className="row mx-3">

    <div className="col-md-4">
        <h4 className='text-light mt-3'><FontAwesomeIcon icon={faTruckFast} className='me-2'/>QuickFix</h4>
        <p style={{textAlign:'justify',color:'black'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sunt, qui dignissimos eveniet eos earum magni reprehenderit cupiditate accusamus ad et? Consequuntur totam pariatur id ratione repudiandae libero, recusandae ducimus.</p>

    </div>
    <div className="col-md-1"></div>
    <div className="col-md-1">
      <h4 className='text-light'>Links</h4>
     <Link to={'/'} style={{textDecoration:'none',color:'black'}} className='mt-3'> <p>Home</p></Link>
     <Link to={'/bookings'} style={{textDecoration:'none',color:'black'}}> <p>My Bookings</p></Link>
     <Link to={'/services'}style={{textDecoration:'none',color:'black'}}> <p>Services</p></Link>

    </div>

    <div className="col-md-1">

    </div>
    <div className="col-md-2 ">
  <h4 className='text-light'>Guides</h4>
 <Link to={'https://react.dev/'}> <p style={{color:'black'}} className='mt-3'>React</p></Link>
 <Link to={'https://react-bootstrap.github.io/'}> <p style={{color:'black'}}>React Bootstrap</p></Link>
 <Link to={'https://bootswatch.com/'}> <p style={{color:'black'}}>React Bootswatch</p></Link>
    </div>
    <div className="col-md-3">
      <h3 className='text-light'>Contact Us</h3>
      <div className='d-flex mt-3'>
        <input type="text" placeholder='Enter MailId' className='form-control me-2' />
        <button className='btn btn-secondary'>Subscribe</button>

      </div>
      <div className='d-flex mt-4 justify-content-between'>
        <FontAwesomeIcon icon={faInstagram} className='fs-3  text-light' />
        <FontAwesomeIcon icon={faFacebook} className='fs-3  text-light'  />
        <FontAwesomeIcon icon={faLinkedin} className='fs-3  text-light'  />
        <FontAwesomeIcon icon={faTwitter} className='fs-3  text-light'  />
      </div>
    </div>
    
  </div>

       <p className='text-center text-dark mt-4'>copyright @ 2026 project.build with React</p>
    </div>
    
    
    
    
    </>
  )
}

export default Footer