import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';
import img1 from './img/nav-icon.svg';
import img2 from './img/france.jpg';
import img3 from './img/itally.jpg';
import img4 from './img/heart.svg';
import img5 from './img/logo-facebook.svg';
import img6 from './img/india.jpg';
import img7 from './img/github.svg';
import img8 from './img/england.jpg';
import img9 from './img/maldives.jpg'
import {NavLink} from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import logo from './holiday-icon-png-9819.png'
import Get from '../Agent/Get';
import Userlogin from '../User/Userlogin';

export default function AdminHome() {
  const [place_name, setplace_name] = useState('');
  const [imageFile, setPlaceImage] = useState(null);
  const [approvedAgents, setApprovedAgents] = useState([]);
  const [declinedAgents, setDeclinedAgents] = useState([]);

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('Admin Name');
    window.location.href = '/'; 
  };


  const handlePlaceNameChange = (e) => {
    setplace_name(e.target.value);
  };
  const handlePlaceImageChange = (e) => {
    setPlaceImage(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append('place_name', place_name);
    postData.append('imageFile', imageFile);
    postData.append('adminRegister.admin_Id', '2');

      // Send the POST request using Axios
      axios
      .post('https://localhost:7125/api/AdminPosts', postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Data successfully posted:', response.data);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

    useEffect(() => {
      fetchApprovedAgents();
    }, []);

    const fetchApprovedAgents = () => {
      fetch('https://localhost:7125/api/AgentRegisters/Approved')
        .then(response => response.json())
        .then(data => {
          setApprovedAgents(data);
        })
        .catch(error => {
          console.error('Error fetching approved agents:', error);
        });
    };
  const [travelAgents, setTravelAgents] = useState([]);

  useEffect(() => {
    fetchTravelAgents();
    fetchDeclinedAgents();
  }, []);
  const fetchDeclinedAgents = () => {
    fetch('https://localhost:7125/api/AgentRegisters/Declined')
      .then(response => response.json())
      .then(data => {
        setDeclinedAgents(data);
      })
      .catch(error => {
        console.error('Error fetching declined travel agents:', error);
      });
  };
  const renderDeclinedAgents = () => {
    if (declinedAgents.length === 0) {
      return <div className="no-requests">No declined travel agents</div>;
    }
  
    return declinedAgents.map(agent => (
      <div className="custom-agent-card declined" key={agent.agent_Id}>
        <div className="custom-agent-card__content">
          <div className="custom-agent-card__header">
            <h2 className="custom-agent-card__name"><b>Name: </b>{agent.agent_Name}</h2>
            <p className="custom-agent-card__status"><b>Status: </b>{agent.status}</p>
          </div>
          <div className="custom-agent-card__actions">
            {/* You can add additional actions or details here if needed */}
          </div>
        </div>
      </div>
    ));
  };
  
  const fetchTravelAgents = () => {
    fetch('https://localhost:7125/api/AdminRegisters/UnapprovedTravelAgents')
      .then(response => response.json())
      .then(data => {
        setTravelAgents(data);
      })
      .catch(error => {
        console.error('Error fetching travel agents:', error);
      });
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`https://localhost:7125/api/AdminRegisters/UpdateApprovalStatus/${id}`, "Approved", {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchApprovedAgents();
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.put(`https://localhost:7125/api/AdminRegisters/UpdateApprovalStatus/${id}`, "Declined", {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchTravelAgents();
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };

  const renderTravelAgents = () => {
    if (travelAgents.length === 0) {
      return <div className="no-requests">No travel agents to approve</div>;
    }

    return travelAgents.map(agent => (
      <div className="custom-agent-card" key={agent.agent_Id}>
        <div className="custom-agent-card__content">
          <div className="custom-agent-card__header">
            <h2 className="custom-agent-card__name"><b>Name: </b>{agent.agent_Name}</h2>
            <p className="custom-agent-card__status"><b>Status: </b>{agent.status}</p>
          </div>
          <div className="custom-agent-card__actions">
            <button className="custom-agent-card__button" onClick={() => handleApprove(agent.agent_Id)}>
              Approve
            </button>
            <button className="custom-agent-card__button" onClick={() => handleDecline(agent.agent_Id)}>
              Decline
            </button>
          </div>
        </div>
      </div>
    ))
  };
    

  //gallery
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = () => {
    axios
      .get('https://localhost:7125/api/AdminPosts')
      .then((response) => {
        setGalleryData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching gallery data:', error);
      });
  };
 
  return (
    <div>
         {/* HEADER */}
      <header className="header">
        <div className="container">
          <div className="navigation"><img
            src={logo}
            alt="Turismo Logo"
            className="logo"
            style={{width:'50px'}}
          /><div className="logo" style={{marginRight:'350px'}}>Tourism</div>
           
            <ul>
              <li>
                <a href="#home"> Home </a>
              </li>
              <li>
                <a href="#req"> Request </a>
              </li>
              <li>
                <a href="#gallery"> Gallery </a>
              </li>
              <li>
                <a href="#about"> About </a>
              </li>
             
            <li>
            <button onClick={handleLogout} style={{backgroundColor:'lightblue'}}>Logout</button>
            </li>
              
            </ul>
          </div>
        </div>
      </header>
      <main>
        {/* SECTION HERO */}
        <section className="section-hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="heading heading--1 margin-bottom">
                life is short and the world is wide the sooner you start exploring it
                the better
              </h1>
              <button className="btn">Explore now</button>
            </div>
          </div>
        </section>
        </main>
      <div className='reqbody' id="req"><center><h1>Travel Agents Request</h1></center><br></br>
      <div id="travelAgentsContainer">{renderTravelAgents()}</div>
      <div></div><br/>\
     
      <center><h1>Approved Agent</h1></center>
      <div className="card-container">
        {approvedAgents &&
          approvedAgents.map((agent) => (
            <div key={agent.Agent_Id} style={{backgroundColor:'lightblue'}} className="card">
              <h2><b>Agent: </b>{agent.agent_Name}</h2>
              <p style={{marginLeft:'65px'}}><b>Status: </b> {agent.status}</p>
              {agent.agencies && (
                <div>
                  <p>Agencies:</p>
                  <ul>
                    {agent.agencies.map((agency) => (
                      <li key={agency.agency_Id}>{agency.agency_Name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
    <br/>
    <div className="declined-agents-container">
  <h1>Declined Travel Agents</h1>
  {renderDeclinedAgents()}
</div>
<br/>
    <div><Get/></div><br/>
    {/* Create a New Admin Post card */}
    <div className="card-container-img" >
  <div className="card">
    <h2>Gallery Post</h2>
    <form>
      <div className="input-field">
        <label>Place Name</label>
        <input
          type="text"
          placeholder="Enter name"
          value={place_name}
          onChange={handlePlaceNameChange}
          required
        />
      </div>

      <div className="input-field">
        <label>Choose Hotel File</label>
        <input
          type="file"
          accept="image/png, image/jpeg" 
          onChange={handlePlaceImageChange}
          name="placeImagePath"
          required
        />
      </div>

      <button className="nextBtn" onClick={handleSubmit}>
        <span className="btnText">Submit</span>
        <i className="uil uil-navigator"></i>
      </button>
    </form>
  </div>
</div>
  <br/>
{/* gallery */}
<section className="gallery" id="gallery">
        <center><h1 className="heading">
          <span>g</span>
          <span>a</span>
          <span>l</span>
          <span>l</span>
          <span>e</span>
          <span>r</span>
          <span>y</span>
        </h1></center>
        <div className="box-container">
          {galleryData.map((item) => (
            <div className="box" key={item.id}>
              <img  src={`https://localhost:7125/uploads/images/${item.placeImagePath}`} alt={item.place_name} />
              <div className="content">
                <h3>{item.place_name}</h3>
                <p>Lets explore the world with Skywide Tours!</p>
                <a href="#" className="btn">
                  see more
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section-about" id="about">
          <div className="container about-box" data-aos="fade-up">
            <div className="about-box__heading">
              <h3 className="color-blue margin-bottom">About us</h3>
              <div className="heading heading--1 capitalize">
                Explore all corners of the world with us
              </div>
            </div>
            <div className="about-box__content">
              <p className="margin-bottom">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
                dolores at laborum dicta ab veniam autem non deserunt qui dolor
                repellendus, pariatur facilis soluta consequatur magnam hic
                eveniet modi eaque Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Impedit suscipit totam quo eveniet dicta
                explicabo.
              </p>
              <button className="btn btn--secondary">Read More</button>
            </div>
          </div>
        </section>
     {/* SECTION FOOTER */}
     <footer className="section-footer">
        <div className="footer-box container">
          <div className="contact-details">
            <h2 className="heading heading--2 margin-bottom">Tourism</h2>
            <ul className="contact-data">
              <li className="location">100 Nallin Street, New York</li>
              <li className="phone">+91 8778276015</li>
              <li className="email">Tourism@domain.com</li>
              <li className="social">
                <img
                  src={img1}
                  alt="whatsapp icon"
                  width="35"
                  height="35"
                />

                <img
                  src={img5}
                  alt="facebook icon"
                  width="35"
                  height="35"
                />

                {/* Add more social icons as needed */}
              </li>
            </ul>
          </div>

          <nav className="footer-nav" aria-label="navigation">
            <div className="nav-name">Quick Links</div>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#tours">Tours</a></li>
              <li><a href="#offers">Offers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>

          <nav className="footer-nav" aria-label="navigation">
            <div className="nav-name">Popular Destinations</div>
            <ul>
              <li><a href="#tours">Italy</a></li>
              <li><a href="#tours">England</a></li>
              <li><a href="#tours">India</a></li>
              <li><a href="#tours">Spain</a></li>
              <li><a href="#tours">Maldives</a></li>
            </ul>
          </nav>

          <div className="newsletter">
            <div className="newsletter__title">Newsletter</div>
            <div className="newsletter__text">
            A newsletter is a document sent by businesses on a regular schedule to subscribers of the business's mailing list. 
            </div>
            <form className="newsletter__input">
              <input type="text" placeholder="example@domain.com" />
              <img
                src={img1}
                alt="send icon"
                className="send-icon"
                width="36"
                height="36"
              />
            </form>
          </div>

          <div className="legal">
            <p className="text">Copyright &copy; by Saran&nbsp;</p>
            <a href="https://github.com/Manoranjan-D/responsive-website-tourism">
              <img
                src={img7}
                alt="github"
                className="github"
                width="35"
                height="35"
              />
            </a>
          </div>
        </div>
      </footer>
      <style>
        {`
        // .reqbody{
        //   background-Color:lightblue;
        // }
        .custom-agent-card {
          border: 1px solid #ccc;
          padding: 10px;
          margin: 10px;
          // background-color: #f9f9f9;
          border-radius: 5px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          background-Color:lightblue;
        }
        
        .custom-agent-card__content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
        }
        
        .custom-agent-card__header {
          flex: 1;
        }
        
        .custom-agent-card__name {
          font-size: 20px;
          margin: 0;
          color: #333;
          
        }
        
        .custom-agent-card__status {
          font-size: 14px;
          margin: 5px 0;
          color: #777;
        }
        
        .custom-agent-card__actions {
          display: flex;
          gap: 10px;
          margin-Left: 10px
        }
        
        .custom-agent-card__button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 5px 10px;
          border-radius: 3px;
          cursor: pointer;
        }
        
        .custom-agent-card__button:hover {
          background-color: #0056b3;
        }
        
          
.logo {
  font-size: 2px;
  font-weight: bold;
  margin-right: 10px;
}
  .agent-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
    width: 300px;
    max-width: 100%;
  }
  
  .agent-card__content {
    margin-bottom: 16px;
    
  }
  
  .agent-card h2 {
    margin-top: 0;
    
  }
  
  .agent-card p {
    margin-bottom: 8px;
  }
  
  .agent-card__button {
    margin-top: 16px;
    padding: 8px 16px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .agent-card__button:hover {
    background-color: #45a049;
  }
  
  .no-requests {
    text-align: center;
    color: #999;
    font-style: italic;
  }
#travelAgentsContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.agent-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  width: 300px;
  max-width: 100%;
  
}

.agent-card h2 {
  margin-top: 0;
}

.agent-card p {
  margin-bottom: 8px;
}

.agent-card__actions {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.agent-card__button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.agent-card__button:hover {
  background-color: #45a049;
}

.agent-card__button--decline {
  background-color: #f44336;
}

.agent-card__button--decline:hover {
  background-color: #d32f2f;
} 
:root {
  --color-blue: #023c88;
  --color-blue-lighter-1: #00b3d6;
  --color-blue-lighter-2: #49cae4;
  --color-gray-light: #f9fafb;
  --color-gray-dark: #e9ecef;
  --section-padding: clamp(4rem, 10vw, 12rem) 0rem;
  --two-col-layout: 2;
  --three-col-layout: 3;
}
@media only screen and (max-width: 56.25em) {
  :root {
    --two-col-layout: 1;
  }
}
@media only screen and (max-width: 59em) {
  :root {
    --three-col-layout: 2;
  }
}
@media only screen and (max-width: 37.5em) {
  :root {
    --three-col-layout: 1;
  }
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;
  scroll-behavior: smooth;
}

body {
  font-size: 1.6rem;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  line-height: 1.6;
}

.container {
  max-width: clamp(50rem, 85vw, 114rem);
  height: 100%;
  padding: 0 2.4rem;
  margin: 0 auto;
}

.section-about {
  padding: var(--section-padding);
}

.about-box {
  display: grid;
  grid-template-columns: repeat(
    var(--two-col-layout),
    minmax(-webkit-min-content, 1fr)
  );
  grid-template-columns: repeat(
    var(--two-col-layout),
    minmax(min-content, 1fr)
  );
  gap: 2rem;
}
.about-box__heading {
  padding: 4rem 0;
}
.about-box__content {
  padding: 4rem 2.4rem;
  background-color: rgba(73, 202, 228, 0.1);
}

.section-footer {
  background-color: var(--color-blue);
  padding: var(--section-padding);
}

.footer-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 4rem;
  color: #fff;
}

.contact-details .contact-data {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
}
.contact-details .contact-data .social {
  display: flex;
  gap: 0.5rem;
}
.contact-details .contact-data .social * {
  padding-right: 1rem;
}

.footer-nav .nav-name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.footer-nav ul {
  display: flex;
  flex-direction: column;
}

.footer-nav ul li {
  list-style: none;
  padding: 1.5rem 0;
}

.footer-nav ul li a {
  text-decoration: none;
  color: #fff;
}
.footer-nav ul li a:hover {
  text-decoration: underline;
}

.newsletter__title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.newsletter__text {
  margin-bottom: 1.6rem;
}

.newsletter__input {
  position: relative;
}

.send-icon {
  padding: 0.9rem;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
}

.legel {
  grid-column: 1/-1;
  border-top: 2px solid #fff;
  padding: 1.5rem 0;
  text-align: center;
}
.legel .text {
  padding: 1rem 0;
}

.header {
  position: absolute;
  color: #fff;
  width: 100%;
  z-index: 100;
}
@media only screen and (max-width: 50em) {
  .header {
    background-color: var(--color-blue);
  }
}
.header .navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 1.2rem 0;
  border-bottom: 1px solid #fff;
}
.header .navigation ul {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  font-size: 1.7rem;
  font-weight: 700;
}
@media only screen and (max-width: 50em) {
  .header .navigation ul {
    display: none;
  }
}
.header .navigation ul li:not(:last-child) {
  padding: 0rem 2.5rem;
  transition: background-color 0.5s;
}
.header .navigation ul li:not(:last-child) a {
  color: #fff;
  text-decoration: none;
}
.header .navigation ul li:not(:last-child) a:hover {
  color: var(--color-blue-lighter-2);
}
.header .navigation .logo {
  text-transform: uppercase;
  font-size: 2rem;
  font-weight: 700;
}
.header .nav-icon {
  display: none;
  border: 1px solid #fff;
  padding: 0.1rem;
}
@media only screen and (max-width: 50em) {
  .header .nav-icon {
    display: block;
  }
}

.section-review {
  background-color: var(--color-gray-light);
  padding: var(--section-padding);
}

.review-header {
  text-align: center;
  margin-bottom: 10rem;
}

.review-cards {
  display: grid;
  grid-template-columns: repeat(
    var(--two-col-layout),
    minmax(-webkit-min-content, 1fr)
  );
  grid-template-columns: repeat(
    var(--two-col-layout),
    minmax(min-content, 1fr)
  );
  row-gap: 10rem;
  -moz-column-gap: 5rem;
  column-gap: 5rem;
  justify-items: center;
}

.r-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  max-width: 40rem;
  padding: 0 2.4rem 2rem 2.4rem;
  position: relative;
}
.r-card > *:not(:last-child) {
  margin-bottom: 2.5rem;
}
.r-card:hover {
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
}
.r-card__img {
  max-width: 100%;
  border-radius: 50%;
  margin-top: -5rem;
}
.r-card__name {
  font-weight: 700;
}
.r-card__description {
  text-align: center;
}
.r-card__rating {
  display: flex;
  justify-content: center;
  align-items: center;
}

.quot {
  font-size: 7rem;
  position: absolute;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-blue);
}

.section-tours {
  background-color: var(--color-gray-light);
  padding: var(--section-padding);
}

.tour-box__heading {
  text-align: center;
  margin-bottom: 4rem;
}

.tour-box__cards {
  display: grid;
  grid-template-columns: repeat(
    var(--three-col-layout),
    minmax(-webkit-min-content, 1fr)
  );
  grid-template-columns: repeat(
    var(--three-col-layout),
    minmax(min-content, 1fr)
  );
  gap: 3rem;
}

.t-card {
  background-color: #fff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #000;
}
.t-card:hover .t-card__img {
  filter: brightness(0.8);
}
.t-card__img {
  max-width: 100%;
  height: 250px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
.t-card__content {
  padding: 2.5rem;
}
.t-card__content > *:not(:last-child) {
  margin-bottom: 1.5rem;
}
.t-card__title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid;
}
.t-card__description {
  text-align: center;
}
.t-card__items {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.5rem;
}
.t-card__items > * {
  padding: 0.2rem 1rem;
  background-color: rgba(73, 202, 228, 0.7);
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.btn {
  text-transform: capitalize;
  padding: 1.3rem;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 400;
  background-color: var(--color-blue-lighter-2);
  color: #000;
  border: none;
  transition: background-color 0.4s;
  cursor: pointer;
}
.btn:hover {
  background-color: var(--color-blue-lighter-1);
}
.btn--drop-shadow {
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
}
.btn--secondary {
  border: 1.5px solid var(--color-blue-lighter-2);
  background-color: transparent;
}

input[type='text'] {
  padding: 1.3rem 2.5rem;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1.6rem;
  background-color: #fff;
  color: #000;
  border: none;
  width: 100%;
}
input[type='text']:focus {
  outline: none;
}

.custom-date {
  position: relative;
  margin-top: 1rem;
}
.custom-date .calender-icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 5rem;
  height: 100%;
  background-color: var(--color-gray-dark);
  border: 1px solid var(--color-blue-lighter-2);
  padding: 1rem;
  pointer-events: none;
}
.custom-date input[type='date'] {
  padding: 0.8rem;
  border-radius: 4px;
  font-family: inherit;
  font-size: inherit;
  background-color: var(--color-gray-light);
  border: 1px solid var(--color-blue-lighter-2);
  cursor: pointer;
  line-height: inherit;
  outline: none;
  width: 100%;
}

.custom-select {
  position: relative;
  margin-top: 1rem;
}
.custom-select select {
  background-color: var(--color-gray-light);
  border: 1px solid var(--color-blue-lighter-2);
  padding: 1rem;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  line-height: inherit;
  outline: none;
}
.custom-select .arrow {
  background-color: var(--color-gray-dark);
  border: 1px solid var(--color-blue-lighter-2);
  width: 5rem;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  pointer-events: none;
}
.custom-select .arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-top: 1rem solid var(--color-blue-lighter-2);
}

.heading {
  font-weight: 700;
  text-transform: uppercase;
}
.heading--1 {
  font-size: clamp(2.5rem, 4vw, 4rem);
}
.heading--2 {
  font-size: clamp(2rem, 4vw, 3rem);
}



.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 70ch;
  height: 100%;
}

.margin-right {
  margin-right: 2rem;
}

.margin-bottom {
  margin-bottom: 2rem;
}

.capitalize {
  text-transform: capitalize;
}

.color-blue {
  color: var(--color-blue-lighter-2);
}

.section-search {
  padding: 0 2.4rem;
}

.search-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 3rem;
  align-items: flex-end;
  padding: 5rem 2.4rem 6rem 2.4rem;
  border-radius: 5rem;
  background-color: var(--color-gray-light);
  margin-top: -5rem;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.search-box .btn {
  align-self: flex-end;
}

.section-offer {
  padding: var(--section-padding);
  background: url('https://thumbs.dreamstime.com/b/beach-background-beautiful-beach-landscape-tropical-nature-scene-palm-trees-blue-sky-summer-holiday-vacation-concept-93725354.jpg') fixed no-repeat center;
  background-size: cover;
  position: relative;
  color: #fff;
  z-index: 1;
}
.section-offer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(2, 60, 136, 0.5);
  z-index: -1;
}

.offer-box {
  display: grid;
  grid-template-columns: repeat(
    var(--two-col-layout),
    minmax(-webkit-min-content, 1fr)
  );
  grid-template-columns: repeat(
    var(--two-col-layout),
    minmax(min-content, 1fr)
  );
  gap: 5rem;
  justify-items: center;
  align-items: center;
}
.offer-box__percentage {
  font-size: clamp(10rem, 20vw, 15rem);
}
.offer-box__content {
  display: grid;
  gap: 2rem;
  justify-items: flex-start;
}
.gallery .box-container{
  display: flex;
  flex-wrap: wrap;
  gap:1.5rem;
}

.gallery .box-container .box{
  overflow: hidden;
  box-shadow: 0 1rem 2rem rgba(0,0,0,.1);
  border:1rem solid #fff;
  border-radius: .5rem;
  flex:1 1 30rem;
  height: 25rem;
  position: relative;
}

.gallery .box-container .box img{
  height: 100%;
  width:100%;
  object-fit: cover;
}

.gallery .box-container .box .content{
  position: absolute;
  top:-100%; left:0;
  height: 100%;
  width:100%;
  text-align: center;
  background:rgba(0,0,0,.7);
  padding:2rem;
  padding-top: 5rem;
}

.gallery .box-container .box:hover .content{
  top:0;
}

.gallery .box-container .box .content h3{
  font-size: 2.5rem;
  color:var(--blue);
}

.gallery .box-container .box .content p{
  font-size: 1.5rem;
  color:#eee;
  padding:.5rem 0;
}
.section-booking {
background-color: #f7f7f7;
padding: 50px 0;
}

.booking-box {
max-width: 600px;
margin: 0 auto;
}

.booking-box__content {
padding: 20px;
background-color: #ffffff;
border-radius: 5px;
}

.booking-box__content h2 {
font-size: 24px;
margin-bottom: 20px;
}

.form-group {
margin-bottom: 20px;
}

.form-group label {
display: block;
font-size: 16px;
font-weight: bold;
margin-bottom: 5px;
}

.form-group input[type="date"],
.form-group input[type="number"] {
width: 100%;
padding: 10px;
font-size: 16px;
border: 1px solid #cccccc;
border-radius: 5px;
}

.btn {
background-color: #007bff;
color: #ffffff;
padding: 10px 20px;
font-size: 16px;
border: none;
border-radius: 5px;
cursor: pointer;
}

.modal-header {
background-color: #007bff;
color: #ffffff;
font-size: 20px;
}

.modal-body,
.modal-footer {
padding: 20px;
}

.modal-footer .btn {
margin-right: 10px;
}

.modal-backdrop.show {
opacity: 0.5;
}
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

}
.card-container-img {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  height:400px
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

.card h2 {
  font-size: 24px;
  color: #007bff;
  margin-bottom: 10px;
}

.card p {
  font-size: 16px;
  color: #333;
}

.card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card li {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.card .agency-list {
  margin-top: 10px;
}

.card .agency-list li:before {
  color: #007bff;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}



        `}
      </style>
    </div>
  );
}
