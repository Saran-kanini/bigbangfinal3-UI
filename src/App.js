import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Agentlogin from './Agent/Login/Agentlogin'; 
import Sample from './Sample/Sample';
import Userlogin from './User/Userlogin';
import AdminHome from './Admin/AdminHome';
import Feedback from './Booking/Feedback';
import Adminlogin from './Admin/AdminLogin/Adminlogin';
import Demo from './Demo/Demo';
import TravelLogin from './Travaller/Travel';
import Agenthome from './Agent/Agenthome';
import Samp from './samp/Samp';
import AgentPost from './Agent/AgentPost/Agentpost';
import BookingPage from './Booking/Booking/Booking';
import Get from './Agent/Get';
import Billpage from './Booking/Billpage';
import SuccessMessage from './DemoFeed';
import { Navigate } from 'react-router-dom';


function App() {
  const isuserauthenticate=()=>{
    const token = localStorage.getItem('token');
    if(token){
      return true;
    }else{
    return false;
    }
  }
  return (
    <div>
       <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Adminlogin />} />
          <Route path="/sample" element={<Sample/>}/>
          <Route path="/samp/:accommodationDetailId" element={<Samp/>} />
          <Route path="/agentlogin" element={<Agentlogin />} />
          <Route path="/user" element={<Userlogin />} />
          <Route path="/adminhome" element={isuserauthenticate()?<AdminHome />:<Navigate to="/"></Navigate>} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/userlogin" element={<TravelLogin />} />
          <Route path="/agenthome" element={<Agenthome />} />
          <Route path="/post" element={<AgentPost />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/get" element={<Get />} />
          <Route path="/bill" element={<Billpage />} />
          <Route path="/success" element={<SuccessMessage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
 