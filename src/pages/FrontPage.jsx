import { useState } from "react";

const AddCategory = () => {
  // State til kategorier
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [budget, setBudget] = useState("");
  const [color, setColor] = useState("#ffffff"); // standard farve

  // Håndter formindsendelse
  const handleSubmit = (e) => {
    e.preventDefault();
    // Hvis en af felterne er tomme, skal vi ikke tilføje noget
    if (!categoryName || !budget || !color) {
      alert("Udfyld venligst alle felter!");
      return;
    }

    // Opret ny kategori objekt
    const newCategory = {
      name: categoryName,
      budget: budget,
      color: color,
    };

    // Tilføj kategori til listen over kategorier
    setCategories([...categories, newCategory]);

    // Ryd formfelter efter tilføjelse
    setCategoryName("");
    setBudget("");
    setColor("#ffffff");
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

export default AddCategory;
