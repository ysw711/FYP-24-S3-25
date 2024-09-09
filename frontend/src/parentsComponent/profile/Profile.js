import React, { useState, useEffect } from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid'


const Profile = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:5000/users');
      const data = await response.json();
      setUsers(data.reverse()); 
    };

    fetchUsers();
  }, []);

  const addUser = async () => {
    let userName = prompt('Please enter your name');
    if (userName !== null) {
      const response = await fetch('http://localhost:5000/add_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setUsers((prevUsers) => [userName, ...prevUsers]);
      } else {
        alert(data.message);
      }
    }
  };

  return (
    <div className="whoIsWatching">

      <div className="main-div">
        <h1>Who's playing?</h1>
        <div className="memberDiv">
          {users.map((user, index) => (
            <button key={index} className="btn">
              <span>{user}</span>
            </button>
          ))}
          <button className="addIcon" onClick={addUser}>
            <FontAwesomeIcon icon={faPlusCircle} /><span>Add Profile</span>
          </button>
        </div>
        <button className="manageProfile">Manage Profile</button>
      </div>
    </div>
  );
};

export default Profile;
