import "../css/App.css";
import "../css/Julie.css";
import { Link, useLocation } from "react-router-dom";

export default function Menu() {
    const location = useLocation();
  
    return (
      <>
        <div className="menu_div">
          <a href="/" className="menu_knap" style={{ textDecoration: 'none' }}>
            <div className="icon_text">
              <img 
                src={location.pathname === "/" ? "/img/icon_home_blue.png" : "/img/icon_home.png"} 
                alt="Forside" 
              />
              <p style={{ textDecoration: 'none' }}>Forside</p>
            </div>
          </a>
          <a href="/budget" className="menu_knap" style={{ textDecoration: 'none' }}>
            <div className="icon_text">
              <img 
                src={location.pathname === "/budget" ? "/img/icon_budget_blue.png" : "/img/icon_budget.png"} 
                alt="Budget" 
              />
              <p style={{ textDecoration: 'none' }}>Budget</p>
            </div>
          </a>
  
          <div className="midter_div"></div>
  
          <a href="/addExpenses" style={{ textDecoration: 'none' }}>
            <div className="plus_knap">+</div>
          </a>
  
          <a href="/Savings" className="menu_knap" style={{ textDecoration: 'none' }}>
            <div className="icon_text">
              <img 
                src={location.pathname === "/Savings" ? "/img/icon_savings_blue.png" : "/img/icon_savings.png"} 
                alt="Opsparing" 
              />
              <p style={{ textDecoration: 'none' }}>Opsparing</p>
            </div>
          </a>
          
          <a href="/profile" className="menu_knap" style={{ textDecoration: 'none' }}>
            <div className="icon_text">
              <img 
                src={location.pathname === "/profile" ? "/img/icon_profile_blue.png" : "/img/icon_profile.png"} 
                alt="Profil" 
              />
              <p style={{ textDecoration: 'none' }}>Profil</p>
            </div>
          </a>
        </div>
      </>
    );
  }