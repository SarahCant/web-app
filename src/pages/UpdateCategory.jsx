/* SOFIE */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/Sofie.css";
import AlertBox from "../components/AlertBox";

export default function UpdateCategory() {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [budget, setBudget] = useState("");
  const [remaining, setRemaining] = useState("");
  const [spent, setSpent] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showExtraColors, setShowExtraColors] = useState(false); //ekstra colors
  const [selectedExtraColor, setSelectedExtraColor] = useState("");
  const params = useParams();
  const url = `https://web-app-c295f-default-rtdb.firebaseio.com/category/${params.id}.json`;
  const navigate = useNavigate();

  useEffect(() => {
    // fetch the category data from firebase
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

  // updates the remaining amount when the budget amount changes
  useEffect(() => {
    const budgetNumber = Number(budget);
    if (!isNaN(budgetNumber)) {
      const newRemaining = budgetNumber - spent;
      setRemaining(newRemaining);
    }
  }, [budget, spent]);

  // handles changes in the budget input field with some validation criterias
  const handleBudgetChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setBudget(value);
    }
  };

  // list of colors to chose from
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

  const extraColors = [
    "#FAD6A5",
    "#E1E3E1",
    "#B2EBE0",
    "#FFB6C1",
    "#D5B8F6",
    "#FDE68A",
    "#FFD700",
    "#87CEEB",
    "#FF69B4",
    "#BA55D3",
    "#98FB98",
    "#FFE4E1",
  ];

  // navigates one page back when clicking on the arrow
  const handleGoBack = () => {
    navigate(-1);
  };

  // handles submit of new changes with patch
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

  // shows alert box - makes the user confirm the delete
  function handleDelete() {
    setShowDeleteAlert(true);
  }

  // handles delete of category
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

  // close alert box
  function closeAlert() {
    setShowDeleteAlert(false);
  }

  // extra color function
  function handleColorSelect(c, isExtraColor = false) {
    setColor(c);
    if (isExtraColor) {
      setSelectedExtraColor(c); // pick extra color
      setShowExtraColors(false); // close extra color
    } else {
      setSelectedExtraColor(""); // remove extra color - when normal color picked
    }
  }

  return (
    <div>
      <div className="arrow_h1">
        <img
          onClick={handleGoBack}
          className="arrow_back"
          src="img/arrow_quickadd.png"
          alt="arrow back"
        />
        <h1>{category.name}</h1>
      </div>

      <div className="h2_flex">
        <h2 className="h2_update">Ret i kategori</h2>
        <img
          className="pencil_update"
          src="img/pencil.png"
          alt="pencil update"
        />
      </div>

      {/* form to make category changes in */}
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
                className={`color_circle ${c === color ? "selected" : ""}`}
                style={{ backgroundColor: c }}
                onClick={() => handleColorSelect(c)}
              />
            ))}

            <div
              className="color_circle add_circle"
              style={{ backgroundColor: selectedExtraColor || "#00B9CE" }} // color used
              onClick={() => setShowExtraColors(!showExtraColors)}
            >
              {selectedExtraColor ? "" : "+"} {/* change icon */}
            </div>
          </div>
          {showExtraColors && (
            <div className="color_flex_update">
              {extraColors.map((c, index) => (
                <div
                  key={index}
                  className={`color_circle ${c === color ? "selected" : ""}`}
                  style={{ backgroundColor: c }}
                  onClick={() => handleColorSelect(c, true)}
                />
              ))}
            </div>
          )}
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

      {/* delete button */}
      <div className="btn_flex">
        <button className="btn btn_delete" onClick={handleDelete}>
          Slet kategori
        </button>

        {/* alert/confirmation box */}
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
