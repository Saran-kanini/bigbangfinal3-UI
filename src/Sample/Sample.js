import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sample.css';
import img1 from './img/nav-icon.svg';
import img2 from './img/france.jpg';
import img3 from './img/itally.jpg';
import img4 from './img/heart.svg';
import img5 from './img/logo-facebook.svg';
import img6 from './img/india.jpg';
import img7 from './img/github.svg';
import img8 from './img/england.jpg';
import img9 from './img/maldives.jpg';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import FeedBack from '../Booking/Feedback';
import { Link } from 'react-router-dom';
import Userlogin from '../User/Userlogin';


export default function Sample() {
  const [rating, setRating] = useState(null);
  const [showPost, setShowPost] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [destination, setDestination] = useState('');
  const [averagePrice, setAveragePrice] = useState('');

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleAveragePriceChange = (event) => {
    setAveragePrice(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleTextareaChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('https://localhost:7125/api/FeedBacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedBack_area: feedbackText,
          feedBack_rating: rating,
          user: {
            user_Id: 1, 
          },
          agencies: {
            agency_Id: 1,
          },
        }),
      });
      
      if (response.ok) {
        setShowPost(true);
        console.log("Feedback Successfully Send")
      } else {
        console.error('Failed to post feedback:', response);
      }
    } catch (error) {
      console.error('Error while posting feedback:', error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('User Name');
    localStorage.removeItem('user_Id');
    localStorage.removeItem('selectedAgencyId');

    // Navigate to the login page
    window.location.href = '/userlogin'; // Assuming the login page URL is '/login'
  };
  const handleEditClick = () => {
    setShowPost(false);
  };
  const [topTours, setTopTours] = useState([]);
  const [bookingData, setBookingData] = useState({
    Customer_Date_Of_Booking: '',
    booking_amount: 0,
    user: null,
    agency: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchTopTours();
    fetchFeedbackData();
  }, []);

  const fetchTopTours = async () => {
    try {
      const response = await axios.get('https://localhost:7125/api/Agency',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
      if (!response.data || response.data.length === 0) {
        throw new Error('No data found');
      }
      setTopTours(response.data);
    } catch (error) {
      console.error('Error fetching top tours:', error);
    }
  };

  const fetchFeedbackData = async () => {
    try {
      const response = await axios.get('https://localhost:7125/api/FeedBacks');
      setFeedbackList(response.data);
    } catch (error) {
      console.error('Error fetching feedback data:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:7125/api/Bookings', bookingData);
      console.log('Booking request successful:', response.data);
      // Show success message or take any other actions as needed
      setShowModal(false); // Close the modal after successful booking
    } catch (error) {
      console.error('Error submitting booking:', error);
      // Show error message or take any other actions as needed
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };
  const handleCardClick = (agencyId) => {
    localStorage.setItem('selectedAgencyId', agencyId);
  };

const [searchTerm, setSearchTerm] = useState('');

const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};

// Filter the topTours based on search criteria
const filteredTours = topTours.filter((tour) => {
  const tourName = tour.tour_place.toLowerCase();
  const tourRating = tour.agency_Rating?.toString() || '';
  const tourRate = tour.rate_for_day?.toString() || ''; 
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return (
    tourName.includes(lowerCaseSearchTerm) ||
    tourRating.includes(lowerCaseSearchTerm) ||
    tourRate.includes(lowerCaseSearchTerm)
  );
});
// Inline CSS styles
const searchBarContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20px',
};

const searchInput = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
  outline: 'none',
  width: '600px',
  marginLeft: '100px',
};

const placeholderText = {
  color: '#999',
};

const hoverFocusStyles = {
  borderColor: '#0066cc',
};

const searchButton = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#0066cc',
  fontSize: '16px',
  cursor: 'pointer',
  width: '100px',
};

