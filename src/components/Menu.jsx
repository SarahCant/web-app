/*JULIE */
import "../css/App.css";
import "../css/Julie.css";
import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <>
      <div className="menu_div">
        {/* Home link with conditional icon color based on active path */}
        <NavLink
          to="/"
          className="menu_knap"
          style={{ textDecoration: "none" }}
        >
          <div className="icon_text">
            <img
              src="img/icon_home_blue.png"
              className="active_icon"
              alt="Home"
            />
            <img src="img/icon_home.png" className="icon" alt="Home" />
            <p style={{ textDecoration: "none" }}>Home</p>
          </div>
        </NavLink>

        {/* Budget link with conditional icon color based on active path */}

        <NavLink
          to="/BudgetNavigation"
          className="menu_knap"
          style={{ textDecoration: "none" }}
        >
          <div className="icon_text">
            <img
              src="img/icon_budget_blue.png"
              className="active_icon"
              alt="Budget"
            />
            <img src="img/icon_budget.png" className="icon" alt="Budget" />
            <p style={{ textDecoration: "none" }}>Budget</p>
          </div>
        </NavLink>

        {/* Divider in the middle of the menu */}
        <div className="midter_div"></div>

        {/* Link to add new expenses with a "+" icon */}
        <NavLink to="/addExpenses" style={{ textDecoration: "none" }}>
          <div className="plus_knap">+</div>
        </NavLink>

        {/* Savings link with conditional icon color based on active path */}
        <NavLink
          to="/savings"
          className="menu_knap"
          style={{ textDecoration: "none" }}
        >
          <div className="icon_text">
            <img
              src="img/icon_savings_blue.png"
              className="active_icon"
              alt="Savings"
            />
            <img src="img/icon_savings.png" className="icon" alt="Savings" />
            <p style={{ textDecoration: "none" }}>Savings</p>
          </div>
        </NavLink>

        {/* Profile link with conditional icon color based on active path */}
        <NavLink
          to="/profile"
          className="menu_knap"
          style={{ textDecoration: "none" }}
        >
          <div className="icon_text">
            <img
              src="img/icon_profile_blue.png"
              className="active_icon"
              alt="Profile"
            />
            <img src="img/icon_profile.png" className="icon" alt="Profile" />
            <p style={{ textDecoration: "none" }}>Profile</p>
          </div>
        </NavLink>
      </div>
    </>
  );
}
