import { useState, useEffect } from 'react';
import '../css/Lejla.css'; // Import the CSS file
import '../css/App.css';

export default function Profile() {
  // State initialization with localStorage fallback
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(() => localStorage.getItem('name') || 'Emma');
  const [email, setEmail] = useState(() => localStorage.getItem('email') || 'emmabamse@hotmail.com');
  const [profileImage, setProfileImage] = useState(() => localStorage.getItem('profileImage') || 'public/img/profilbillede.jpg');

  // Effect to save data to localStorage
  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('profileImage', profileImage);
  }, [name, email, profileImage]);

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file); // Check the selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the new image
      console.log('Generated image URL:', imageUrl); // Log the generated URL
      setProfileImage(imageUrl); // Update the profile image
    }
  };

  return (
    <>
      <h1 className="profile-title">Min profil</h1>

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
            src={profileImage} // Use the current profile image
            alt="Profile"
          />

          {/* Show "Rediger" label if in edit mode */}
          {isEditing && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange} // Handle image upload
                id="file-input"
                style={{ display: 'none' }} // Hide file input
              />
              <label htmlFor="file-input" className="edit-label">Rediger</label>
            </>
          )}

          {/* Show pencil icon when NOT in edit mode */}
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
          <div className="info-title"><p>Navn:</p></div>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state
              className="info-detail edit-mode"
            />
          ) : (
            <div className="info-detail">{name}</div>
          )}
        </div>

        {/* Email field */}
        <div className="info-box">
          <div className="info-title"><p>Email</p></div>
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
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








