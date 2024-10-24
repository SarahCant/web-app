/* import { useEffect, useState } from "react";
import { database } from "/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import "../css/Sarah.css";

export default function QuickAddGallery() {
  const [quickAdds, setQuickAdds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const quickAddRef = ref(database, "quickadds");
    onValue(quickAddRef, (snapshot) => {
      const data = snapshot.val();
      const quickAddArray = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setQuickAdds(quickAddArray);
    });
  }, []);

  // swipe handler
  const handlers = useSwipeable({
    onSwipedLeft: () => scrollGallery("left"),
    onSwipedRight: () => scrollGallery("right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const scrollGallery = (direction) => {
    const gallery = document.querySelector(".quickadd_gallery");
    const scrollAmount = gallery.offsetWidth; // scroll by one viewport width
    gallery.scrollBy({
      left: direction === "left" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div {...handlers} className="quickadd_gallery">
      <div className="quickadd_items">
        {quickAdds.length > 0 ? (
          quickAdds.map((quickAdd) => (
            <div
              key={quickAdd.id}
              className="quickadd_item"
              style={{ backgroundColor: quickAdd.color || "#fff" }}
            >
              <p>{quickAdd.name}</p>
              <p>{quickAdd.cost} DKK</p>
            </div>
          ))
        ) : (
          <div className="quickadd_item"></div>
        )}
        <div
          className="quickadd_item"
          style={{ backgroundColor: "var(--btn)" }}
          onClick={() => navigate("/addexpenses")}
        >
          <p className="quickadd_add">
            +Tilføj <br />
            quick add
          </p>
        </div>
      </div>
    </div>
  );
}
 */

import { useEffect, useState } from "react";
import { database } from "/firebaseConfig";
import { ref, onValue, update } from "firebase/database";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import "../css/Sarah.css";

export default function QuickAddGallery() {
  const [quickAdds, setQuickAdds] = useState([]);
  const [categories, setCategories] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const quickAddRef = ref(database, "quickadds");
    onValue(quickAddRef, (snapshot) => {
      const data = snapshot.val();
      const quickAddArray = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setQuickAdds(quickAddArray);
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
      }
    });
  }, []);

  const handleQuickAddClick = async (quickAdd) => {
    const categoryId = quickAdd.category; // Get the category ID from the quickadd
    const cost = parseFloat(quickAdd.cost); // Ensure the cost is a number

    // Fetch current category data
    const categoryData = categories[categoryId];

    if (categoryData) {
      const updatedRemaining = (categoryData.remaining - cost).toFixed(2);

      // Update category remaining in Firebase
      const categoryRef = ref(database, `categories/${categoryId}`);
      await update(categoryRef, { remaining: parseFloat(updatedRemaining) })
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

  // Swipe handler
  const handlers = useSwipeable({
    onSwipedLeft: () => scrollGallery("left"),
    onSwipedRight: () => scrollGallery("right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const scrollGallery = (direction) => {
    const gallery = document.querySelector(".quickadd_gallery");
    const scrollAmount = gallery.offsetWidth; // scroll by one viewport width
    gallery.scrollBy({
      left: direction === "left" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div {...handlers} className="quickadd_gallery">
      <div className="quickadd_items">
        {quickAdds.length > 0 ? (
          quickAdds.map((quickAdd) => (
            <div
              key={quickAdd.id}
              className="quickadd_item"
              style={{ backgroundColor: quickAdd.color || "#fff" }}
              onClick={() => handleQuickAddClick(quickAdd)} // Add click handler
            >
              <p>{quickAdd.name}</p>
              <p>{quickAdd.cost} DKK</p>
            </div>
          ))
        ) : (
          <div className="quickadd_item"></div>
        )}
        <div
          className="quickadd_item"
          style={{ backgroundColor: "var(--btn)" }}
          onClick={() => navigate("/addexpenses")}
        >
          <p className="quickadd_add">
            +Tilføj <br />
            quick add
          </p>
        </div>
      </div>
    </div>
  );
}
