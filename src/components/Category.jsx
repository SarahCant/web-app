import { useState } from "react";
import "../css/Lejla.css";

export default function Category() {
  const [categories] = useState([]);

  return (
    <div className="category-list">
      {categories.map((category, index) => (
        <div
          key={index}
          className="category-card"
          style={{ backgroundColor: category.color }}
        >
          <p>{category.name}</p>
          <p>{category.budget} DKK</p>
        </div>
      ))}
    </div>
  );
}
