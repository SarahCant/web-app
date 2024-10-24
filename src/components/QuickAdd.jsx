/* export default function QuickAdd({ categories }) {
  const [quickAddTitle, setQuickAddTitle] = useState("");
  const [cost, setCost] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleQuickAddClick = () => {
    setIsContentVisible((prev) => !prev);
    if (isContentVisible) {
      setCost("");
      setQuickAddTitle(""); // Clear quick add title when collapsing
    }
  };

  const handleQuickAddSubmit = async () => {
    if (!isContentVisible || !quickAddTitle || !cost) {
      alert("Please fill out the QuickAdd title and cost before saving.");
      return;
    }

    // Store quick add in Firebase
    const quickAddData = {
      cost: cost,
      title: quickAddTitle,
      color: categories.find((cat) => cat.id === selectedCategory)?.color,
    };

    await fetch(
      "https://web-app-c295f-default-rtdb.firebaseio.com/quickadds.json",
      {
        method: "POST",
        body: JSON.stringify(quickAddData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert("QuickAdd saved successfully!");
    setQuickAddTitle(""); // Clear quick add title after submission
    setCost(""); // Clear cost after submission
    setIsContentVisible(false); // Hide quick add input
  };

  return (
    <section className="quickadd-section">
      <button className="quickadd-btn" onClick={handleQuickAddClick}>
        + Create QuickAdd
      </button>
      {isContentVisible && (
        <div className="quickadd-content">
          <p>Title</p>
          <input
            type="text"
            placeholder="QuickAdd Name"
            value={quickAddTitle}
            onChange={(e) => setQuickAddTitle(e.target.value)}
          />
          <p>Cost</p>
          <input
            type="number"
            placeholder="Amount"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
          <p>Select Category</p>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button onClick={handleQuickAddSubmit} className="submit-btn">
            Save QuickAdd
          </button>
        </div>
      )}
    </section>
  );
}
 */

/* import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import "../css/Sarah.css";
import { database } from "/firebaseConfig"; // Import the initialized database

export default function Quickadd() {
  const [quickadds, setQuickadds] = useState([]);

  useEffect(() => {
    const quickaddRef = ref(database, "quickadds"); // Use the imported database

    onValue(quickaddRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const quickaddArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setQuickadds(quickaddArray);
      }
    });
  }, []);

  return (
    <div className="quickadd-container">
      {quickadds.map((quickadd) => (
        <div key={quickadd.id} className="quickadd-item">
          <button className="category_btn">
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
} */

import { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import "../css/Sarah.css";
import { database } from "/firebaseConfig";

export default function Quickadd() {
  const [quickadds, setQuickadds] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    // Fetch quick adds
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

    // Fetch categories
    const categoryRef = ref(database, "categories");
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedCategories = Object.keys(data).reduce((acc, key) => {
          acc[key] = {
            ...data[key],
            remaining: parseFloat(data[key].remaining) || 0, // Ensure remaining is a number
          };
          return acc;
        }, {});
        setCategories(formattedCategories);
      } else {
        console.warn("No categories found");
      }
    });
  }, []);

  // Handle the quick add button click
  const handleQuickAdd = (quickadd) => {
    const categoryId = quickadd.category; // Get the category ID from the quickadd
    const cost = parseFloat(quickadd.cost); // Ensure the cost is a number

    // Fetch current category data
    const categoryData = categories[categoryId];

    console.log("Category Data:", categoryData); // Log the category data for debugging

    if (categoryData) {
      console.log("Current remaining value:", categoryData.remaining); // Log current remaining

      // Subtract cost from existing remaining
      const updatedRemaining = (categoryData.remaining - cost).toFixed(2);

      console.log(
        `Category ID: ${categoryId}, Cost: ${cost}, Current Remaining: ${categoryData.remaining}`
      );
      console.log(`Updated Remaining: ${updatedRemaining}`);

      // Update category remaining in Firebase
      const categoryRef = ref(database, `categories/${categoryId}`);
      update(categoryRef, { remaining: parseFloat(updatedRemaining) }) // Ensure you send it as a number
        .then(() => {
          console.log(
            `Successfully updated remaining for category ${categoryId}`
          );
          // Update local state if needed
          setCategories((prevCategories) => ({
            ...prevCategories,
            [categoryId]: {
              ...categoryData,
              remaining: parseFloat(updatedRemaining), // Store as a number
            },
          }));
        })
        .catch((error) => {
          console.error("Error updating category:", error);
        });
    } else {
      console.error(`No category data found for ID: ${categoryId}`);
    }
  };

  return (
    <div className="quickadd-container">
      {quickadds.map((quickadd) => (
        <div key={quickadd.id} className="quickadd-item">
          <button
            className="category_btn"
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
