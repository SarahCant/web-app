import React, { useState } from 'react';
import '../css/Lejla.css'; // Import the CSS file
import '../css/App.css';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Emma');
  const [email, setEmail] = useState('emmabamse@hotmail.com');
  const [profileImage, setProfileImage] = useState('public/img/profilbillede.jpg');

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
     <h1 className="profile-title" >Min profil</h1>

      {/* Top right icons */}
      <div className="top-icons">
        <img src="public/img/addbuddy.png" alt="Friends" />
        <img src="public/img/settings.png" alt="Settings" />
      </div>

     
      <div className="profile-container">
        {/* Profile image with edit icon */}
        <div className="profile-image-container">
          <img
            className="profile-image"
            src={profileImage}
            alt="Profile"
          />

          {/* Show "Rediger" label if in edit mode */}
          {isEditing && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="file-input"
                style={{ display: 'none' }}
              />
              <label htmlFor="file-input" className="edit-label">Rediger</label>
            </>
          )}
          
          {/* Only show the pencil icon when NOT in edit mode */}
          {!isEditing && (
            <img
              className="edit-icon"
              src="public/img/pencil.png"
              alt="Edit Profile"
              onClick={handleEditClick}
            />
          )}
        </div>

        {/* Name field */}
        <div className="info-box">
          <div className="info-title">Navn:</div>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="info-detail edit-mode"
            />
          ) : (
            <div className="info-detail">{name}</div>
          )}
        </div>

        {/* Email field */}
        <div className="info-box">
          <div className="info-title">Email:</div>
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="info-detail edit-mode"
            />
          ) : (
            <div className="info-detail">{email}</div>
          )}
        </div>

        {/* Save button in edit mode */}
        {isEditing && (
          <button className="submit-btn" onClick={() => setIsEditing(false)}>
            Save
          </button>
        )}

        {/* Daily tip box, shown only when not in edit mode */}
        {!isEditing && (
          <div className="daily-tip-box">
            <p className="daily-tip">
              "Even lessons learned the hard way, are lessons learned"<br />
            </p>
            <br />
            <p>
              <span>- Sensei Wu</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

