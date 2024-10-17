import "../css/App.css";
import "../css/Julie.css";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <>
      <div className="menudiv">
        <div className="hjem_knap"> </div>
        <div className="budget_knap"> </div>
        <div className="plus_knap"></div>
        <div className="opsparing_knap"></div>
        <div className="profil_knap"></div>
      </div>
    </>
  );
}
