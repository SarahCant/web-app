/* SOFIE */
import Category from "../components/Category";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import BarChart from "../components/BarChart";
import { useNavigate } from "react-router-dom";

export default function MyBudget() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  // navigates to update category page that displays the information of the chosed category based on its id
  const handleCategoryClick = (categoryId) => {
    navigate(`/updatecategory/${categoryId}`);
  };

  useEffect(() => {
    // fetch the categories from firebase
    async function fetchCategories() {
      const response = await fetch(
        "https://web-app-c295f-default-rtdb.firebaseio.com/category.json"
      );
      const data = await response.json();
      const categoryArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setCategories(categoryArray);
    }

    fetchCategories();
  }, []);

  return (
    <>
      <h1>Mit budget</h1>
      {/* bar chart */}
      <BarChart data={categories} />
      <p className="p_mybudget">Tryk på en kategori for at redigere den:</p>
      {/* categories, select category */}
      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onClickCategory={handleCategoryClick}
      />
      <div className="fp_addcategory_flex">
        {/* add category */}
        <NavLink to="/addcategory">
          <img
            src="img/plus.png"
            alt="Tilføj kategori"
            className="fp_addcategory"
          />
        </NavLink>
      </div>
    </>
  );
}
