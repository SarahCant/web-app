import "../css/Sarah.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";

export default function AddExpenses() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cost, setCost] = useState("");
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    let isMounted = true;

    async function fetchCategories() {
      const response = await fetch(
        "https://web-app-c295f-default-rtdb.firebaseio.com/category.json"
      );
      if (!isMounted) return;
      const data = await response.json();
      const categoryArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
        //remaining: data[key].budget - data[key].cost, // remaining = budget - cost
      }));
      setCategories(categoryArray);
    }

    fetchCategories();

    return () => {
      isMounted = false; // cleanup
    };
  }, []);

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cost || !selectedCategory) {
      alert("Hov! Du har vidst ikke udfyldt alle felter");
      return;
    }

    // Update the budget in Firebase
    const categoryToUpdate = categories.find(
      (cat) => cat.id === selectedCategory
    );
    //const updatedRemaining = categoryToUpdate.remaining - parseFloat(cost);
    //const updatedRemaining = categoryToUpdate.remaining - parseFloat(cost);
    const updatedRemaining =
      parseFloat(categoryToUpdate.remaining || categoryToUpdate.budget) -
      parseFloat(cost);
    // Update Firebase with the new remaining value
    await fetch(
      `https://web-app-c295f-default-rtdb.firebaseio.com/category/${selectedCategory}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          //budget: updatedBudget,
          remaining: updatedRemaining,
        }),
      }
    );

    navigate("/"); // navigate to main page
  };

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
        <Category
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      <button className="ae_addquick_btn">+Opret som quickadd</button>

      <button type="submit" className="submit-btn" onClick={handleSubmit}>
        Gem
      </button>
    </div>
  );
}
