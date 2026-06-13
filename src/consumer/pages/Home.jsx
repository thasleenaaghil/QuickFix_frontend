import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { Card, Col, Row, Spinner } from 'react-bootstrap'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { askAIAPI } from '../../services/allAPI'


function Home() {
const[isLogin,setIsLogin]=useState(false)
//for off canvas
 const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
//for chat purpose
const [message,SetMessage]=useState("")
const [response,setResponse]=useState("")
const [loading,setLoading]=useState(false)

//ai
const handleAI=async()=>{
    try {
      setLoading(true)
   
      const result = await askAIAPI({
        problem:message
      })
      console.log(result.data);
      setResponse(result.data.answer)
      SetMessage("")
    } catch (error) {
      console.log(error);
      
    } finally{
      setLoading(false)
    }
}
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
         setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  },[])
  console.log(message);
  
  return (
    <>
    <div className='container-fluid w-100' >
          <Row className='align-items-center p-5'>
        <Col sm={12} md={6}>
          <h1 className='text-align-center justify-content-center' style={{fontSize:'60px'}}><FontAwesomeIcon icon={faTruckFast} bounce className='me-2'/>QuickFix</h1>
          <h5>Fix it fast, Fix it right</h5>
          {!isLogin?<Link to={'/register'}><button className='btn btn-primary mt-1'>One click away</button></Link>:

          <Link to={'/services'}><button className='btn btn-primary mt-1'>Book your service</button></Link>} <br />
          <button className='btn btn-primary mt-1 'onClick={handleShow} >Ask QuickFix AI <FontAwesomeIcon className='ms-2' icon={faRobot} bounce style={{color: "white"}} size='xl' /></button>
          <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='text-primary'>Ask QuickFix AI <FontAwesomeIcon className='ms-2 ' icon={faRobot} bounce  size='xl' /></Offcanvas.Title>
        </Offcanvas.Header>
       <Offcanvas.Body>
          <h4 className='text-primary'>Hi, I'm QuickFix AI</h4>
          <p>Describe your issue and I'll reccomend the right service for you</p>
         <div className='container fluid'><textarea type="text" rows={3} value={message} className='form-control' placeholder='Eg:My kitchen tap is leaking..' onChange={(e)=>SetMessage(e.target.value)} value={message} />
         <button className='btn btn-primary mt-3' onClick={handleAI}>Ask AI</button>
         
         </div>
       {loading &&  <div className='text-center mt-3'>
          <Spinner animation='border'/>
          <p>Thinking...</p>
         </div>}
       {response && ( <Card className='mt-3'>
          <Card.Body>
            <h5>Reccomended Service</h5>
            <p>{response}</p>
          </Card.Body>
         </Card>)}
       </Offcanvas.Body>
      </Offcanvas>
          <br />

          <img src="https://assets-v2.lottiefiles.com/a/782a3a74-1171-11ee-af0f-635bfdfaace5/Gh2YK1xgP2.gif" alt="" width={'250px'} height={'200px'} className='mt-3 rounded'/>
        </Col>

        <Col sm={12} md={6} className='mt-4'>

         <Carousel controls={false}  >
      <Carousel.Item interval={1000} className='carouse' >
        <img src="https://static.vecteezy.com/system/resources/previews/000/417/801/non_2x/occupation-wordcard-with-word-electrician-vector.jpg" alt="" className='rounded'width={'500px'} height={'400px'} />
       
      </Carousel.Item>
       <Carousel.Item interval={1000}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQB_NHRJO6UkNIu5ymElfMW-7XOHz6ClJXQw&s" alt="" className='rounded'width={'500px'} height={'400px'} />
       
      </Carousel.Item>
       <Carousel.Item interval={1000}>
        <img src="https://img.freepik.com/free-vector/hand-drawn-carpenter-logo-design_23-2150637754.jpg?semt=ais_hybrid&w=740&q=80" alt="" className='rounded'width={'500px'} height={'400px'} />
       
      </Carousel.Item>
     
    </Carousel>
        </Col>
  </Row>

  <div className='mt-5 p-3'>
    <h3 className='text-center mb-3'>Customer Testimonials</h3>
     <Carousel controls={false} className='mt-3'>
      <Carousel.Item interval={1000}>
        <div className='row'>
          <div className="col-md-2"></div>
           <div className="col-md-4 col-sm-12"  >
             <figure>
              <img src="https://tse2.mm.bing.net/th/id/OIP.eLwrxR1DESY8CGhMpDZDMQHaE8?pid=Api&P=0&h=180" alt="" height={'200px'} width={'200px'} style={{borderRadius:'50%'}}/>
              <figcaption  className='p-2 ms-2'>Andria John</figcaption>
             </figure>
           </div>
            <div className="col-md-4 col-sm-12 mt-3 mb-2"  >
            <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, eaque. Debitis voluptas voluptates eligendi rerum, eaque adipisci dolore expedita aspernatur veritatis magnam doloremque nemo exercitationem iusto.</p>
           </div>
           <div className="col-md-2"></div>
        </div>
       
       
      </Carousel.Item>
       <Carousel.Item interval={1000}>
        <div className='row'>
          <div className="col-md-2"></div>
           <div className="col-md-4 col-sm-12"  >
             <figure>
              <img src="https://www.allprodad.com/wp-content/uploads/2021/03/05-12-21-happy-people.jpg" alt="" height={'200px'} width={'200px'} style={{borderRadius:'50%'}}/>
              <figcaption  className='p-2 ms-2'>John Davis</figcaption>
             </figure>
           </div>
            <div className="col-md-4 col-sm-12 mt-3 mb-2"  >
            <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, eaque. Debitis voluptas voluptates eligendi rerum, eaque adipisci dolore expedita aspernatur veritatis magnam doloremque nemo exercitationem iusto.</p>
           </div>
           <div className="col-md-2"></div>
        </div>
       
       
      </Carousel.Item>
       <Carousel.Item interval={1000}>
        <div className='row'>
          <div className="col-md-2"></div>
           <div className="col-md-4 col-sm-12"  >
             <figure>
              <img src="https://tse1.mm.bing.net/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?pid=Api&P=0&h=180" alt="" height={'200px'} width={'200px'} style={{borderRadius:'50%'}} />
              <figcaption className='p-2 ms-2'>Nolan Grace</figcaption>
             </figure>
           </div>
            <div className="col-md-4 col-sm-12 mt-3 mb-2"  >
            <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, eaque. Debitis voluptas voluptates eligendi rerum, eaque adipisci dolore expedita aspernatur veritatis magnam doloremque nemo exercitationem iusto.</p>
           </div>
           <div className="col-md-2"></div>
        </div>
       
       
      </Carousel.Item>
    </Carousel>
  </div>
   
    
     
   
    </div>

     <Footer/>
    </>
    
  )
}

export default Home