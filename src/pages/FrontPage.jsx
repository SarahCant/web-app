/* import "../css/Sarah.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Circle from "../components/Circle";
import Category from "../components/Category";

export default function FrontPage() {
  const [categories, setCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    // Fetch categories function to get the latest data from Firebase
    async function fetchCategories() {
      try {
        const response = await fetch(
          "https://web-app-c295f-default-rtdb.firebaseio.com/category.json"
        );
        const data = await response.json();
        const categoryArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCategories(categoryArray);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories(); // Call the fetch function

    // Scroll arrow shown after 10s
    const arrowTimer = setTimeout(() => {
      setShowArrow(true);
    }, 10000);

    // Event listener to track scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY > 50) {
        setShowArrow(false); // Hide scroll arrow when scrolled
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(arrowTimer); // Clear scroll arrow timer
    };
  }, []); // Empty dependency array to run once on mount

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
          <img src="../public/img/streak.png" alt="App streak" />
          <p className="fp_streak_days">3</p>
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

      {showArrow && !isScrolled && (
        <img
          src="../public/img/arrow_frontpage.png"
          alt="Scroll arrow"
          className="fp_scrollarrow"
        />
      )}
    </>
  );
}
 */

import "../css/Sarah.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Circle from "../components/Circle";
import Category from "../components/Category";

export default function FrontPage() {
  const [categories, setCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "https://web-app-c295f-default-rtdb.firebaseio.com/category.json"
        );
        const data = await response.json();
        const categoryArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCategories(categoryArray);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();

    const arrowTimer = setTimeout(() => {
      setShowArrow(true);
    }, 10000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY > 50) {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(arrowTimer);
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
          <img src="../public/img/streak.png" alt="App streak" />
          <p className="fp_streak_days">3</p>
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

      {showArrow && !isScrolled && (
        <img
          src="../public/img/arrow_frontpage.png"
          alt="Scroll arrow"
          className="fp_scrollarrow"
        />
      )}
    </>
  );
}
