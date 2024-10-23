import "../css/App.css";
import "../css/Julie.css";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <>
      <div className="menu_div">
        <a href="/" className="menu_knap">
          <div className="icon_text">
            <img src="/img/icon_home.png" alt="Forside" />
            <p>Forside</p>
          </div>
        </a>
        <a href="/budget" className="menu_knap">
          <div className="icon_text">
            <img src="/img/icon_budget.png" alt="Budget" />
            <p>Budget</p>
          </div>
        </a>

        <a href="/addExpenses">
          <div className="plus_knap">+</div>
        </a>

        <a href="/Savings" className="menu_knap">
          <div className="icon_text">
            <img src="/img/icon_savings.png" alt="Opsparing" />
            <p>Opsparing</p>
          </div>
        </a>
        <a href="/profile" className="menu_knap">
          <div className="icon_text">
            <img src="/img/icon_profile.png" alt="Profil" />
            <p>Profil</p>
          </div>
        </a>
      </div>
    </>
  );
}
