import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast} from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

export default function TravelLogin() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [admin_Name, setAgent_Name] = useState('');
  const [admin_Password, setadmin_Password] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user_Email, setUser_Email] = useState('');
    const [user_Phone, setUser_Phone] = useState('');
    const [user_Gender, setUser_Gender] = useState('');
    const [user_Location, setUser_Location] = useState('');
    const navigate = useNavigate();

  const toggleSignIn = () => {
    setIsSignIn(true);
  };

  const toggleSignUp = () => {
    setIsSignIn(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (!isValidUsername(admin_Name)) {
      toast.error("Invalid username format. Username should not contain numbers.");
      return;
    }
  
    if (admin_Password.length < 5) {
      toast.error("Password must be at least 5 characters long.");
      return;
    }
  
    // Check for other password criteria (e.g., at least one uppercase, one lowercase, one digit, etc.)
    if (!containsUppercase(admin_Password) || !containsLowercase(admin_Password) || !containsDigit(admin_Password)) {
      toast.error("Password must contain at least one uppercase letter, one lowercase letter, and one digit.");
      return;
    }  
    axios
      .post('https://localhost:7125/api/Token/User', {
        user_Name: admin_Name,
        user_Password: admin_Password,
      })
      .then((response) => {
        const token = response.data; 
        localStorage.setItem('token', token);
        localStorage.setItem('User Name', admin_Name);
        console.log('token', token)
        console.log('User Name', admin_Name)
  
        // Now, make another API call to get the user_Id
        axios
          .get(`https://localhost:7125/api/Users/GetUserIdByUsername?username=${admin_Name}`) // Replace with the actual API endpoint to get user details by username
          .then((userResponse) => {
            const userId = userResponse.data;
            localStorage.setItem('user_Id', userResponse.data);
            console.log('User Id:', userResponse.data);
  
            toast.success(`Login successful. Welcome, ${admin_Name}!`);   
            navigate('/sample');
          })
          .catch((userError) => {
            console.error('Error:', userError);
            toast.error('Error occurred while getting user details');
          });
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Error occurred during login');
      });
  };
  
  
  const isValidUsername = (username) => {
    return /^[a-zA-Z]+$/.test(username);
  };
  const handleRegister = (e) => {
    e.preventDefault();

    if (!isValidUsername(admin_Name)) {
    toast.error("Invalid username format. Username should not contain numbers.");
    return;
  }

    if (admin_Password.length < 5) {
      toast.error("Password must be at least 5 characters long.");
      return;
    }
    if (!containsUppercase(admin_Password) || !containsLowercase(admin_Password) || !containsDigit(admin_Password)) {
      toast.error("Password must contain at least one uppercase letter, one lowercase letter, and one digit.");
      return;
    }
    if (admin_Password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Additional validation for user registration details
    if (!user_Email || !/^\S+@\S+\.\S+$/.test(user_Email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!user_Phone || !/^\d{10}$/.test(user_Phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    if (!user_Gender) {
      toast.error('Please select a gender');
      return;
    }

    if (!user_Location) {
      toast.error('Please enter a location');
      return;
    }

    const newUser = {
      user_Name: admin_Name,
      user_Email: user_Email,
      user_Phone: user_Phone,
      user_Gender: user_Gender,
      user_Location: user_Location,
      user_Password: admin_Password,
    };

    axios
      .post('https://localhost:7125/api/Users', newUser)
      .then((response) => {
        // Registration successful, show success message, navigate to login, etc.
        console.log('Registered successfully', newUser);
        toast.success('Registration successful'); // Display toast notification
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Error occurred during registration'); // Display toast notification
        // Handle registration error, show error message, etc.
      });
  };
  const containsUppercase = (str) => /[A-Z]/.test(str);
const containsLowercase = (str) => /[a-z]/.test(str);
const containsDigit = (str) => /\d/.test(str);
  
   return (
    <body>
      <div className="signin">
        <div className="back-img">
          <div className="sign-in-text">
            <h2 className={isSignIn ? 'active' : 'nonactive'} onClick={toggleSignIn}>
              Sign In
            </h2>
            <h2 className={isSignIn ? 'nonactive' : 'active'} onClick={toggleSignUp}>
              Sign Up
            </h2>
          </div>
          {/* /.sign-in-text */}
          <div className="layer"></div>
          {/* /.layer */}
          <p className="point">&#9650;</p>
        </div>
        {/* /.back-img */}
        <div className="form-section">
          {isSignIn ? (
            <form onSubmit={handleLogin}>
              {/* Sign In form */}
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id="admin_Name"
                  value={admin_Name}
                  onChange={(e) => setAgent_Name(e.target.value)}
                  required 
                />
                <label className="mdl-textfield__label" htmlFor="admin_Name">
                  Username
                </label>
              </div>
              <br />
              <br />
              {/* Password */}
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                  className="mdl-textfield__input"
                  type="password"
                  id="admin_Password"
                  value={admin_Password}
                  onChange={(e) => setadmin_Password(e.target.value)}
                  required 
                />
                <label className="mdl-textfield__label" htmlFor="admin_Password">
                  Password
                </label>
              </div>
              <br />
              <ui>
              <NavDropdown title="Login" id="register-dropdown">
              <NavDropdown.Item as={NavLink} to="/" activeClassName="active">
                Admin
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/agentlogin" activeClassName="active">
                Agent
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/userlogin" activeClassName="active">
                User
              </NavDropdown.Item>
              
            </NavDropdown>
            </ui>
            <br/>
              {/* CheckBox */}
              <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-1">
                <input type="checkbox" id="checkbox-1" className="mdl-checkbox__input" defaultChecked />
              </label>
              <div className="group">
                <input
                  type="submit"
                  className="sign-in-btn mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--colored"
                  value="Sign In"
                />
              </div>  
             
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              {/* Sign Up form */}
              <div className="form-columns">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id="admin_Name"
                  value={admin_Name}
                  onChange={(e) => setAgent_Name(e.target.value)}
                  required 
                />
                <label className="mdl-textfield__label" htmlFor="admin_Name">
                  Username
                </label>
              </div>
              <br />
              <br />
              {/* Password */}
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                  className="mdl-textfield__input"
                  type="password"
                  id="admin_Password"
                  value={admin_Password}
                  onChange={(e) => setadmin_Password(e.target.value)}
                  required 
                />
                <label className="mdl-textfield__label" htmlFor="admin_Password">
                  Password
                </label>
              </div>
              <br />
              <br/>
              {/* New Confirm Password field */}
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input
                className="mdl-textfield__input"
                type="password"
                id="confirm_Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
              <label className="mdl-textfield__label" htmlFor="confirm_Password">
                Confirm Password
              </label>
            </div>
            <br />
            <br />
             {/* User registration fields */}
             <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input
                className="mdl-textfield__input"
                type="email"
                id="user_Email"
                value={user_Email}
                onChange={(e) => setUser_Email(e.target.value)}
                required 
              />
              <label className="mdl-textfield__label" htmlFor="user_Email">
                Email
              </label>
            </div>
            </div>
            <br />
            <br />
            <div className="form-column">
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input
                className="mdl-textfield__input"
                type="tel"
                id="user_Phone"
                value={user_Phone}
                onChange={(e) => setUser_Phone(e.target.value)}
                required pattern="[0-9]{10}"
              />
              <label className="mdl-textfield__label" htmlFor="user_Phone">
                Phone
              </label>
            </div>
            <br />
            <br />
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
  <select
    className="mdl-textfield__input"
    id="user_Gender"
    value={user_Gender}
    onChange={(e) => setUser_Gender(e.target.value)}
    
  >
    <option value="" disabled selected>
      Select Gender
    </option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
  <label className="mdl-textfield__label" htmlFor="user_Gender">
    Gender
  </label>
</div>

            <br />
            <br />
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input
                className="mdl-textfield__input"
                type="text"
                id="user_Location"
                value={user_Location}
                onChange={(e) => setUser_Location(e.target.value)}
                required 
              />
              <label className="mdl-textfield__label" htmlFor="user_Location">
                Location
              </label>
            </div>
            </div>
            <br />
            <br />
            <div className="group">
              <input
                type="submit"
                className="sign-in-btn mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--colored"
                value="Sign Up"
              />
            </div>
          </form>
        )}
      </div>
        {/* /.form-section */}
      </div>
      {/* /.signin */}
      <ToastContainer />
      <style>
        {`
        
          body {
            margin: 0;
            padding: 20px;
            font-family: 'Roboto', sans-serif;
            background-color: #f5f5f5;
            background: url('https://www.worldatlas.com/r/w1200/upload/c7/28/32/untitled-design-207.jpg') ;
            background-size: cover;
          
          }
          
          .signin {
            position: relative;
            height: 1000px;
            width: 500px;
            margin: auto;
            box-shadow: 0px 30px 125px -5px #000;
            background-color: white;
          }
          
          .back-img {
            position: relative;
            width: 100%;
            height: 250px;
            background: url('https://www.omnihotels.com/-/media/images/hotels/nycber/destinations/nyc-aerial-skyline.jpg?h=660&la=en&w=1170') no-repeat center center;
            background-size: cover;
          }
          
          .layer {
            background-color: rgba(33, 150, 243, 0.5);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          
          .active {
            padding-left: 25px;
            color: #fff;
          }
          
          .nonactive {
            color: rgba(255, 255, 255, 0.6);
          }
          
          .sign-in-text {
            top: 175px;
            position: absolute;
            z-index: 1;
          }
          
          h2 {
            padding-left: 15px;
            font-size: 25px;
            text-transform: uppercase;
            display: inline-block;
            font-weight: 300;
          }
          
          .point {
            position: absolute;
            z-index: 1;
            color: #fff;
            top: 235px;
            padding-left: 50px;
            font-size: 20px;
          }
          
          .form-section {
            padding: 70px 90px;
          }
          
          .mdl-textfield {
            position: relative;
            width: 100%;
          }
          
          .mdl-textfield__input {
            border: none;
            border-bottom: 1px solid #bdbdbd;
            font-size: 16px;
            padding: 5px 0;
            background-color: transparent;
            color: #333;
            box-sizing: border-box;
            width: 100%;
          }
          
          .mdl-textfield__input:focus {
            outline: none;
            border-bottom-color: #3f4ebf;
          }
          
          .mdl-textfield__label {
            color: #333;
            font-size: 16px;
            font-weight: normal;
            pointer-events: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 5px 0;
            transition: 0.2s ease all;
            box-sizing: border-box;
          }
          
          .mdl-textfield__input:valid + .mdl-textfield__label,
          .mdl-textfield__input:focus + .mdl-textfield__label {
            color: #3f4ebf;
            font-size: 12px;
            transform: translateY(-20px);
            font-weight: bold;
          }
          
          .forgot-text {
            font-size: 12px;
            color: #bdbdbd;
            text-align: right;
          }
          
          
          .sign-in-btn {
            width: 100%;
            height: 50px;
            border-radius: 5px;
            background-color: rgba(63, 78, 191, 1);
            color: #fff;
            font-size: 20px;
            text-transform: uppercase;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s;
          }
          
          .sign-in-btn:hover {
            background-color: rgba(63, 78, 191, 0.8);
          }
          
          .sign-up-btn {
            width: 100%;
            height: 50px;
            border-radius: 5px;
            background-color: rgba(33, 150, 243, 1);
            color: #fff;
            font-size: 20px;
            text-transform: uppercase;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s;
          }
          
          .sign-up-btn:hover {
            background-color: rgba(33, 150, 243, 0.8);
          }
          
          .mdl-checkbox {
            position: relative;
            margin-bottom: 20px;
          }
          
          .mdl-checkbox__input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
          }
          
          .mdl-checkbox__label {
            position: relative;
            padding-left: 30px;
            cursor: pointer;
          }
          
          .mdl-checkbox__checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 20px;
            width: 20px;
            background-color: #f1f1f1;
            border: 1px solid #bdbdbd;
          }
          
          .mdl-checkbox__checkmark:after {
            content: "";
            position: absolute;
            display: none;
          }
          
          .mdl-checkbox__input:checked ~ .mdl-checkbox__checkmark:after {
            display: block;
          }
          
          .mdl-checkbox__input:checked ~ .mdl-checkbox__checkmark {
            background-color: #3f4ebf;
            border: 1px solid #3f4ebf;
          }
        
          .mdl-checkbox__checkmark:after {
            left: 7px;
            top: 2px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }
          
        `}
      </style>
    </body>
  );
}

