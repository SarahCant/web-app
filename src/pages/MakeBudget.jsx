import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Sarah.css";

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
      <div className="input-group">
        <input
          type="number"
          placeholder="Indtast indkomst"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          placeholder="Indtast faste udgifter"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          required
        />
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
