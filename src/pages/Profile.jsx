import React from 'react';
import '../css/Lejla.css'; // Import the CSS file
import '../css/App.css'
export default function Profile() {

    return (
      <div className="profile-container">
        {/* Back button */}
        <div className="back-button">
          <img src="path/to/back-arrow-icon.png" alt="Back" />
        </div>
  
        {/* Top right icons */}
        <div className="top-icons">
          <img src="path/to/friends-icon.png" alt="Friends" />
          <img src="path/to/settings-icon.png" alt="Settings" />
        </div>
  
        {/* Profile title */}
        <h1 className="profile-title">Min profil</h1>
  
        {/* Profile image with edit icon */}
        <div className="profile-image-container">
          <img
            className="profile-image"
            src="public/img/profilbillede.jpg"
            alt="Profile"
          />
          <img
            className="edit-icon"
            src="path/to/edit-icon.png"
            alt="Edit Profile"
          />
        </div>
  
        {/* Name field */}
        <div className="info-box">
          <div className="info-title">Navn:</div>
          <div className="info-detail">Emma</div>
        </div>
  
        {/* Email field */}
        <div className="info-box">
          <div className="info-title">Email:</div>
          <div className="info-detail">emmabamse@hotmail.com</div>
        </div>
  
        {/* Daily tip box */}
        <div className="daily-tip-box">
          <p className="daily-tip">
            "Even lessons learned the hard way, are lessons learned"<br />
            <span>- Sensei Wu</span>
          </p>
        </div>
      </div>
    );
  };
   

