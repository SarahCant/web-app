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

import "../css/Sarah.css";

export default function Category({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  const handleCategoryClick = (categoryId) => {
    onSelectCategory(categoryId); // Update selected category state
  };

  function getLighterColor(color) {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.min(255, r + 40);
    g = Math.min(255, g + 40);
    b = Math.min(255, b + 40);

    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  return (
    <>
      <div className="categories">
        {categories.map((category) => {
          const spent =
            category.budget - (category.remaining || category.budget);
          const spentRatio = spent / category.budget;

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`category_btn ${
                selectedCategory === category.id ? "selected" : ""
              }`}
            >
              <div
                className="category_disp"
                style={{ backgroundColor: getLighterColor(category.color) }}
              >
                <div
                  className="category_fill"
                  style={{
                    backgroundColor: category.color,
                    height: `${spentRatio * 100}%`,
                  }}
                />
                <div className="category_txt">
                  <p>{category.name}</p>
                  <p>
                    {category.remaining !== null &&
                    category.remaining !== category.budget &&
                    category.remaining !== undefined
                      ? `${category.remaining}/${category.budget}`
                      : `${category.budget}/${category.budget}`}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
/*
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
                {category.remaining !== null &&
                category.remaining !== category.budget &&
                category.remaining !== undefined
                  ? `${category.remaining}/${category.budget}`
                  : `${category.budget}/${category.budget}`}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
*/
