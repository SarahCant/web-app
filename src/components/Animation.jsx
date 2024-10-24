import "../css/Sofie.css";
import { useEffect } from "react";

export default function Animation() {
  useEffect(() => {
    const logoElement = document.querySelector(".logo_animation");
    // Added class that makes logo visible after mounting
    setTimeout(() => {
      logoElement.classList.add("start_visible");
    }, 200); // Slight delay to ensure visibility change is registered
  }, []);

  return (
    <div className="bg_animation">
      <div className="logo_rel_animation">
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
  );
}
