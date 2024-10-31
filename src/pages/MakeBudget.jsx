import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Julie.css";
import { database } from "/firebaseConfig";
import { ref, set, onValue } from "firebase/database";

export let availableBudget = null;

export default function MakeBudget() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [availableBudgetState, setAvailableBudgetState] = useState(null);
  const [storedBudget, setStoredBudget] = useState(null);

  useEffect(() => {
    // Fetch the available budget from Firebase on component mount
    const budgetRef = ref(database, "budget/availableBudget");
    onValue(budgetRef, (snapshot) => {
      const budgetValue = snapshot.val();
      if (budgetValue !== null) {
        setStoredBudget(budgetValue);
      }
    });
  }, []);

  const calculateBudget = () => {
    const incomeValue = parseFloat(income);
    const expensesValue = parseFloat(expenses);
    if (!isNaN(incomeValue) && !isNaN(expensesValue)) {
      const calculatedBudget = incomeValue - expensesValue;
      setAvailableBudgetState(calculatedBudget);
      availableBudget = calculatedBudget;

      // Save the available budget to Firebase
      const budgetRef = ref(database, "budget/availableBudget");
      set(budgetRef, calculatedBudget)
        .then(() => {
          console.log("Available budget saved to Firebase");
        })
        .catch((error) => {
          console.error("Error saving available budget to Firebase:", error);
        });
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
          <input
            className="input_j"
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
          <input
            className="input_j"
            type="number"
            placeholder="DKK/MD"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            required
          />
        </div>
      </div>
      <button onClick={calculateBudget} className="btn">
        Beregn og gem
      </button>

      {availableBudgetState !== null && (
        <div className="budget_display">
          <p>{availableBudgetState},- til rådighed</p>
        </div>
      )}

      {storedBudget !== null && (
        <div className="stored_budget_display">
          <p>Dit nuværende totale rådighedsbeløb: {storedBudget},-</p>
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
