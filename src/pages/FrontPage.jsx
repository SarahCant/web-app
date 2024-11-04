/* SARAH */
import "../css/Sarah.css";
import { useState, useEffect, useCallback } from "react";
import Circle from "../components/Circle";
import Category from "../components/Category";
import QuickAddGallery from "../components/QuickAddGallery";
import { database } from "/firebaseConfig";
import { ref, onValue, update } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function FrontPage() {
  const [categories, setCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [availableBudget, setAvailableBudget] = useState(0);
  const [displayBudget, setDisplayBudget] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(/updatecategory/${categoryId}); //nav to UpdateCategory when category is clicked
  };

  // fetch category data from firebase
  const fetchCategories = useCallback(() => {
    const categoryRef = ref(database, "category");
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const categoryArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCategories(categoryArray);
      }
    });
  }, []);

  //fetch availableBudget data from firebase
  const fetchAvailableBudget = useCallback(() => {
    const budgetRef = ref(database, "budget/availableBudget");
    onValue(budgetRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAvailableBudget(data);
      }
    });
  }, []);

  // initial data fetch + scroll listener and arrow timer
  useEffect(() => {
    fetchCategories();
    fetchAvailableBudget();

    const arrowTimer = setTimeout(() => {
      setShowArrow(true);
    }, 7000);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      if (scrollY > 50) {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(arrowTimer);
    };
  }, [fetchCategories, fetchAvailableBudget]);

  // calc + display remaining
  useEffect(() => {
    calculateDisplayBudget(categories, availableBudget);
  }, [categories, availableBudget]);

  const calculateDisplayBudget = (categories, availableBudget) => {
    const usedBudget = categories.reduce((acc, category) => {
      const budget = parseFloat(category.budget) || 0;
      const remaining = parseFloat(category.remaining) || 0;
      return acc + (budget - remaining);
    }, 0);
    const newDisplayBudget = availableBudget - usedBudget;
    setDisplayBudget(Math.max(newDisplayBudget, 0).toFixed(2));
  };

  //update remaining in firebase
  const handleCategoryUpdate = useCallback(
    (categoryId, newRemaining) => {
      const categoryRef = ref(database, category/${categoryId});
      update(categoryRef, { remaining: newRemaining })
        .then(() => {
          fetchCategories(); // re-fetch categories after update
        })
        .catch((error) => {
          console.error("Error updating category in Firebase:", error);
        });
    },
    [fetchCategories]
  );

  //get current month in Danish
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
        {/* display circle component if categories are loaded */}
        {categories.length > 0 && (
          <Circle categories={categories} availableBudget={availableBudget} />
        )}
        <section className="fp_circletxt">
          <h2 className={isScrolled ? "fade-out" : "fade-in"}>
            {Math.floor(displayBudget)} DKK
          </h2>
          <p className={`fp_circlep ${isScrolled ? "fade-out" : "fade-in"}`}>
            TILBAGE I {getCurrentMonth()}
          </p>
        </section>
        <section className={`fp_streak ${isScrolled ? "fade-out" : "fade-in"}`}>
          <p>Du klarer det så godt!</p>
          <img src="img/streak.png" alt="App streak" />
          <p className="fp_streak_days">3</p>
        </section>
      </div>

      <div className={`fp_hidden ${isScrolled ? "scrolled" : ""}`}>
        <p>Quick adds</p>
        <QuickAddGallery onCategoryUpdate={handleCategoryUpdate} />

        <p>Budgetkategorier</p>

        <Category
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onClickCategory={handleCategoryClick}
        />
      </div>

      <p className="fp_editcattxt">
        Husk, at du kan trykke på en kategori for at redigere den.
      </p>

      {/* arrow guiding scroll */}
      {showArrow && !isScrolled && (
        <img
          src="img/arrow_frontpage.png"
          alt="Scroll arrow"
          className="fp_scrollarrow"
        />
      )}
    </>
  );
}