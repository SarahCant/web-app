/* 
LEJLA: INITIAL DRAFT + CSS
SOFIE & SARAH: REORGANISATION + DEVIDE INTO CATEGORY COMPONENT 
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Lejla.css";
import "../css/App.css";
import Category from "../components/Category";
import AlertBox from "../components/AlertBox";
import { availableBudget } from "./MakeBudget";

export default function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [budget, setBudget] = useState("");
  const [color, setColor] = useState("");
  const [showInfoAlert, setShowInfoAlert] = useState(false);
  const [showExtraColors, setShowExtraColors] = useState(false); //ekstra colors
  const [selectedExtraColor, setSelectedExtraColor] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!categoryName || !color || !budget) {
      setShowInfoAlert(true);
      return;
    }

    const newBudget = parseFloat(budget);
    const currentTotalBudget = categories.reduce(
      (sum, category) => sum + parseFloat(category.budget),
      0
    );

    let newCategory = {
      name: categoryName,
      budget: newBudget,
      remaining: newBudget,
      color: color,
    };

    const url =
      "https://web-app-c295f-default-rtdb.firebaseio.com/category.json";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newCategory),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      const uniqueId = responseData.name;

      newCategory.cid = uniqueId;

      setCategories([...categories, { ...newCategory, id: uniqueId }]);

      navigate("/");
    } else {
      console.error("Kategori ikke oprettet", response.statusText);
    }
  }

  function closeAlert() {
    setShowInfoAlert(false);
  }

  const colors = [
    "#F8E392",
    "#F6A58C",
    "#ABA7FF",
    "#B4A270",
    "#B4EDEF",
    "#FF7541",
    "#F8A7D9",
    "#00B9CE",
  ];

  const extraColors = [
    "#FAD6A5",
    "#E1E3E1",
    "#B2EBE0",
    "#FFB6C1",
    "#D5B8F6",
    "#FDE68A",
    "#FFD700",
    "#87CEEB",
    "#FF69B4",
    "#BA55D3",
    "#98FB98",
    "#FFE4E1",
  ];

  useEffect(() => {
    async function getCategory() {
      const url =
        "https://web-app-c295f-default-rtdb.firebaseio.com/category.json";
      const response = await fetch(url);
      const data = await response.json();
      const postArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setCategories(postArray);
    }
    getCategory();
  }, []);

  // extra color function
  function handleColorSelect(c, isExtraColor = false) {
    setColor(c);
    if (isExtraColor) {
      setSelectedExtraColor(c); // pick extra color
      setShowExtraColors(false); // close extra color
    } else {
      setSelectedExtraColor(""); // remove extra color - when normal color picked
    }
  }

  return (
    <>
      <h1>Kategorier</h1>

      <div className="AddCategory_container">
        <form onSubmit={handleSubmit} className="category-form">
          <div className="input-group">
            <p>Navn på kategori</p>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Navn på kategori"
            />
          </div>

          <div className="color-picker">
            <p>Vælg farve</p>
            <div className="color-options">
              {colors.map((c, index) => (
                <div
                  key={index}
                  className={`color-circle ${c === color ? "selected" : ""}`}
                  style={{ backgroundColor: c }}
                  onClick={() => handleColorSelect(c)}
                />
              ))}
              <div
                className="color-circle add-circle"
                style={{ backgroundColor: selectedExtraColor || "#00B9CE" }} // color used
                onClick={() => setShowExtraColors(!showExtraColors)}
              >
                {selectedExtraColor ? "" : "+"} {/* change icon */}
              </div>
            </div>

            {showExtraColors && (
              <div className="extra-color-options">
                {extraColors.map((c, index) => (
                  <div
                    key={index}
                    className={`color-circle ${c === color ? "selected" : ""}`}
                    style={{ backgroundColor: c }}
                    onClick={() => handleColorSelect(c, true)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="input-group-category">
            <p>Vælg budget</p>
            <div className="budget-input">
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="DKK"
              />
              <span>DKK</span>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Opret
          </button>
        </form>

        <h3>Liste over kategorier:</h3>

        <Category categories={categories} />

        {showInfoAlert && (
          <AlertBox
            alertMessage="Hov! Du har vist ikke udfyldt alle felter"
            onOk={() => closeAlert()}
          />
        )}
      </div>
    </>
  );
}
