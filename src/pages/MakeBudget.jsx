import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Sarah.css";
import '../css/Julie.css';

export default function MakeBudget() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [availableBudget, setAvailableBudget] = useState(null);

  const calculateBudget = () => {
    const incomeValue = parseFloat(income);
    const expensesValue = parseFloat(expenses);
    if (!isNaN(incomeValue) && !isNaN(expensesValue)) {
      setAvailableBudget(incomeValue - expensesValue);
    } else {
      alert("Please enter valid numbers.");
    }
  };

  return (
    <div className="makebudget_main">
      <h1>Lav budget</h1>
      <div className="input-container">
        <div className="hjælpe_div"> 
          <p className="mb_p">Indtast indkomst</p>
        </div>
        <div className="input-group_j">
          <input className="input_j"
            type="number"
            placeholder="DKK/MD"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="input-container">
        <div className="hjælpe_div"> 
          <p className="mb_p">Indtast faste udgifter</p>
        </div>
        <div className="input-group_j">
          <input className="input_j"
            type="number"
            placeholder="DKK/MD"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            required
          />
        </div>
      </div>
      <button onClick={calculateBudget} className="btn">
        Beregn budget
      </button>

      {availableBudget !== null && (
        <div className="budget_display">
          <p>{availableBudget},- til rådighed</p>
        </div>
      )}

      <p>Opret budgetkategorier</p>
      <Link to="/addcategory">
        <img
          src="../public/img/plus.png"
          alt="Tilføj kategori"
          className="fp_addcategory"
        />
      </Link>
    </div>
  );
}
