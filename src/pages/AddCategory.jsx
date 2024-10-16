import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Lejla.css"; // Husk at oprette denne fil til styling
//import Category from "../components/Category";
import { useEffect } from "react";

export default function AddCategory() {
  // State til kategorier
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [budget, setBudget] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  // Liste over farver som i billedet
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!categoryName || !budget || !color) {
      alert("Udfyld venligst alle felter!");
      return;
    }

    let newCategory = {
      name: categoryName,
      budget: budget,
      color: color,
      cid: "", //category id
    };

    const url =
      "https://web-app-c295f-default-rtdb.firebaseio.com/category.json";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newCategory),
    });

    if (response.ok) {
      navigate("/"); // Ret hvor den navigerer til
    } else {
      console.error("Kategori ikke opretter", response.statusText);
    }

    setCategories([...categories, newCategory]);
    setCategoryName("");
    setBudget("");
    setColor("");
  }

  return (
    <div className="category-container">
      <h2>Kategorier</h2>

      <form onSubmit={handleSubmit} className="category-form">
        <div className="input-group">
          <label>Navn på kategori</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Navn på kategori"
          />
        </div>

        <div className="color-picker">
          <label>Vælg farve</label>
          <div className="color-options">
            {colors.map((c, index) => (
              <div
                key={index}
                className={`color-circle ${c === color ? "selected" : ""}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
            <div className="color-circle add-circle">+</div>
          </div>
        </div>

        <div className="input-group">
          <label>Vælg budget</label>
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
      <div className="category-list">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card"
            style={{ backgroundColor: category.color }}
          >
            <p>{category.name}</p>
            <p>{category.budget} DKK</p>
          </div>
        ))}
      </div>
    </div>
  );
}
