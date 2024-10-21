/* import "../css/Lejla.css";
import "../css/Sarah.css";

export default function Category({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  const handleCategoryClick = (categoryId) => {
    onSelectCategory(categoryId); // Update selected category state
  };

  return (
    <div className="categories">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`category_btn ${
            selectedCategory === category.id ? "selected" : ""
          }`} // Add class for selected category
        >
          <div
            className="category_disp"
            style={{ backgroundColor: category.color }}
          >
            <div className="category_txt">
              <p>{category.name}</p>
              <p>
                {category.budget},- <br /> tilbage{" "}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
 */
import "../css/Lejla.css";
import "../css/Sarah.css";

export default function Category({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  const handleCategoryClick = (categoryId) => {
    onSelectCategory(categoryId); // Update selected category state
  };

  return (
    <div className="categories">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`category_btn ${
            selectedCategory === category.id ? "selected" : ""
          }`}
        >
          <div
            className="category_disp"
            style={{ backgroundColor: category.color }}
          >
            <div className="category_txt">
              <p>{category.name}</p>
              <p>
                {category.expenses > 0
                  ? `${category.budget - category.expenses} DKK tilbage`
                  : `${category.budget} DKK tilbage`}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
