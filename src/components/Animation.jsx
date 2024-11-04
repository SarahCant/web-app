/* SOFIE */
import "../css/Sofie.css";
import { useEffect } from "react";

export default function Animation() {
  // makes logo visible after a slight delay to make sure it is shown right
  useEffect(() => {
    const logo = document.querySelector(".logo_animation");

    setTimeout(() => {
      logo.classList.add("start_visible");
    }, 200);
  }, []);

  return (
    <div className="bg_animation">
      <div className="container_animation">
        <div className="logo_rel_animation">
          <img
            className="logo_animation"
            src="img/logo_nofire.png"
            alt="logo"
          />
          <img className="streak_animation" src="img/streak.png" alt="fire" />
        </div>
        <h1 className="h1_animation">ØkonomILD</h1>
      </div>
    </div>
  );
}
