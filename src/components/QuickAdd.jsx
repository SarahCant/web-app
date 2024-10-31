/* SARAH */
import { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import "../css/Sarah.css";
import { database } from "/firebaseConfig";

export default function Quickadd() {
  const [quickadds, setQuickadds] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [clickedButtonId, setClickedButtonId] = useState(null);

  useEffect(() => {
    // fetch quick adds
    const quickaddRef = ref(database, "quickadds");
    onValue(quickaddRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const quickaddArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setQuickadds(quickaddArray);
      } else {
        console.warn("No quick adds found");
      }
    });

    // fetch categories
    const categoryRef = ref(database, "categories");
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedCategories = Object.keys(data).reduce((acc, key) => {
          acc[key] = {
            id: key,
            ...data[key],
            remaining: parseFloat(data[key].remaining) || 0,
          };
          return acc;
        }, {});
        setCategories(formattedCategories);
        console.log("Loaded categories:", formattedCategories);
      } else {
        console.warn("No categories found");
      }
      setLoading(false);
    });
  }, []);

  const handleQuickAdd = async (quickadd) => {
    if (loading) return;

    const categoryId = quickadd.category;
    const cost = parseFloat(quickadd.cost);

    const categoryData = categories[categoryId];
    if (categoryData) {
      const updatedRemaining = (categoryData.remaining - cost).toFixed(2);

      const categoryRef = ref(database, `categories/${categoryId}`);
      try {
        await update(categoryRef, { remaining: parseFloat(updatedRemaining) });
        console.log(
          `Successfully updated remaining for category ${categoryId}`
        );

        setCategories((prevCategories) => ({
          ...prevCategories,
          [categoryId]: {
            ...categoryData,
            remaining: parseFloat(updatedRemaining),
          },
        }));

        // add clicked class for animation
        setClickedButtonId(quickadd.id);
        setTimeout(() => setClickedButtonId(null), 500); // remove class after animation duration
      } catch (error) {
        console.error("Error updating category:", error);
      }
    } else {
      console.error(`No category data found for ID: ${categoryId}`);
      console.log("Available categories:", categories);
    }
  };

  return (
    <div className="quickadd-container">
      {quickadds.map((quickadd) => (
        <div key={quickadd.id} className="quickadd-item">
          <button
            className={`category_btn ${
              clickedButtonId === quickadd.id ? "clicked" : ""
            }`}
            onClick={() => handleQuickAdd(quickadd)}
          >
            <div
              className="category_disp"
              style={{ backgroundColor: quickadd.color }}
            >
              <div className="category_txt">
                <p>{quickadd.name}</p>
                <p>{quickadd.cost} kr.</p>
              </div>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}
