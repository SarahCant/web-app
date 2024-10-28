/* import "../css/Sarah.css";
import { useState, useEffect, useCallback } from "react";
import Circle from "../components/Circle";
import Category from "../components/Category";
import QuickAddGallery from "../components/QuickAddGallery";
import { database } from "/firebaseConfig";
import { ref, onValue, update } from "firebase/database";

export default function FrontPage() {
  const [categories, setCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
        calculateRemainingBudget(categoryArray);
      }
    });
  }, []);

  useEffect(() => {
    fetchCategories();

    const arrowTimer = setTimeout(() => {
      setShowArrow(true);
    }, 7000);

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
  }, [fetchCategories]);

  const calculateRemainingBudget = (categories) => {
    const totalRemaining = categories.reduce(
      (acc, category) =>
        acc + parseFloat(category.remaining || category.budget),
      0
    );
    setRemainingBudget(totalRemaining.toFixed(2));
  };

  const handleCategoryUpdate = useCallback(
    (categoryId, newRemaining) => {
      console.log(
        `Updating category ${categoryId} with new remaining: ${newRemaining}`
      );
      const categoryRef = ref(database, `category/${categoryId}`);
      update(categoryRef, { remaining: newRemaining })
        .then(() => {
          console.log(
            `Successfully updated category ${categoryId} in Firebase`
          );
          fetchCategories(); // refetch categories to update the UI
        })
        .catch((error) => {
          console.error("Error updating category in Firebase:", error);
        });
    },
    [fetchCategories]
  );

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
        {categories.length > 0 && <Circle categories={categories} />}
        <section className="fp_circletxt">
          <h2 className={isScrolled ? "fade-out" : "fade-in"}>
            {remainingBudget} DKK
          </h2>
          <p className={`fp_circlep ${isScrolled ? "fade-out" : "fade-in"}`}>
            TILBAGE I {getCurrentMonth()}
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
        <QuickAddGallery onCategoryUpdate={handleCategoryUpdate} />

        <p>Budgetkategorier</p>

        <Category
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
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

// FrontPage.js
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
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/updatecategory/${categoryId}`);
  };

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
        calculateRemainingBudget(categoryArray);
      }
    });
  }, []);

  useEffect(() => {
    fetchCategories();

    const arrowTimer = setTimeout(() => {
      setShowArrow(true);
    }, 7000);

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
  }, [fetchCategories]);

  const calculateRemainingBudget = (categories) => {
    const totalRemaining = categories.reduce(
      (acc, category) =>
        acc + parseFloat(category.remaining || category.budget),
      0
    );
    setRemainingBudget(totalRemaining.toFixed(2));
  };

  const handleCategoryUpdate = useCallback(
    (categoryId, newRemaining) => {
      console.log(
        `Updating category ${categoryId} with new remaining: ${newRemaining}`
      );
      const categoryRef = ref(database, `category/${categoryId}`);
      update(categoryRef, { remaining: newRemaining })
        .then(() => {
          console.log(
            `Successfully updated category ${categoryId} in Firebase`
          );
          fetchCategories();
        })
        .catch((error) => {
          console.error("Error updating category in Firebase:", error);
        });
    },
    [fetchCategories]
  );

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
        {categories.length > 0 && <Circle categories={categories} />}
        <section className="fp_circletxt">
          <h2 className={isScrolled ? "fade-out" : "fade-in"}>
            {remainingBudget} DKK
          </h2>
          <p className={`fp_circlep ${isScrolled ? "fade-out" : "fade-in"}`}>
            TILBAGE I {getCurrentMonth()}
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
        <QuickAddGallery onCategoryUpdate={handleCategoryUpdate} />

        <p>Budgetkategorier</p>

        <Category
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onClickCategory={handleCategoryClick}
        />
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
