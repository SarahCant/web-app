import { useState, useEffect } from "react";
import Circle from "../components/Circle";
import { Link } from "react-router-dom";
import "../css/Sarah.css";

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
    <>
      <h1>Min oversigt</h1>
      <div className="fp_circle_streak">
        {categories.length > 0 && <Circle categories={categories} />}
        <p className="fp_circletxt">
          TAL <br /> TILBAGE DENNE MÅNED
        </p>
        <p className=".fp_streak">Du klarer det så godt!</p>
      </div>
      <Link to="/budget">
        <button className="btn">Budget-siden</button>
      </Link>
      <Link to="/addcategory">
        <button className="btn">Tilføj kategori</button>
      </Link>
    </>
  );
}
