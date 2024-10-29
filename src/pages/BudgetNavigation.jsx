import { Link } from "react-router-dom";

export default function BudgetNavigation() {
  return (
    <>
      <h1>Budgetnavigation</h1>

      <div className="budgetnav_txt">
        <p>Her kan du se de forskellige stadier af budgettet:</p>
      </div>

      <Link to="/makebudget" className="btn">
        Opret budget
      </Link>
    </>
  );
}
