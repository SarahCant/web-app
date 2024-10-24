/* import "../css/Sarah.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";

export default function AddExpenses() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cost, setCost] = useState("");
  const [isContentVisible, setIsContentVisible] = useState(false); // state for content visibility. used for quickadd field
  const navigate = useNavigate();

  // fetch categories
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

    // update remaining of budget in Firebase
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

    navigate("/"); // navigate to fp
  };

  // toggle quickadd field visibility
  const handleQuickAddClick = () => {
    setIsContentVisible((prev) => !prev); // toggle visibility
    if (isContentVisible) {
      setCost(""); // clear the input field if collapsing before submit
    }
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

      <section className="ae_quickadd">
        <button className="ae_quickadd_btn" onClick={handleQuickAddClick}>
          +Opret som Quickadd
        </button>
        <div
          className={`ae_quickadd_content ${isContentVisible ? "visible" : ""}`}
        >
          <p>Titel</p>
          <div className="input-group">
            <div className="budget-input">
              <input type="text" placeholder="Navn på Quickadd" />
            </div>
          </div>
        </div>
      </section>

      <button type="submit" className="submit-btn" onClick={handleSubmit}>
        Gem
      </button>
    </div>
  );
} */

/* import "../css/Sarah.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";
import { getDatabase, ref, push } from "firebase/database";

export default function AddExpenses() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cost, setCost] = useState("");
  const [quickAddName, setQuickAddName] = useState(""); // state for quickadd name
  const [isContentVisible, setIsContentVisible] = useState(false);
  const navigate = useNavigate();

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
      }));
      setCategories(categoryArray);
    }

    fetchCategories();
    return () => {
      isMounted = false; // cleanup
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cost || !selectedCategory) {
      alert("Hov! Du har vidst ikke udfyldt alle felter");
      return;
    }

    const categoryToUpdate = categories.find(
      (cat) => cat.id === selectedCategory
    );
    const updatedRemaining =
      parseFloat(categoryToUpdate.remaining || categoryToUpdate.budget) -
      parseFloat(cost);

    // Update budget remaining in Firebase
    await fetch(
      `https://web-app-c295f-default-rtdb.firebaseio.com/category/${selectedCategory}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          remaining: updatedRemaining,
        }),
      }
    );

    // Check if the Quickadd input field is visible and filled out
    if (isContentVisible && quickAddName.trim()) {
      const db = getDatabase();
      const quickaddRef = ref(db, "quickadds");
      await push(quickaddRef, {
        name: quickAddName,
        cost,
        category: selectedCategory,
        color: categoryToUpdate.color, // Save the color for displaying in Quickadd
        date: new Date().toISOString(),
      });
    }

    navigate("/"); // Redirect to the front page
  };

  const handleQuickAddClick = () => {
    setIsContentVisible((prev) => !prev);
    if (!isContentVisible) {
      setQuickAddName(""); // Reset quick add name when closing
    }
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

      <section className="ae_quickadd">
        <button className="ae_quickadd_btn" onClick={handleQuickAddClick}>
          +Opret som Quickadd
        </button>
        {isContentVisible && (
          <div className="ae_quickadd_content">
            <p>Titel</p>
            <div className="input-group">
              <div className="budget-input">
                <input
                  type="text"
                  placeholder="Navn på Quickadd"
                  value={quickAddName}
                  onChange={(e) => setQuickAddName(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      <button type="submit" className="submit-btn" onClick={handleSubmit}>
        Gem
      </button>
    </div>
  );
}
 */
/* import "../css/Sarah.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";
import { getDatabase, ref, push } from "firebase/database";

export default function AddExpenses() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cost, setCost] = useState("");
  const [quickAddName, setQuickAddName] = useState(""); // state for quickadd name
  const [isContentVisible, setIsContentVisible] = useState(false); // content visibility
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
      }));
      setCategories(categoryArray);
    }

    fetchCategories();

    return () => {
      isMounted = false; // Cleanup
    };
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cost || !selectedCategory) {
      alert("Hov! Du har vidst ikke udfyldt alle felter");
      return;
    }

    const categoryToUpdate = categories.find(
      (cat) => cat.id === selectedCategory
    );
    const updatedRemaining =
      parseFloat(categoryToUpdate.remaining || categoryToUpdate.budget) -
      parseFloat(cost);

    // Update budget remaining in Firebase
    await fetch(
      `https://web-app-c295f-default-rtdb.firebaseio.com/category/${selectedCategory}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          remaining: updatedRemaining,
        }),
      }
    );

    // Check if Quickadd is visible and filled out
    if (isContentVisible && quickAddName.trim()) {
      const db = getDatabase();
      const quickaddRef = ref(db, "quickadds");
      await push(quickaddRef, {
        name: quickAddName,
        cost,
        category: selectedCategory,
        color: categoryToUpdate.color, // Save color for Quickadd
        date: new Date().toISOString(),
      });
    }

    navigate("/"); // Redirect to the front page
  };

  // Toggle Quickadd content visibility
  const handleQuickAddClick = () => {
    setIsContentVisible((prev) => !prev);
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

      <section className="ae_quickadd">
        <button className="ae_quickadd_btn" onClick={handleQuickAddClick}>
          +Opret som Quickadd
        </button>
        <div
          className={`ae_quickadd_content ${isContentVisible ? "visible" : ""}`}
        >
          <p>Titel</p>
          <div className="input-group">
            <div className="budget-input">
              <input
                type="text"
                placeholder="Navn på Quickadd"
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
    </div>
  );
}
 */

import "../css/Sarah.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";
import { ref, push } from "firebase/database";
import { database } from "/firebaseConfig"; // Import your database instance

export default function AddExpenses() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cost, setCost] = useState("");
  const [quickAddName, setQuickAddName] = useState(""); // state for quickadd name
  const [isContentVisible, setIsContentVisible] = useState(false); // content visibility
  const navigate = useNavigate();

  // fetch categories
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
      }));
      setCategories(categoryArray);
    }

    fetchCategories();

    return () => {
      isMounted = false; // cleanup
    };
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cost || !selectedCategory) {
      alert("Hov! Du har vidst ikke udfyldt alle felter");
      return;
    }

    const categoryToUpdate = categories.find(
      (cat) => cat.id === selectedCategory
    );
    const updatedRemaining =
      parseFloat(categoryToUpdate.remaining || categoryToUpdate.budget) -
      parseFloat(cost);

    // Update budget remaining in Firebase
    await fetch(
      `https://web-app-c295f-default-rtdb.firebaseio.com/category/${selectedCategory}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          remaining: updatedRemaining,
        }),
      }
    );

    // Check if Quickadd is visible and filled out
    if (isContentVisible && quickAddName.trim()) {
      const quickaddRef = ref(database, "quickadds"); // Use imported database
      await push(quickaddRef, {
        name: quickAddName,
        cost,
        category: selectedCategory,
        color: categoryToUpdate.color, // Save color for Quickadd
        date: new Date().toISOString(),
      });
    }

    navigate("/"); // Redirect to the front page
  };

  // Toggle Quickadd content visibility
  const handleQuickAddClick = () => {
    setIsContentVisible((prev) => !prev);
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

      <section className="ae_quickadd">
        <button className="ae_quickadd_btn" onClick={handleQuickAddClick}>
          +Opret som Quickadd
        </button>
        <div
          className={`ae_quickadd_content ${isContentVisible ? "visible" : ""}`}
        >
          <p>Titel</p>
          <div className="input-group">
            <div className="budget-input">
              <input
                type="text"
                placeholder="Navn på Quickadd"
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
    </div>
  );
}
