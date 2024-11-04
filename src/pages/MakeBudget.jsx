/* 
JULIE: CSS
SARAH: JSX 
*/

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Julie.css";
import { database } from "/firebaseConfig";
import { ref, set, onValue } from "firebase/database";

// exported variable to store availableBudget globally so it can be used elsewhere
export let availableBudget = null;

export default function MakeBudget() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [availableBudgetState, setAvailableBudgetState] = useState(null);
  const [storedBudget, setStoredBudget] = useState(null);

  // fetch availableBudget from firebase on component mount
  useEffect(() => {
    const budgetRef = ref(database, "budget/availableBudget");
    // fetch budget from firebase + set in local state
    onValue(budgetRef, (snapshot) => {
      const budgetValue = snapshot.val();
      if (budgetValue !== null) {
        setStoredBudget(budgetValue); // update in firebase
      }
    });
  }, []);

  const calculateBudget = () => {
    const incomeValue = parseFloat(income);
    const expensesValue = parseFloat(expenses);
    // check if both values are valid numbers + calc remaining
    if (!isNaN(incomeValue) && !isNaN(expensesValue)) {
      const calculatedBudget = incomeValue - expensesValue;
      setAvailableBudgetState(calculatedBudget);
      availableBudget = calculatedBudget;

      // save availableBudget to firebase + console.log firebase saving status
      const budgetRef = ref(database, "budget/availableBudget");
      set(budgetRef, calculatedBudget)
        .then(() => {
          console.log("Available budget saved to Firebase");
        })
        .catch((error) => {
          console.error("Error saving available budget to Firebase:", error);
        });
    } else {
      alert("Hov! Det er vidst ikke kun tal");
    }
  };

  return (
    <div className="makebudget_main">
      <h1 className="h1_MB">Lav budget</h1>

      {/* input sections for income + expenses */}
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

      {/* btn to calc + save budget */}
      <button onClick={calculateBudget} className="btn">
        Beregn og gem
      </button>

      {/* display availableBudget if it exists */}
      {availableBudgetState !== null && (
        <div className="budget_display">
          <p>{availableBudgetState},- til rådighed</p>
        </div>
      )}

      {/* display stored budget from firebase if it exists */}
      {storedBudget !== null && (
        <div className="stored_budget_display">
          <p>Dit nuværende totale rådighedsbeløb: {storedBudget},-</p>
        </div>
      )}

      {/* btn: create new budget categories */}
      <p>Opret budgetkategorier</p>
      <Link to="/addcategory">
        <img
          src="../publicimg/plus.png"
          alt="Tilføj kategori"
          className="fp_addcategory"
        />
      </Link>
    </div>
  );
}
