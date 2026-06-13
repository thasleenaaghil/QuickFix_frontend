
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Home from './consumer/pages/Home'
import Quickjob from './consumer/pages/Quickjob'
import Mybookings from './consumer/pages/Mybookings'
import Auth from './consumer/pages/Auth'

  import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react'
import { isAuthorizedContext } from './context/Context'





function App() {
 const {isAuthorized}=useContext(isAuthorizedContext)

  return (
    <>
     
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/services' element={isAuthorized?<Quickjob cancel={true}/>:<Home/>} />
        <Route path='/bookings' element={<Mybookings/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth register/>}/>
       
      </Routes>
       <ToastContainer  theme='colored' position='top-center' autoClose={2000}/>

    </>
  )
}

export default App



