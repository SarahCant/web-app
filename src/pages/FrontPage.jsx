import "../css/Sarah.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Circle from "../components/Circle";
import Category from "../components/Category";

export default function FrontPage() {
  const [categories, setCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let isMounted = true; // to prevent state updates on unmounted components
    async function fetchCategories() {
      const response = await fetch(
        "https://web-app-c295f-default-rtdb.firebaseio.com/category.json"
      );
      if (!isMounted) return; // update state if component is still mounted
      const data = await response.json();
      const categoryArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setCategories(categoryArray);
    }

    fetchCategories();

    // Event listener to track scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      isMounted = false;
    };
  }, []);

  return (
    <>
      <h1>Min oversigt</h1>
      <div className={`fp_circle_streak ${isScrolled ? "scrolled" : ""}`}>
        {categories.length > 0 && <Circle categories={categories} />}
        <section className="fp_circletxt">
          <h2 className={isScrolled ? "fade-out" : "fade-in"}>TAL</h2>
          <p className={`fp_circlep ${isScrolled ? "fade-out" : "fade-in"}`}>
            TILBAGE DENNE MÅNED
          </p>
        </section>
        <section className={`fp_streak ${isScrolled ? "fade-out" : "fade-in"}`}>
          <p>Du klarer det så godt!</p>
        </section>
      </div>
      <div className={`fp_hidden ${isScrolled ? "scrolled" : ""}`}>
        <p>Quick adds</p>
        <p>Budgetkategorier</p>

        <Category categories={categories} />

        <Link to="/addcategory">
          <img
            src="../public/img/plus.png"
            alt="Tilføj kategori"
            className="fp_addcategory"
          />
        </Link>

        <br />
        <Link to="/budget">
          <button className="btn">Budget-siden</button>
        </Link>
        <Link to="/addcategory">
          <button className="btn">Tilføj kategori</button>
        </Link>
        <Link to="/addexpenses">
          <button className="btn">Tilføj udgift</button>
        </Link>
      </div>
    </>
  );
}
