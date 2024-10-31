/* SARAH */
import "../css/Sarah.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";
import { ref, push } from "firebase/database";
import { database } from "/firebaseConfig";
import AlertBox from "../components/AlertBox";

export default function AddExpenses() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cost, setCost] = useState("");
  const [quickAddName, setQuickAddName] = useState("");
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [showInfoAlert, setShowInfoAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    //fetch categories from firebase
    async function fetchCategories() {
      const response = await fetch(
        "https://web-app-c295f-default-rtdb.firebaseio.com/category.json"
      );
      if (!isMounted) return; // prevent setting state if component is unmounted
      const data = await response.json();
      const categoryArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setCategories(categoryArray);
    }

    fetchCategories();

    return () => {
      isMounted = false; // cleanup
    };
  }, []);

  //handle submit of new expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    // alert if required inputs are missing
    if (!cost || !selectedCategory) {
      setShowInfoAlert(true);
      return;
    }

    // update category's remaining
    const categoryToUpdate = categories.find(
      (cat) => cat.id === selectedCategory
    );
    const updatedRemaining =
      parseFloat(categoryToUpdate.remaining || categoryToUpdate.budget) -
      parseFloat(cost);

    await fetch(
      `https://web-app-c295f-default-rtdb.firebaseio.com/category/${selectedCategory}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          remaining: updatedRemaining,
        }),
      }
    );

    // if quickadd is visible + has a name: save in database
    if (isContentVisible && quickAddName.trim()) {
      const quickaddRef = ref(database, "quickadds");
      await push(quickaddRef, {
        name: quickAddName,
        cost: parseFloat(cost),
        category: selectedCategory,
        color: categoryToUpdate.color,
        date: new Date().toISOString(),
      });
    }

    navigate("/"); // home
  };

  // toggle visibility of quickadd fields
  const handleQuickAddClick = () => {
    setIsContentVisible((prev) => !prev);
  };

  // close alert box
  function closeAlert() {
    setShowInfoAlert(false);
  }

  return (
    <div className="ae_main">
      <p>Udgift</p>
      <div className="input-group">
        <div className="budget-input">
          <input
            type="number"
            placeholder="Tilføj beløb"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
      </div>

      <p>Note</p>
      <div className="input-group">
        <div className="budget-input">
          <input type="text" placeholder="Tilføj note" />
        </div>
      </div>

      <p className="ae_txt">Vælg kategori</p>
      <section className="ae_category">
        {/* select category */}
        <Category
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* quickadd section w/ toggable content */}
      <section
        className={`ae_quickadd ${isContentVisible ? "bg_btn" : "bg_light"}`}
      >
        <button
          className={`ae_quickadd_btn ${isContentVisible ? "active" : ""}`}
          onClick={handleQuickAddClick}
        >
          +Opret som quick add
        </button>
        <div
          className={`ae_quickadd_content ${isContentVisible ? "visible" : ""}`}
        >
          <p>Titel</p>
          <div className="input-group">
            <div className="budget-input">
              <input
                type="text"
                placeholder="Navn på quick add"
                value={quickAddName}
                onChange={(e) => setQuickAddName(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <button type="submit" className="submit-btn" onClick={handleSubmit}>
        Gem
      </button>

      {/* alert box */}
      {showInfoAlert && (
        <AlertBox
          alertMessage="Hov! Du skal tilføje et beløb og vælge en kategori for at gemme udgiften"
          onOk={() => closeAlert()}
        />
      )}
    </div>
  );
}
