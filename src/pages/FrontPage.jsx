import { useState, useEffect } from "react";
import Circle from "../components/Circle"; // Adjust the path if necessary

export default function FrontPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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
    <div>
      <h1>hej</h1>
      <h2>forsiden</h2>
      {/* Render Circle if categories exist */}
      {categories.length > 0 && <Circle categories={categories} />}
    </div>
  );
}
