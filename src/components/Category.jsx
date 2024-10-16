import "../css/Lejla.css";
import { useNavigate } from "react-router-dom";

export default function Category({ categories }) {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="category-list">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className="category_btn"
        >
          <div
            className="category-card"
            style={{ backgroundColor: category.color }}
          >
            <p>{category.name}</p>
            <p>{category.budget} DKK</p>
          </div>
        </button>
      ))}
    </div>
  );
}
