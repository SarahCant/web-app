import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/sofie.css";
import AlertBox from "../components/AlertBox";

export default function UpdateCategory() {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [budget, setBudget] = useState("");
  const [remaining, setRemaining] = useState("");
  const [spent, setSpent] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
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
      setRemaining(categoryData.remaining);
      setSpent(categoryData.budget - categoryData.remaining);
    }
    getCategory();
  }, [url]);

  // Update remaining when budget changes
  useEffect(() => {
    const budgetNumber = Number(budget);
    if (!isNaN(budgetNumber)) {
      const newRemaining = budgetNumber - spent;
      setRemaining(newRemaining);
    }
  }, [budget, spent]);

  const handleBudgetChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setBudget(value);
    }
  };

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

    const categoryToUpdate = { name, color, budget, remaining };

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

  function handleDelete() {
    setShowDeleteAlert(true);
  }

  async function confirmDelete() {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      navigate(-1);
    } else {
      alert("Hovsa, der skete en fejl - prøv igen senere");
    }
    setShowDeleteAlert(false);
  }

  function closeAlert() {
    setShowDeleteAlert(false);
  }

  return (
    <div>
      <div className="arrow_h1">
        <img
          onClick={handleGoBack}
          className="arrow_back"
          src="../public/img/arrow_quickadd.png"
          alt=""
        />
        <h1>{category.name}</h1>
      </div>

      <div className="h2_flex">
        <h2 className="h2_update">Ret i kategori</h2>
        <img className="pencil_update" src="../public/img/pencil.png" alt="" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input_flex_update">
          <label className="label_update">Ret navn på kategori</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Navn på kategori"
            className="input_update"
          />
        </div>

        <div className="input_flex_update">
          <label className="label_update">
            Vælg en anden farve til kategori
          </label>
          <div className="color_flex_update">
            {colors.map((c, index) => (
              <div
                key={index}
                className={`color-circle ${c === color ? "selected" : ""}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
            <div className="color-circle add-circle">
              <img
                className="plus_update"
                src="../public/img/plus.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="input_flex_update">
          <label className="label_update">Ret budget</label>
          <input
            type="number"
            value={budget}
            onChange={handleBudgetChange}
            placeholder="DKK"
            className="input_update"
          />
          <p className="p_update">
            Nuværende budget: {Math.floor(category.budget)} DKK
          </p>
          <p className="p_update">Resterende: {Math.floor(remaining)} DKK</p>
        </div>
        <div className="btn_flex">
          <button className="btn">Gem ændringer</button>
        </div>
      </form>

      <div className="btn_flex">
        <button className="btn btn_delete" onClick={handleDelete}>
          Slet kategori
        </button>

        {showDeleteAlert && (
          <AlertBox
            alertMessage="Er du sikker på, at du vil slette denne kategori?"
            showConfirmButtons={true}
            onConfirm={confirmDelete}
            onCancel={closeAlert}
          />
        )}
      </div>
    </div>
  );
}
