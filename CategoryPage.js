import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebaseConfig"; // Firebase database instans

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Hent kategorier fra Firebase Realtime Database
    const categoriesRef = ref(database, "categories");
    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedCategories = data ? Object.values(data) : [];
      setCategories(loadedCategories);
    });
  }, []);

  return (
    <div>
      <h3>Liste over kategorier:</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {categories.map((category, index) => (
          <div
            key={index}
            style={{
              backgroundColor: category.color,
              padding: "10px",
              borderRadius: "5px",
              width: "150px",
              textAlign: "center",
              color: "#fff",
            }}
          >
            <p>{category.name}</p>
            <p>{category.budget} DKK</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
