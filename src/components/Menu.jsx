/*JULIE */
import "../css/App.css";
import "../css/Julie.css";
import { useLocation } from "react-router-dom";

export default function Menu() {
  // Retrieve the current path location
  const location = useLocation();

  return (
    <>
      <div className="menu_div">
        {/* Home link with conditional icon color based on active path */}
        <a href="/" className="menu_knap" style={{ textDecoration: "none" }}>
          <div className="icon_text">
            <img
              src={
                location.pathname === "/"
                  ? "img/icon_home_blue.png"
                  : "img/icon_home.png"
              }
              alt="Home"
            />
            <p style={{ textDecoration: "none" }}>Home</p>
          </div>
        </a>

        {/* Budget link with conditional icon color based on active path */}
        <a
          href="/BudgetNavigation"
          className="menu_knap"
          style={{ textDecoration: "none" }}
        >
          <div className="icon_text">
            <img
              src={
                location.pathname === "/BudgetNavigation"
                  ? "/img/icon_budget_blue.png"
                  : "/img/icon_budget.png"
              }
              alt="Budget"
            />
            <p style={{ textDecoration: "none" }}>Budget</p>
          </div>
        </a>

        {/* Divider in the middle of the menu */}
        <div className="midter_div"></div>

        {/* Link to add new expenses with a "+" icon */}
        <a href="/addExpenses" style={{ textDecoration: "none" }}>
          <div className="plus_knap">+</div>
        </a>

        {/* Savings link with conditional icon color based on active path */}
        <a
          href="/Savings"
          className="menu_knap"
          style={{ textDecoration: "none" }}
        >
          <div className="icon_text">
            <img
              src={
                location.pathname === "/Savings"
                  ? "/img/icon_savings_blue.png"
                  : "/img/icon_savings.png"
              }
              alt="Savings"
            />
            <p style={{ textDecoration: "none" }}>Savings</p>
          </div>
        </a>

        {/* Profile link with conditional icon color based on active path */}
        <a
          href="/profile"
          className="menu_knap"
          style={{ textDecoration: "none" }}
        >
          <div className="icon_text">
            <img
              src={
                location.pathname === "/profile"
                  ? "/img/icon_profile_blue.png"
                  : "/img/icon_profile.png"
              }
              alt="Profile"
            />
            <p style={{ textDecoration: "none" }}>Profile</p>
          </div>
        </a>
      </div>
    </>
  );
}
