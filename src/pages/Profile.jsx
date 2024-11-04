//LEJLA//
import { useState, useEffect } from "react";
import "../css/Lejla.css";
import "../css/App.css";
import AlertBox from "../components/AlertBox";

// Quotes list
const quotes = [
  "Sæt små opsparingsmål hver måned – selv en lille buffer kan redde dig i uventede situationer.",
  "Hold styr på dine abonnementer. Selv de små udgifter løber op over tid.",
  "Lær at skelne mellem 'behov' og 'ønsker' – det hjælper dig med at prioritere dit forbrug bedre.",
  "Undgå små lån og afbetalingsordninger – renterne kan gøre købet dyrere, end du tror.",
  "Lav en madplan og køb ind én gang om ugen – det mindsker både madspild og impulskøb.",
];

export default function Profile() {
  // ---------------- State Initialization ----------------
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(
    () => localStorage.getItem("name") || "Emma"
  );
  const [email, setEmail] = useState(
    () => localStorage.getItem("email") || "emmabamse@hotmail.com"
  );
  const [profileImage, setProfileImage] = useState(() => {
    return (
      localStorage.getItem("profileImage") || "public/img/profilbillede.jpg"
    );
  });
  const [dailyQuote, setDailyQuote] = useState("");
  const [showInfoAlert, setShowInfoAlert] = useState(false);

  // ---------------- Quote Handling ----------------
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setDailyQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote();

    // Switch quete
    const quoteInterval = setInterval(getRandomQuote, 5 * 60 * 60 * 1000);

    return () => clearInterval(quoteInterval);
  }, []);

  // ---------------- LocalStorage Handling ----------------
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("profileImage", profileImage); //localStorage
  }, [name, email, profileImage]);

  // ---------------- Edit Mode Handling ----------------
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // ---------------- Image Change Handling ----------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // Update profile image
    }
  };

  // ---------------- Alert Handling ----------------
  function handleAlert() {
    setShowInfoAlert(true);
  }

  function closeAlert() {
    setShowInfoAlert(false);
  }

  // ---------------- Render Component ----------------
  return (
    <>
      <h1 className="profile-title">Min profil</h1>

      {/* Top right icons */}
      <div className="top-icons">
        <img
          onClick={handleAlert}
          src="public/img/addbuddy.png"
          alt="Friends"
        />
        <img
          onClick={handleAlert}
          src="public/img/settings.png"
          alt="Settings"
        />
      </div>

      <div className="profile-container">
        {/* Profile image with edit icon */}
        <div className="profile-image-container">
          <img
            className="profile-image"
            src={profileImage} //current profile image
            alt="Profile"
          />

          {/* Show "Rediger" editmode */}
          {isEditing && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="file-input"
                style={{ display: "none" }}
              />
              <label htmlFor="file-input" className="edit-label">
                Rediger
              </label>
            </>
          )}

          {/* Show pencil NOT in edit mode */}
          {!isEditing && (
            <img
              className="edit-icon"
              src="public/img/pencil.png"
              alt="Edit Profile"
              onClick={handleEditClick}
            />
          )}
        </div>

        {/* ---------------- User Info Fields ---------------- */}
        <div className="info-box">
          <div className="info-title">
            <p>Navn:</p>
          </div>
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

        <div className="info-box">
          <div className="info-title">
            <p>Email:</p>
          </div>
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
            Gem
          </button>
        )}

        {/* ---------------- Daily Tip Box ---------------- */}
        {!isEditing && (
          <>
            <h3 className="daily-tip-title">Dagens Tips</h3>
            <div className="daily-tip-box">
              <p className="daily-tip">{dailyQuote}</p>
            </div>
          </>
        )}
      </div>

      {/* ---------------- Alert Box ---------------- */}
      {showInfoAlert && (
        <AlertBox
          alertMessage="Tak for interessen! - men denne funktion er stadig under udvikling"
          onOk={() => closeAlert()}
        />
      )}
    </>
  );
}
