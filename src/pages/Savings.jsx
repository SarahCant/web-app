/*  JULIE  */
/*  CSS Animation SOFIE */

import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import "../css/Julie.css";
import "../css/App.css";
import AlertBox from "../components/AlertBox";

export default function Savings() {
  // State to manage savings amount and goal
  const [savings, setSavings] = useState(() => {
    return Number(localStorage.getItem("savings")) || 500;
  });
  const [goal, setGoal] = useState(() => {
    return Number(localStorage.getItem("goal")) || 1000;
  });
  const [inputValue, setInputValue] = useState(""); // Value from the input field
  const [showInfoAlert, setShowInfoAlert] = useState(false); // Toggle to show alert if input is empty
  const [playAnimation, setPlayAnimation] = useState(false);

  // Update localStorage whenever savings or goal changes
  useEffect(() => {
    localStorage.setItem("savings", savings);
    localStorage.setItem("goal", goal);
  }, [savings, goal]);

  // Function to add money to savings
  const handleAdd = () => {
    if (!inputValue) {
      setShowInfoAlert(true); // Show alert if input is empty
      return;
    }
    if (!isNaN(inputValue) && inputValue !== "") {
      // Update savings, but do not exceed the goal
      setSavings((prevSavings) =>
        Math.min(prevSavings + Number(inputValue), goal)
      );
      setInputValue(""); // Clear input field after adding
      fallingCoins();
    }
  };

  // Function to remove money from savings
  const handleRemove = () => {
    if (!inputValue) {
      setShowInfoAlert(true); // Show alert if input is empty
      return;
    }
    if (!isNaN(inputValue) && inputValue !== "") {
      // Update savings, but do not go below zero
      setSavings((prevSavings) =>
        Math.max(prevSavings - Number(inputValue), 0)
      );
      setInputValue(""); // Clear input field after removing
    }
  };

  // Function to update the savings goal
  const handleSetGoal = () => {
    if (!inputValue) {
      setShowInfoAlert(true); // Show alert if input is empty
      return;
    }
    if (!isNaN(inputValue) && inputValue !== "") {
      setGoal(Number(inputValue)); // Set new goal based on input value
      setInputValue(""); // Clear input field after setting goal
    }
  };

  // Calculate the progress percentage towards the goal
  const progress = (savings / goal) * 100;

  // Function to close the alert
  function closeAlert() {
    setShowInfoAlert(false);
  }

  function fallingCoins() {
    setPlayAnimation(true);
    const coins = document.querySelector(".coins_savings");
    coins.classList.add("show_coins_savings");

    const coins_audio = new Audio("/audio/coins_sound.mp3");
    coins_audio.play();
  }

  return (
    <div className="savings-page">
      <h1 className="savings-heading">Opsparing</h1>

      {/* Display the progress bar */}
      <div className="savings-container">
        <ProgressBar progress={progress} />{" "}
        {/* Component showing the savings progress */}
        <p>
          Godt gået! Du har opsparet {savings} kr ud af {goal} kr.
        </p>
      </div>

      {/* Form to add/remove savings or change the goal */}
      <div className="form-container">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Indtast beløb"
        />
        <p className="p_savings">
          Angiv først beløb og vælg derefter hvad der skal ske med beløbet
        </p>
        {/* Buttons are placed horizontally in a separate container */}
        <div className="button-container">
          <button className="btn" onClick={handleAdd}>
            Indsæt
          </button>
          <button className="btn" onClick={handleRemove}>
            Fjern
          </button>
          <button className="btn" onClick={handleSetGoal}>
            Ret mål
          </button>
        </div>
      </div>

      {/* Display alert box if input is missing */}
      {showInfoAlert && (
        <AlertBox
          alertMessage="Hov! Du har vist ikke udfyldt feltet med en værdi"
          onOk={() => closeAlert()}
        />
      )}
      <img
        className={`coins_savings ${playAnimation ? "show_coins_savings" : ""}`}
        src="/img/savings_coins.png"
        alt=""
        onAnimationEnd={() => setPlayAnimation(false)}
      />
    </div>
  );
}
