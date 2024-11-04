/* SARAH */
import { NavLink } from "react-router-dom";

export default function BudgetNavigation() {
  return (
    <>
      <h1>Budgetnavigation</h1>

      {/* btns to budget pages */}
      <div className="budgetnav_main">
        <div className="budgetnav_txt">
          <p>Her kan du se de forskellige stadier af budgettet:</p>
        </div>

        <div className="budgetnav_btns">
          <NavLink to="/makebudget" className="btn">
            Opret budget
            <img
              src="img/plus.png"
              alt="Tilføj budget"
              className="budgetnav_btn_img"
            />
          </NavLink>

          <NavLink to="/mybudget" className="btn">
            Budgetoversigt
            <img
              src="img/icon_budget.png"
              alt="Min budgetoversigt"
              className="budgetnav_btn_img"
            />
          </NavLink>
        </div>

        <img
          src="img/logo_fire.png"
          alt="Drage maskot"
          className="budgetnav_dragon"
        />
      </div>
    </>
  );
}
