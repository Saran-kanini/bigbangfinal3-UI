import React, {useState} from 'react';
import './Demo.css';
import axios from 'axios'

const Demo = () => {
  const [placeImagePath, setPlaceImg] = useState(null);
  const [HotelImagePath, setHotelImagePath] = useState(null);
  const [hotel_Name, setHotelName] = useState('');
  const [food, setHotelFood] = useState('');
  const [place, setHotelPlace] = useState('');
  const [agencyId, setAgencyId] = useState('');
  const [isFormActive, setIsFormActive] = useState(false);

  const handleAgencyIdChange = (e) => {
    setAgencyId(e.target.value);
  };
  const handleHotelNameChange = (e) => {
    setHotelName(e.target.value);
  };
  const handleFoodChange = (e) => {
    setHotelFood(e.target.value);
  };
  const handlePlaceChange = (e) => {
    setHotelPlace(e.target.value);
  };
  const handlePlaceImageChange = (e) => {
    setPlaceImg(e.target.files[0]);
  };
  const handleHotelImageChange = (e) => {
    setHotelImagePath(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object
    const postData = new FormData();
    postData.append('hotel_Name', hotel_Name);
    postData.append('food', food);
    postData.append('place', place);
    postData.append('placeImageFile', placeImagePath);
    postData.append('hotelImageFile', HotelImagePath);
    postData.append('agency.Agency_Id', agencyId);


    // Send the POST request using Axios
    axios
      .post('https://localhost:7125/api/Accommodation', postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // Handle success, if needed
        console.log('Data successfully posted:', response.data);
      })
      .catch((error) => {
        // Handle error, if needed
        console.error('Error posting data:', error);
      });
  };
  const handleNextClick = () => {
    const allInput = document.querySelectorAll(".first input");
    let isAnyInputFilled = false;

    allInput.forEach(input => {
      if (input.value !== "") {
        isAnyInputFilled = true;
      }
    });
    setIsFormActive(isAnyInputFilled);

  };

  return (
   <div>
    
    <div className={`container${isFormActive ? ' secActive' : ''}`}>

      <header>Accommodation</header>

      <form action="#" >
        {/* Form: Personal Details */}
        <div className="form first">
          <div className="details personal">
            <span className="title">Personal Details</span>

            <div className="fields">
              <div className="input-field">
                <label>Hotel Name</label>
                <input type="text" placeholder="Enter name" 
               value={hotel_Name}
               onChange={handleHotelNameChange} 
               required />
              </div>

              <div className="input-field">
                <label>Hotel Food</label>
                <input type="text" placeholder="Enter name" 
               value={food}
               onChange={handleFoodChange} 
               required />
              </div>

              <div className="input-field">
                <label>Place Name</label>
                <input type="text" placeholder="Enter name" 
               value={place}
               onChange={handlePlaceChange} 
               required />
              </div>

              <div className="input-field">
                <label>Choose Hotel File</label>
                <input type="file" placeholder="Enter name" 
               onChange={handleHotelImageChange} 
               name="hotelImagePath"
               required />
              </div>
              <div className="input-field">
                <label>Choose Place File</label>
                <input type="file" placeholder="Enter name" 
               onChange={handlePlaceImageChange} 
               name="placeImage"
               required />
              </div>
              <div className="input-field">
                <label>Agency Id</label>
                <input type="number" placeholder="Enter Id" 
               value={agencyId}
               onChange={handleAgencyIdChange} 
               required />
              </div>
            </div>
          </div>

          {/* Form: Identity Details */}
          <div className="details ID">


            <button className="nextBtn" onClick={handleSubmit}>
        <span className="btnText">Submit</span>
        <i className="uil uil-navigator"></i>
      </button>
          </div>
        </div>

      </form>
    </div>
    <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');
          *{
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: 'Poppins', sans-serif;
          }
          body{
              margin-top: 100px;
             margin-left: 300px;
            background: #00f4;
          }
          .container{
              position: relative;
              max-width: 900px;
              width: 100%;
              border-radius: 6px;
              padding: 30px;
              margin: 0 15px;
              background-color: #fff;
              box-shadow: 0 5px 10px rgba(0,0,0,0.1);
          }
          .container header{
              position: relative;
              font-size: 20px;
              font-weight: 600;
              color: #333;
          }
          .container header::before{
              content: "";
              position: absolute;
              left: 0;
              bottom: -2px;
              height: 3px;
              width: 27px;
              border-radius: 8px;
              background-color: #4070f4;
          }
          .container form{
              position: relative;
              margin-top: 16px;
              min-height: 490px;
              background-color: #fff;
              overflow: hidden;
          }
          .container form .form{
              position: absolute;
              background-color: #fff;
              transition: 0.3s ease;
          }
          .container form .form.second{
              opacity: 0;
              pointer-events: none;
              transform: translateX(100%);
          }
          form.secActive .form.second{
              opacity: 1;
              pointer-events: auto;
              transform: translateX(0);
          }
          form.secActive .form.first{
              opacity: 0;
              pointer-events: none;
              transform: translateX(-100%);
          }
          .container form .title{
              display: block;
              margin-bottom: 8px;
              font-size: 16px;
              font-weight: 500;
              margin: 6px 0;
              color: #333;
          }
          .container form .fields{
              display: flex;
              align-items: center;
              justify-content: space-between;
              flex-wrap: wrap;
          }
          form .fields .input-field{
              display: flex;
              width: calc(100% / 3 - 15px);
              flex-direction: column;
              margin: 4px 0;
          }
          .input-field label{
              font-size: 12px;
              font-weight: 500;
              color: #2e2e2e;
          }
          .input-field input, select{
              outline: none;
              font-size: 14px;
              font-weight: 400;
              color: #333;
              border-radius: 5px;
              border: 1px solid #aaa;
              padding: 0 15px;
              height: 42px;
              margin: 8px 0;
          }
          .input-field input :focus,
          .input-field select:focus{
              box-shadow: 0 3px 6px rgba(0,0,0,0.13);
          }
          .input-field select,
          .input-field input[type="date"]{
              color: #707070;
          }
          .input-field input[type="date"]:valid{
              color: #333;
          }
          .container form button, .backBtn{
              display: flex;
              align-items: center;
              justify-content: center;
              height: 45px;
              max-width: 200px;
              width: 100%;
              border: none;
              outline: none;
              color: #fff;
              border-radius: 5px;
              margin: 25px 0;
              background-color: #4070f4;
              transition: all 0.3s linear;
              cursor: pointer;
          }
          .container form .btnText{
              font-size: 14px;
              font-weight: 400;
          }
          form button:hover{
              background-color: #265df2;
          }
          form button i,
          form .backBtn i{
              margin: 0 6px;
          }
          form .backBtn i{
              transform: rotate(180deg);
          }
          form .buttons{
              display: flex;
              align-items: center;
          }
          form .buttons button , .backBtn{
              margin-right: 14px;
          }
          
          @media (max-width: 750px) {
              .container form{
                  overflow-y: scroll;
              }
              .container form::-webkit-scrollbar{
                 display: none;
              }
              form .fields .input-field{
                  width: calc(100% / 2 - 15px);
              }
          }
          
          @media (max-width: 550px) {
              form .fields .input-field{
                  width: 100%;
              }
          }
        `}
      </style>
    </div>
  );
};

export default Demo;
