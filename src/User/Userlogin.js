import React , {useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import video1 from './vid-1.mp4';
import video2 from './vid-2.mp4';
import video3 from './vid-3.mp4';
import video4 from './vid-4.mp4';
import video5 from './vid-5.mp4';
import video6 from './vid-6.mp4';
import img from './g-3.jpg'

export default function Userlogin() {
  
  const [activeVideo, setActiveVideo] = useState(video1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleVideoChange = (src) => {
    setActiveVideo(src);
  };
  const handleSearch = (event) => {
    // Add your logic for handling the search functionality here
    // For example, you can set the search query in the component's state
    // or make an API call for search results.
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode((prevDarkMode) => !prevDarkMode);

  };

  const handleMenuToggle = () => {
    // Add your logic for toggling the profile menu here
    // For example, you can use state to track the menu visibility
    // and show/hide the profile menu accordingly.
  };

  return (
    <div>
        <style>
        {`
          
.nav {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav li {
  position: relative;
}

.nav a {
  text-decoration: none;
  color: #333;
  padding: 10px;
  transition: color 0.3s ease;
}

.nav a:hover {
  color: #007bff;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  display: block;
  padding: 12px 16px;
}

.dropdown:hover .dropdown-content {
  display: block;
}

#headerbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  padding: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
}

.icons i {
  font-size: 18px;
  margin-left: 10px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease;
}

.icons i:hover {
  color: #007bff;
}

.search-bar-container {
  position: relative;
}

#search-bar {
  border: none;
  background-color: #f9f9f9;
  padding: 8px;
  border-radius: 5px;
  width: 200px;
  outline: none;
  font-size: 14px;
}

label[for="search-bar"] {
  position: absolute;
  top: 10px;
  right: 15px;
}

.action {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.menu {
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  min-width: 200px;
  border-radius: 5px;
  display: none;
}

.menu.active {
  display: block;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  display: flex;
  align-items: center;
  padding: 10px;
}

.menu li a {
  text-decoration: none;
  color: #333;
  margin-left: 10px;
  transition: color 0.3s ease;
}

.menu li a:hover {
  color: #007bff;
}

#adjust-btn {
  font-size: 20px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .navbar {
    display: none;
  }

  #menu-bar {
    display: block;
    font-size: 20px;
    cursor: pointer;
  }

  .icons {
    display: none;
  }

  #search-bar {
    display: none;
  }

  .profile {
    display: none;
  }
}

.home {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
}

.content {
  text-align: center;
  margin-bottom: 30px;
}

.content h3 {
  font-size: 36px;
  color: #007bff;
  margin-bottom: 10px;
}

.content p {
  font-size: 18px;
  color: #333;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
}

.btn i {
  margin-left: 5px;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.vid-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #bbb;
  cursor: pointer;
}

.vid-btn.active {
  background-color: #007bff;
}

.video-container {
  position: relative;
  width: 100%;
  height: 60vh;
  overflow: hidden;
  border-radius: 10px;
}

#video-slider {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.box-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

#packages_img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.box .content {
  padding: 20px;
  background-color: #fff;
}

.box h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.box p {
  font-size: 14px;
  color: #555;
  margin-bottom: 15px;
}

.box .stars {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.box .stars i {
  color: #ffcc00;
  margin: 0 2px;
}

.box .price {
  font-size: 1.2rem;
  font-weight: 600;
}

.box .price span {
  font-size: 14px;
  color: #777;
  text-decoration: line-through;
  margin-left: 5px;
}

.box .btn {
  display: inline-block;
  padding: 8px 15px;
  margin-top: 15px;
  background-color: #ff0066;
  color: #fff;
  text-decoration: none;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.box .btn:hover {
  background-color: #e6005c;
}
.footer {
  background-color: #1b1b1b;
  color: #fff;
  padding: 50px 0;
}

.box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 30px;
  margin-bottom: 40px;
}

.box {
  width: 200px;
  text-align: center;
}

.box h3 {
  margin-bottom: 20px;
  font-size: 20px;
}

.box p {
  font-size: 14px;
}

.box a {
  color: #fff;
  text-decoration: none;
  display: block;
  margin-bottom: 8px;
}

.credit {
  text-align: center;
  font-size: 14px;
  margin-top: 40px;
}

.credit a {
  color: #fff;
  text-decoration: none;
}

.credit span {
  font-weight: bold;
}

.footer a i {
  margin-right: 8px;
}

@media screen and (max-width: 768px) {
  .box-container {
    flex-direction: column;
    align-items: center;
  }

  .box {
    width: 100%;
    margin-bottom: 30px;
  }
}
.gallery {
  padding: 80px 0;
  background-color: #f9f9f9;
  text-align: center;
}

.gallery .heading {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 40px;
}

.gallery .box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.gallery .box {
  margin: 20px;
  max-width: 300px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.gallery .box:hover {
  transform: translateY(-10px);
}

.gallery .box img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.gallery .box .content {
  padding: 20px;
}

.gallery .box h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.gallery .box p {
  font-size: 14px;
  color: #666;
}

.gallery .box .btn {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
}

.gallery .box .btn:hover {
  background-color: #0056b3;
}

        `}
      </style>
  
    <section className="home" id="home">
      <div className="controls">
        <span
          className={`vid-btn ${activeVideo === video1 ? 'active' : ''}`}
          onClick={() => handleVideoChange(video1)}
          data-src={video1}
        ></span>
        <span
          className={`vid-btn ${activeVideo === video2 ? 'active' : ''}`}
          onClick={() => handleVideoChange(video2)}
          data-src={video2}
        ></span>
        <span
          className={`vid-btn ${activeVideo === video3 ? 'active' : ''}`}
          onClick={() => handleVideoChange(video3)}
          data-src={video3}
        ></span>
        <span
          className={`vid-btn ${activeVideo === video4 ? 'active' : ''}`}
          onClick={() => handleVideoChange(video4)}
          data-src={video4}
        ></span>
        <span
          className={`vid-btn ${activeVideo === video5 ? 'active' : ''}`}
          onClick={() => handleVideoChange(video5)}
          data-src={video5}
        ></span>
        <span
          className={`vid-btn ${activeVideo === video6 ? 'active' : ''}`}
          onClick={() => handleVideoChange(video6)}
          data-src={video6}
        ></span>
      </div>

      <div className="video-container">
        <video src={activeVideo} id="video-slider" loop autoPlay muted></video>
      </div>
    </section>
    
   

    </div>
  );
}
