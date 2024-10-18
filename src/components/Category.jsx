import "../css/Lejla.css";
import "../css/Sarah.css";
import { useNavigate } from "react-router-dom";

export default function Category({ categories }) {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="categories">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className="category_btn"
        >
          <div
            className="category_disp"
            style={{ backgroundColor: category.color }}
          >
            <div className="category_txt">
              <p>{category.name}</p>
              <p>{category.budget} DKK</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
