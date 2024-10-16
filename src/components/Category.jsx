import "../css/Lejla.css";

export default function Category({ categories }) {
  return (
    <div className="category-list">
      {categories.map((category) => (
        <div
          key={category.id}
          className="category-card"
          style={{ backgroundColor: category.color }}
        >
          <p>{category.name}</p>
          <p>{category.budget} DKK</p>
        </div>
      ))}
    </div>
  );
}
