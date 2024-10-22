/* import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Lejla.css";
import Category from "../components/Category";

export default function AddCategory() {
  // State til kategorier
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [budget, setBudget] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    let newCategory = {
      name: categoryName,
      budget: budget,
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
      const uniqueId = responseData.name; // Firebase retunerer det generede key som name

      newCategory.cid = uniqueId;

      setCategories([...categories, { ...newCategory, id: uniqueId }]);

      navigate("/"); // Ret hvor den navigerer til
    } else {
      console.error("Kategori ikke opretter", response.statusText);
    }
  }

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

  return (
    <div className="AddCategory_container">
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

      <Category categories={categories} />
    </div>
  );
}
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Lejla.css";
import Category from "../components/Category";

export default function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [budget, setBudget] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    let newCategory = {
      name: categoryName,
      budget: parseFloat(budget), // Ensure budget is a number
      expenses: 0, // Initialize expenses to 0
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
      console.error("Kategori ikke opretter", response.statusText);
    }
  }

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

  return (
    <div className="AddCategory_container">
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

      <Category categories={categories} />
    </div>
  );
}
