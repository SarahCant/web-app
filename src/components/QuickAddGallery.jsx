/* import { useEffect, useState } from "react";
import { database } from "/firebaseConfig";
import { ref, onValue } from "firebase/database";
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

  return (
    <div className="quickadd-gallery">
      <div className="quickadd-items">
        {quickAdds.length > 0 ? (
          quickAdds.map((quickAdd) => (
            <div
              key={quickAdd.id}
              className="quickadd-item"
              style={{ backgroundColor: quickAdd.color }}
            >
              <h3>{quickAdd.name}</h3>
              <p>Cost: {quickAdd.cost}</p>
              <p>Date: {new Date(quickAdd.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <div className="quickadd-item">
            <h3>No quick adds available</h3>
          </div>
        )}
        <div
          className="quickadd-item"
          style={{ backgroundColor: "var(--btn)" }}
          onClick={() => navigate("/addexpenses")}
        >
          <h3>Tilføj quickadd</h3>
        </div>
      </div>
    </div>
  );
} */

/* import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function QuickaddGallery() {
  const [quickadds, setQuickadds] = useState([]);
  const navigate = useNavigate();

  // firebase setup to fetch quick adds
  useEffect(() => {
    const fetchQuickadds = async () => {
      const db = getFirestore();
      const quickaddSnapshot = await getDocs(collection(db, "quickadds"));
      const quickaddList = quickaddSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuickadds(quickaddList);
    };
    fetchQuickadds();
  }, []);

  // Swipe handler
  const handlers = useSwipeable({
    onSwipedLeft: () => scrollGallery("left"),
    onSwipedRight: () => scrollGallery("right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const scrollGallery = (direction) => {
    const gallery = document.querySelector(".quickadd_gallery");
    const scrollAmount = gallery.offsetWidth; // Scroll by one viewport width (3 quick adds)
    gallery.scrollBy({
      left: direction === "left" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div {...handlers} className="quickadd_gallery">
      {quickadds.length > 0
        ? quickadds.map((item) => (
            <div
              key={item.id}
              className="quickadd_item"
              style={{ backgroundColor: item.color }}
            >
              <h3>{item.name}</h3>
              <p>{item.cost} DKK</p>
              <p>{item.category}</p>
            </div>
          ))
        : null}

      {/* 'Tilføj quickadd' button at the end */
/* <div className="quickadd_item" onClick={() => navigate("/addexpenses")}>
        <h3>Tilføj quickadd</h3>
      </div>
    </div>
  );
} */

/* 
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Ensure these are imported
import { database } from "/firebaseConfig"; // Import your firebase configuration

export default function QuickaddGallery() {
  const [quickadds, setQuickadds] = useState([]);
  const navigate = useNavigate();

  // Firebase setup to fetch quick adds
  useEffect(() => {
    const fetchQuickadds = async () => {
      try {
        const db = getFirestore(database); // Initialize Firestore with your database reference
        const quickaddSnapshot = await getDocs(collection(db, "quickadds"));
        const quickaddList = quickaddSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched quick adds:", quickaddList); // Debugging: log fetched data

        if (quickaddList.length === 0) {
          console.warn("No quick adds found in Firestore."); // Warn if no items found
        }

        setQuickadds(quickaddList);
      } catch (error) {
        console.error("Error fetching quick adds:", error); // Catch and log any errors
      }
    };

    fetchQuickadds();
  }, []);

  // Swipe handler
  const handlers = useSwipeable({
    onSwipedLeft: () => scrollGallery("left"),
    onSwipedRight: () => scrollGallery("right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const scrollGallery = (direction) => {
    const gallery = document.querySelector(".quickadd_gallery");
    const scrollAmount = gallery.offsetWidth; // Scroll by one viewport width (3 quick adds)
    gallery.scrollBy({
      left: direction === "left" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div {...handlers} className="quickadd_gallery">
      {quickadds.length > 0 ? (
        quickadds.map((item) => (
          <div
            key={item.id}
            className="quickadd_item"
            style={{ backgroundColor: item.color || "#fff" }} // Fallback color if not provided
          >
            <h3>{item.name}</h3>
            <p>{item.cost} DKK</p>
            <p>{item.category}</p>
          </div>
        ))
      ) : (
        <p>No quick adds available</p> // Optional message for no quick adds
      )}


      <div className="quickadd_item" onClick={() => navigate("/addexpenses")}>
        <h3>Tilføj quickadd</h3>
      </div>
    </div>
  );
}
 */

import { useEffect, useState } from "react";
import { database } from "/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import "../css/Sarah.css"; // Ensure your styles are correctly imported

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

  // Swipe handler
  const handlers = useSwipeable({
    onSwipedLeft: () => scrollGallery("left"),
    onSwipedRight: () => scrollGallery("right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const scrollGallery = (direction) => {
    const gallery = document.querySelector(".quickadd-gallery");
    const scrollAmount = gallery.offsetWidth; // Scroll by one viewport width
    gallery.scrollBy({
      left: direction === "left" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div {...handlers} className="quickadd-gallery">
      <div className="quickadd-items">
        {quickAdds.length > 0 ? (
          quickAdds.map((quickAdd) => (
            <div
              key={quickAdd.id}
              className="quickadd-item"
              style={{ backgroundColor: quickAdd.color || "#fff" }} // Default color if not provided
            >
              <p>{quickAdd.name}</p>
              <p>{quickAdd.cost} DKK</p>
            </div>
          ))
        ) : (
          <div className="quickadd-item"></div>
        )}
        <div
          className="quickadd-item"
          style={{ backgroundColor: "var(--btn)" }} // Make sure this variable is defined in your CSS
          onClick={() => navigate("/addexpenses")}
        >
          <h3>Tilføj quickadd</h3>
        </div>
      </div>
    </div>
  );
}
