import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Booking from '../Booking/Booking/Booking';

export default function Samp() {
  const { accommodationDetailId } = useParams();
  const [accommodationData, setAccommodationData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7125/api/Accommodation/ByAgency/${accommodationDetailId}`)
      .then(response => {
        setAccommodationData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [accommodationDetailId]);

  const handleGoBack = () => {
    localStorage.removeItem('selectedAgencyId');
    navigate('/sample');
  };
  const handleGoBook = () => {
    navigate('/booking');
  };
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);
  return (
    <div className="accommodation-container">
      <center>
        <h1>Accommodation Details</h1>
      </center>
      <main className="timeline-container">
      <div className="timeline">
        <div className="tl-content tl-content-active">
          <div className="tl-header">
            <span className="tl-marker"></span>
            <p className="tl-title">Packages</p>
            <button className="back-button" onClick={handleGoBack}>Back</button>
            <time className="tl-time" dateTime={today.toISOString()}>{formattedDate}</time>
          </div>
          <div className="tl-body">
  <div className="accommodation-cards">
    {accommodationData.map((accommodation, index) => (
      <div key={accommodation.accommodationDetailId} className="accommodation-card">
        <div className="card-content">
          <div className="card-image">
            <img className="hotel-image" src={`https://localhost:7125/uploads/images/${accommodation.hotelImagePath}`} alt="Hotel"/>            
          </div>
          <div className="card-info">
          <h2><b>{`Day ${index + 1}`}</b></h2> {/* Displaying day count based on array index */}
            <h2>{accommodation.hotel_Name}</h2>
            <p className="agency-name"><b>Agency: </b>{accommodation.agency.agency_Name}</p>
            <p><b>Contact: </b>{accommodation.agency.agency_Contact}</p>
            <p><b>Location: </b>{accommodation.agency.tour_place}</p>
            <p><b>Food: </b>{accommodation.food}</p>
            <p><b>Place: </b>{accommodation.place}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
      </div>
      <Booking/>

      </main>
      <style>
        {`
         /* Samp.css */
         /* Samp.css */
.back-button{
  background-Color:lightblue;
  margin-Left:20px
}
.timeline-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color: #333;
}

.timeline {
  position: relative;
  padding-left: 40px;
  margin-top: 30px;
}

.tl-content {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 20px;
}

.tl-header {
  display: flex;
  align-items: center;
}

.tl-marker {
  width: 15px;
  height: 15px;
  background-color: #1E90FF;
  border-radius: 50%;
  margin-right: 10px;
}

.tl-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.tl-time {
  font-size: 14px;
  color: #777;
  margin-left: auto;
}

.tl-body {
  margin-top: 10px;
}


         .accommodation-container {
           width: 100%;
           max-width: 1200px;
           margin: 0 auto;
           font-family: Arial, sans-serif;
           color: #333;
         }

         .accommodation-cards {
           display: grid;
           grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
           gap: 20px;
         }

         .accommodation-card {
           border: 1px solid #ccc;
           border-radius: 5px;
           padding: 20px;
           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
           color: #333;
           background-color: lightblue;
           display: flex;
           flex-direction: column;
         }

         .card-content {
           display: flex;
           justify-content: space-between;
         }

         .card-image {
           width: 40%;
         }

         .hotel-image {
           width: 130px;
           height: 200px;
           object-fit: cover;
           border-radius: 5px;
         }

         .card-info {
           width: 60%;
           padding-left: 20px;
         }

         h2 {
           color: #1E90FF;
           margin-bottom: 10px;
         }

         p {
           margin: 5px 0;
           font-size: 14px;
         }

         .agency-name {
           color: #008080;
         }
        `}
      </style>
    </div>
  );
}
