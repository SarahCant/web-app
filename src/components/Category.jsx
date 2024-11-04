/* 
SOFIE & SARAH (BASED ON LEJLA'S INITIAL ADDCATEGORY CODE)
SOFIE: EXTRA FOCUS ON CATEGORY FILL AND LOOK
SARAH: EXTRA FOCUS ON RERENDERING VALUES TO OTHER PAGES 
*/

import { NavLink } from "react-router-dom";

export default function Category({
  categories,
  selectedCategory,
  onSelectCategory,
  isSelectionOnly = false,
}) {
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

          const commonProps = {
            key: category.id,
            className: `category_btn ${
              selectedCategory === category.id ? "selected" : ""
            }`,
            onClick: () => onSelectCategory(category.id),
          };

          const content = (
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
                    ? `${parseFloat(category.remaining).toFixed(0)}/${
                        category.budget
                      }`
                    : `${category.budget}/${category.budget}`}
                </p>
                <p>kr. tilbage</p>
              </div>
            </div>
          );

          return isSelectionOnly ? (
            <div {...commonProps}>{content}</div>
          ) : (
            <NavLink {...commonProps} to={`/updatecategory/${category.id}`}>
              {content}
            </NavLink>
          );
        })}
      </div>
    </>
  );
}
