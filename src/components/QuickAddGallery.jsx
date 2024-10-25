import { useEffect, useState, useCallback } from "react";
import { database } from "/firebaseConfig";
import { ref, onValue, get } from "firebase/database";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import "../css/Sarah.css";

export default function QuickAddGallery({ onCategoryUpdate }) {
  const [quickAdds, setQuickAdds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const quickAddRef = ref(database, "quickadds");
    const unsubscribeQuickAdds = onValue(quickAddRef, (snapshot) => {
      const data = snapshot.val();
      const quickAddArray = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setQuickAdds(quickAddArray);
    });

    return () => {
      unsubscribeQuickAdds();
    };
  }, []);

  const handleQuickAddClick = useCallback(
    async (quickAdd) => {
      const categoryId = quickAdd.category;
      const cost = parseFloat(quickAdd.cost);

      const categoryRef = ref(database, `category/${categoryId}`);

      try {
        const snapshot = await get(categoryRef);
        const categoryData = snapshot.val();

        if (categoryData) {
          console.log("Current category data:", categoryData);
          const currentRemaining = parseFloat(categoryData.remaining);
          const updatedRemaining = (currentRemaining - cost).toFixed(2);

          console.log(
            `Updating category ${categoryId}. Current remaining: ${currentRemaining}, New remaining: ${updatedRemaining}`
          );

          onCategoryUpdate(categoryId, updatedRemaining);
        } else {
          console.error(`No category data found for ID: ${categoryId}`);
        }
      } catch (error) {
        console.error("Error updating category:", error);
      }
    },
    [onCategoryUpdate]
  );

  const handlers = useSwipeable({
    onSwipedLeft: () => scrollGallery("left"),
    onSwipedRight: () => scrollGallery("right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const scrollGallery = (direction) => {
    const gallery = document.querySelector(".quickadd_gallery");
    const scrollAmount = gallery.offsetWidth;
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
              onClick={() => handleQuickAddClick(quickAdd)}
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