const searchButtonHover = {
  backgroundColor: '#0052a4',
};


  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="container">
          <div className="navigation">
            <div className="logo">Turismo</div>
            <img
              src={img1}
              className="nav-icon"
              alt="navigation icon"
              width="30"
              height="30"
            />
            <ul>
              <li>
                <a href="#home"> Home </a>
              </li>
              <li>
                <a href="#about"> About </a>
              </li>
              <li>
                <a href="#tours"> Tours </a>
              </li>
              <li>
                <a href="#gallery"> Gallery </a>
              </li>
              <li>
                <a href="#feedback"> FeedBack </a>
              </li>
            <li>
            <button onClick={handleLogout}>Logout</button>
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
       
  {/* SECTION ABOUT */}
  <section className=" " id="about">
          <div className="container about-box" data-aos="fade-up">
            <div className="about-box__heading">
              <h3 className="color-blue margin-bottom">About us</h3>
              <div className="heading heading--1 capitalize">
                Explore all corners of the world with us
              </div>
            </div>
            <div className="about-box__content">
              <p className="margin-bottom">
              Tourism encourages people of all backgrounds to visit a particular place, so tourist destinations become a melting pot of other cultures. People can begin to understand one another and may even make friends with people from other countries.
              </p>
              <button className="btn btn--secondary">Read More</button>
            </div>
          </div>
        </section>
        <Userlogin/><br></br><br></br>
        <section className="section-search">
      <div className="container search-box">
        
        {/* Search Input */}
        <div style={searchBarContainer}>
          <input
            type="text"
            placeholder="Search by tour name..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={searchInput}
          />
        </div>

        {/* Search Button */}
        <button className="btn" style={searchButton}>Search</button>
      </div>
    </section>

        <div>
      <section className="section-tours" id="tours">
        <div className="container tour-box" data-aos="fade-up">
          <header className="tour-box__heading">
            <h2 className="heading heading--2 color-blue margin-bottom">
             All Package
            </h2>
          </header>
          {/* Display filtered tours */}

<article className="tour-box__cards">
  {filteredTours.map((tour) => (
    <Link to={`/samp/${tour.agency_Id}`} key={tour.agency_Id} className="t-card-link">
      <div
        className="t-card"
        data-aos="flip-left"
        data-aos-duration="1000"
        onClick={() => handleCardClick(tour.agency_Id)}
      >
        <img
          src={`https://localhost:7125/uploads/images/${tour.tourImagePath}`}
          alt={tour.tour_place}
          width="500"
          height="500"
          className="t-card__img"
        />

        <div className="t-card__content">
          <div className="t-card__title">
            <h3 className="name">{tour.tour_place}</h3>
            <p className="price">₹{tour.rate_for_day}</p>
          </div>
          <div className="t-card__description">
            <p>
              <b>Habibi, come to {tour.tour_place}!</b>
            </p>
            <p>
              {tour.tour_place} is the largest and most populous city in the UAE. There are approximately 2,780,000 residents from over 200 nationalities, plus countless tourists and traders on any given day.
            </p>
          </div>

          <div className="t-card__items">
            <div className="days">
              Offer: {tour.offer_For_Day}%
              <div className="days" style={{ marginLeft: "10px", marginRight: "3px" }}>{tour.number_Of_Days} Days</div>
              <div className="likes" style={{ marginLeft: "13px" }}>
                <img
                  src={img4} // Replace this with the actual image source for the heart icon
                  alt="heart"
                  width="20"
                  height="20"
                />
                {tour.agency_Rating} Rating {/* Assuming you have a field for the number of likes */}
              </div>
            </div>
          </div>
          <button type="submit" className="btn" onClick={toggleModal} style={{ marginLeft: '80px' }}>
            View Package
          </button>
        </div>
      </div>
    </Link>
  ))}
