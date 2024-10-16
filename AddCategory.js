import { useState } from "react";
import { ref, set } from "firebase/database"; // Import Firebase funktioner
import { database } from "./firebaseConfig"; // Firebase database instans

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [budget, setBudget] = useState("");
  const [color, setColor] = useState("#ffffff");

  // Opret et unikt ID til hver kategori
  const createCategoryId = () => {
    return `category-${Date.now()}`;
  };

  // Håndter formindsendelse
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName || !budget || !color) {
      alert("Udfyld venligst alle felter!");
      return;
    }

    // Opret kategori objekt
    const newCategory = {
      name: categoryName,
      budget: budget,
      color: color,
    };

    // Opret et unikt ID til kategorien og gem i Firebase
    const categoryId = createCategoryId();
    set(ref(database, "categories/" + categoryId), newCategory)
      .then(() => {
        alert("Kategori tilføjet til databasen!");
        setCategoryName("");
        setBudget("");
        setColor("#ffffff");
      })
      .catch((error) => {
        console.error("Fejl ved tilføjelse til database: ", error);
      });
  };

  return (
    <div>
      <h2>Add a new category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Kategori navn:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div>
          <label>Budget:</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <div>
          <label>Vælg farve:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <button type="submit">Tilføj Kategori</button>
      </form>
    </div>
  );
};

export default AddCategory;
