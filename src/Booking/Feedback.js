
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Feed.css'; 
import axios from 'axios'; 
import 'react-toastify/dist/ReactToastify.css';
import {  toast} from 'react-toastify';


export default function FeedBack() {
  const [rating, setRating] = useState(null);
  const [showPost, setShowPost] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleTextareaChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('https://localhost:7125/api/FeedBacks', {
        feedBack_area: feedbackText,
        feedBack_rating: rating,
        user: {
          user_Id: 4, 
        },
        agency: {
          agency_Id: 2,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 201) { 
        setShowPost(true);
        console.log("Feedback Successfully Sent");
        toast.success('FeedBack Send Successfully'); 
      } else {
        console.error('Failed to post feedback:', response);
      }
    } catch (error) {
      console.error('Error while posting feedback:', error);
    }
  };
  
  const handleEditClick = () => {
    setShowPost(false);
  };

  return (
    <div>
      <div className="container-rating">
        <div className={`post${showPost ? ' show' : ''}`}>
          <div className="text">Thanks for rating us!</div>
          <div className="edit" onClick={handleEditClick}>EDIT</div>
        </div>
        <div className={`star-widget${showPost ? ' hide' : ''}`}>
          <input type="radio" name="rate" id="rate-5" value="5" onChange={handleRatingChange} />
          <label htmlFor="rate-5" className="bi bi-star-fill"></label>
          <input type="radio" name="rate" id="rate-4" value="4" onChange={handleRatingChange} />
          <label htmlFor="rate-4" className="bi bi-star-fill"></label>
          <input type="radio" name="rate" id="rate-3" value="3" onChange={handleRatingChange} />
          <label htmlFor="rate-3" className="bi bi-star-fill"></label>
          <input type="radio" name="rate" id="rate-2" value="2" onChange={handleRatingChange} />
          <label htmlFor="rate-2" className="bi bi-star-fill"></label>
          <input type="radio" name="rate" id="rate-1" value="1" onChange={handleRatingChange} />
          <label htmlFor="rate-1" className="bi bi-star-fill"></label>
          <form onSubmit={handleSubmit}>
            <header></header>
            <div className="textarea">
              <textarea 
                cols="30" 
                placeholder="Describe your experience.."
                value={feedbackText}
                onChange={handleTextareaChange}
              />
            </div>
            <div className="btn">
              <button type="submit">Post</button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}

