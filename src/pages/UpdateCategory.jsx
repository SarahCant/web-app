import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UpdateCategory() {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [budget, setBudget] = useState("");
  const params = useParams();
  const url = `https://web-app-c295f-default-rtdb.firebaseio.com/category/${params.id}.json`;
  const navigate = useNavigate();

  useEffect(() => {
    async function getCategory() {
      const response = await fetch(url);
      const categoryData = await response.json();
      console.log(categoryData);
      setCategory(categoryData);
      setName(categoryData.name);
      setColor(categoryData.color);
      setBudget(categoryData.budget);
    }
    getCategory();
  }, [url]);

  // Liste over farver
  const colors = [
    "#F8E392",
    "#F6A58C",
    "#ABA7FF",
    "#B4A270",
    "#B4EDEF",
    "#FF7541",
    "#F8A7D9",
    "#00B9CE",
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const categoryToUpdate = { name, color, budget };

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(categoryToUpdate),
    });

    if (response.ok) {
      navigate(-1);
    } else {
      alert(
        "Hovsa, der skete en fejl ved opdatering af kategorien - prøv igen senere"
      );
    }
  }

  async function handleDelete() {
    const shouldDelete = window.confirm(
      "Er du sikker på, at du vil slette denne kategori?"
    );
    if (shouldDelete) {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate(-1);
      } else {
        alert("Hovsa, der skete en fejl - prøv igen senere");
      }
    }
  }

  return (
    <div>
      <button onClick={handleGoBack}>tilbage</button>
      <h1>{category.name}</h1>
      <p>budget: {category.budget}</p>
      <p>resterende: {category.remaining}</p>
      <p>historik (udgifter)</p>

      <h2>Ret i kategori</h2>
      <form className="category-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Ret navn på kategori</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Navn på kategori"
          />
        </div>

        <div className="color-picker">
          <label>Vælg en anden farve til kategori</label>
          <div className="color-options">
            {colors.map((c, index) => (
              <div
                key={index}
                className={`color-circle ${c === color ? "selected" : ""}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
            <div className="color-circle add-circle">+</div>
          </div>
        </div>

        <div className="input-group">
          <label>Ret budget</label>
          <div className="budget-input">
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="DKK"
            />
            <span>DKK</span>
          </div>
        </div>
        <button>Gem ændringer</button>
      </form>

      <button onClick={handleDelete}>Slet kategori</button>
    </div>
  );
}
