import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import "../css/Julie.css";
import "../css/App.css";

export default function Savings() {
  // State til at håndtere opsparing og mål
  const [savings, setSavings] = useState(500); // Startbeløb for opsparing
  const [goal, setGoal] = useState(1000); // Startmål for opsparing
  const [inputValue, setInputValue] = useState(""); // Værdi fra inputfeltet

  // Funktion til at tilføje penge til opsparingen
  const handleAdd = () => {
    if (!isNaN(inputValue) && inputValue !== "") {
      setSavings((prevSavings) =>
        Math.min(prevSavings + Number(inputValue), goal)
      );
      setInputValue(""); // Ryd inputfeltet efter handling
    }
  };

  // Funktion til at fjerne penge fra opsparingen
  const handleRemove = () => {
    if (!isNaN(inputValue) && inputValue !== "") {
      setSavings((prevSavings) =>
        Math.max(prevSavings - Number(inputValue), 0)
      );
      setInputValue(""); // Ryd inputfeltet efter handling
    }
  };

  // Funktion til at opdatere opsparingsmålet
  const handleSetGoal = () => {
    if (!isNaN(inputValue) && inputValue !== "") {
      setGoal(Number(inputValue));
      setInputValue(""); // Ryd inputfeltet efter handling
    }
  };

  // Beregn hvor meget af målet der er opsparet (i procent)
  const progress = (savings / goal) * 100;

  return (
    <div className="savings-page">
      {/* Overskrift flyttes til venstre */}
      <h1 className="savings-heading">Opsparing</h1>

      {/* Progress visualisering */}
      <div className="savings-container">
        <ProgressBar progress={progress} />{" "}
        {/* Komponent der viser fremskridtet */}
        <p>
          Godt gået! Du har opsparet {savings} kr ud af {goal} kr.
        </p>
      </div>

      {/* Formular til at tilføje/fjerne opsparing eller ændre målet */}
      <div className="form-container">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Indtast beløb"
        />

        {/* Knapperne placeres horisontalt i en separat container */}
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
    </div>
  );
}
