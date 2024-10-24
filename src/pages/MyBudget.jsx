import Category from "../components/Category";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BarChart from "../components/BarChart";

export default function MyBudget() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "https://web-app-c295f-default-rtdb.firebaseio.com/category.json"
        );
        const data = await response.json();
        const categoryArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCategories(categoryArray);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <>
      <h1>Mit budget</h1>
      <BarChart data={categories} />
      <Category categories={categories} />
      <Link to="/addcategory">
        <img
          src="../public/img/plus.png"
          alt="Tilføj kategori"
          className="fp_addcategory"
        />
      </Link>
      <button className="btn">Ret budget?</button>
    </>
  );
}