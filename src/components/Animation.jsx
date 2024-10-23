import "../css/Sofie.css";
import { useEffect } from "react";

export default function Animation() {
  useEffect(() => {
    const logoElement = document.querySelector(".logo_animation");

    // Add class to make logo visible after mounting
    setTimeout(() => {
      logoElement.classList.add("start-visible");
    }, 200); // Slight delay to ensure visibility change is registered

    // Additional audio logic can go here
  }, []);

  return (
    <div>
      <h1 className="h1_forside">Forside</h1>
      <div className="bg_animation">
        <div className="logo_rel">
          <img
            className="logo_animation"
            src="../public/img/logo_nofire.png"
            alt="logo"
          />
          <img
            className="streak_animation"
            src="../public/img/streak.png"
            alt=""
          />
        </div>

        <h1 className="h1_animation">ØkonomILD</h1>
      </div>
    </div>
  );
}
