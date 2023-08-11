import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Get() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7125/api/Users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className="getbody">
       <center><h2>User Details</h2></center>
    <div className="user-card-list">
     
      {users.map(user => (
        <div className="user-card" key={user.user_Id}>
          <h2 className="user-card__name">{user.user_Name}</h2>
          <p className="user-card__property"><b>Email: </b>{user.user_Email}</p>
          <p className="user-card__property"><b>Phone: </b>{user.user_Phone}</p>
          <p className="user-card__property"><b>Gender: </b>{user.user_Gender}</p>
          <p className="user-card__property"><b>Location: </b>{user.user_Location}</p>
         </div>
      ))}
      <style>{`
    /* Add these CSS styles to your component or an external stylesheet */
    .getbody {
      padding: 20px;
    }

    .user-card-list {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    
    .user-card {
      border: 1px solid #ccc;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s, box-shadow 0.3s;
      width: calc(33.33% - 20px);
      padding: 20px;
      margin-bottom: 20px;
      background-color: lightblue;

    }
    
    .user-card:hover {
      transform: translateY(-5px);
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
    }
    
    .user-card__content {
      padding: 10px;
    }
    
    .user-card__name {
      font-size: 18px;
      margin: 0;
      color: #333;
    }
    
    .user-card__property {
      font-size: 14px;
      margin-top: 8px;
      color: #777;
    }
      `}</style>
    </div>
    </div>
  );
}
