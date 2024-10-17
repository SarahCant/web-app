import { useState, useEffect } from "react";
import Circle from "../components/Circle";

export default function FrontPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true; // to prevent state updates on unmounted components
    async function fetchCategories() {
      const response = await fetch(
        "https://web-app-c295f-default-rtdb.firebaseio.com/category.json"
      );

      if (!isMounted) return; //update state if component is still mounted

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
      {categories.length > 0 && <Circle categories={categories} />}
    </div>
  );
}
