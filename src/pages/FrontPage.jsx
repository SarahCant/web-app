import "../css/Sarah.css";
import { useState, useEffect } from "react";
import Circle from "../components/Circle";
import Category from "../components/Category";
import QuickAddGallery from "../components/QuickAddGallery";

export default function FrontPage() {
  const [categories, setCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [remainingBudget, setRemainingBudget] = useState(0); //to store remaining budget

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
        calculateRemainingBudget(categoryArray); // calculate budget after fetching categories
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

  //calculate total remaining budget
  const calculateRemainingBudget = (categories) => {
    const totalRemaining = categories.reduce(
      (acc, category) => acc + (category.remaining || category.budget),
      0
    );
    setRemainingBudget(totalRemaining);
  };

  //get current month
  const getCurrentMonth = () => {
    const months = [
      "JANUAR",
      "FEBRUAR",
      "MARTS",
      "APRIL",
      "MAJ",
      "JUNI",
      "JULI",
      "AUGUST",
      "SEPTEMBER",
      "OKTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    const currentMonthIndex = new Date().getMonth();
    return months[currentMonthIndex];
  };

  return (
    <>
      <h1>Min oversigt</h1>
      <div className={`fp_circle_streak ${isScrolled ? "scrolled" : ""}`}>
        {categories.length > 0 && <Circle categories={categories} />}{" "}
        {/* display remaining budget */}
        <section className="fp_circletxt">
          <h2 className={isScrolled ? "fade-out" : "fade-in"}>
            {remainingBudget} DKK
          </h2>
          <p className={`fp_circlep ${isScrolled ? "fade-out" : "fade-in"}`}>
            TILBAGE I {getCurrentMonth()} {/* display current month */}
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
        <QuickAddGallery />

        <p>Budgetkategorier</p>

        <Category categories={categories} />
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