</article>

        </div>
        <div className="box"></div>
      </section>
    </div>

      
        {/* SECTION OFFER */}
        <section className="section-offer" id="offers">
          <div className="container offer-box">
            <div className="offer-box__percentage" data-aos="zoom-in">
            50%
            </div>
            <div className="offer-box__content" data-aos="fade-up">
              <h2 className="heading heading--2">
                Special Offer this month on our premium tours ₹250 Regular ₹500
              </h2>
              <p>
              According to the United Nations World Tourism Organisation (UNWTO), tourism entails the movement of people to countries or places outside their usual environment for personal or business/professional purposes. These people are called visitors.!
              </p>
              <button className="btn">book Now</button>
            </div>
          </div>
        </section><br/>
{/* gallery */}
<section className="gallery" id="gallery">
      <h1 className="heading">
        <span>g</span>
        <span>a</span>
        <span>l</span>
        <span>l</span>
        <span>e</span>
        <span>r</span>
        <span>y</span>
      </h1>
      <div className="box-container">
        <div className="box">
          <img src={img3} alt="" />
          <div className="content">
            <h3>amazing places</h3>
            <p>Lets explore the world with Skywide Tours!</p>
            <a href="#" className="btn">
              see more
            </a>
          </div>
        </div>
        {/* Continue with other divs here */}
        <div className="box">
          <img src={img2} alt="" />
          <div className="content">
            <h3>amazing places</h3>
            <p>Lets explore the world with Skywide Tours!</p>
            <a href="#" className="btn">
              see more
            </a>
          </div>
        </div>
        {/* Add other boxes as needed */}
        <div className="box">
          <img src={img6} alt="" />
          <div className="content">
            <h3>amazing places</h3>
            <p>Lets explore the world with Skywide Tours!</p>
            <a href="#" className="btn">
              see more
            </a>
          </div>
        </div>
        {/* Add other boxes as needed */}
        <div className="box">
          <img src={img9} alt="" />
          <div className="content">
            <h3>amazing places</h3>
            <p>Lets explore the world with Skywide Tours!</p>
            <a href="#" className="btn">
              see more
            </a>
          </div>
        </div>
        {/* Add other boxes as needed */}
        <div className="box">
          <img src={img2} alt="" />
          <div className="content">
            <h3>amazing places</h3>
            <p>Lets explore the world with Skywide Tours!</p>
            <a href="#" className="btn">
              see more
            </a>
          </div>
        </div>
        {/* Add other boxes as needed */}
        <div className="box">
          <img src={img8} alt="" />
          <div className="content">
            <h3>amazing places</h3>
            <p>Lets explore the world with Skywide Tours!</p>
            <a href="#" className="btn">
              see more
            </a>
          </div>
        </div>
        {/* Add other boxes as needed */} <div className="box">
          <img src={img2} alt="" />
          <div className="content">
            <h3>amazing places</h3>
            <p>Lets explore the world with Skywide Tours!</p>
            <a href="#" className="btn">
              see more
            </a>
          </div>
        </div>
        {/* Add other boxes as needed */} <div className="box">
          <img src={img2} alt="" />
          <div className="content">
            <h3>amazing places</h3>
            <p>Lets explore the world with Skywide Tours!</p>
            <a href="#" className="btn">
              see more
            </a>
          </div>
        </div>
        {/* Add other boxes as needed */}
      </div>
    </section>
        {/* SECTION REVIEW */}
        <section className="section-review" id='feedback'>
      <div className="container review-box" data-aos="fade-up">
        <header className="review-header">
          <h3 className="color-blue">Our Reviews</h3>
          <h2 className="heading heading--2">
            What the people say about us
          </h2>
        </header>

        <article className="review-cards">
          {feedbackList.map((feedback) => (
            <div className="r-card" key={feedback.feedBack_id}>
              <img
                src={img8} // Replace with the actual image source
                alt=""
                className="r-card__img"
                width="120"
                height="120"
              />
              <div className="r-card__name">{feedback.user_id}</div>
              {/* <span className="quot">&#8223;</span> */}
              <div className="r-card__description">
                {feedback.feedBack_area}
              </div>
              <div className="r-card__rating">
              <img
                  src={img4}
                  alt="star"
                  width="30"
                  height="30"
                />{feedback.feedBack_rating} Rating
               
              </div>
            </div>
          ))}
        </article>
      </div>
    </section>
      </main>
 <div><FeedBack/></div><br/>
      {/* SECTION FOOTER */}
      <footer className="section-footer">
        <div className="footer-box container">
          <div className="contact-details">
            <h2 className="heading heading--2 margin-bottom">Tourism</h2>
            <ul className="contact-data">
              <li className="location">100 Nallin Street, New York</li>
              <li className="phone">+00 000 000 00</li>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
              nisi!
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
            <p className="text">Copyright &copy; by Manoranjan&nbsp;</p>
            <a href="https://github.com/Saran-kanini">
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
          
          .  {
            padding: var(--section-padding);
            background-Color: rgba(73, 202, 22, 0.1);
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
            background-color:lightblue;
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
            text-decoration: none;

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
            background-Color:lightblue;
          
          }
          
          .search-box {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
            gap: 3rem;
            align-items: flex-end;
            padding: 5rem 2.4rem 6rem 20rem;
            border-radius: 8rem;
            background-color: lightblue;
            margin-top: -7rem;  
            // box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
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
        
        `}
      </style>
    </>
  );
}
