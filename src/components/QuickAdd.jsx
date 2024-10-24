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
import { useEffect, useState } from "react";
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
}
