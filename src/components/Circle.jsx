import "../css/Sarah.css";

export default function Circle({ categories }) {
  // Calculate total budget
  const totalBudget = categories.reduce(
    (acc, category) => acc + Number(category.budget),
    0
  );

  let cumulativePercent = 0;

  // Function to get coordinates for percentage of circle
  function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  return (
    <div className="circle_container">
      <svg className="circle_svg" viewBox="-1.2 -1.2 2.4 2.4">
        {" "}
        {categories.map((category) => {
          const percent = Number(category.budget) / totalBudget;
          const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
          cumulativePercent += percent;
          const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

          const largeArcFlag = percent > 0.5 ? 1 : 0;

          const pathData = [
            `M ${startX} ${startY}`, // Move to starting point
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Draw arc
          ].join(" ");

          return (
            <path
              key={category.id}
              d={pathData}
              className="circle_path"
              stroke={category.color}
            />
          );
        })}
      </svg>
    </div>
  );
} /* }

/* Filled Segments for Expenses */

/* import "../css/Sarah.css";

export default function Circle({ categories }) {
  // Calculate total expenses (we'll use this to fill the circle outline)
  const totalExpenses = categories.reduce(
    (acc, category) => acc + (Number(category.expenses) || 0), // Default to 0 if expenses are undefined
    0
  );

  let cumulativePercent = 0;

  // Function to get coordinates for percentage of circle
  function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  return (
    <div className="circle_container">
      <svg className="circle_svg" viewBox="-1.2 -1.2 2.4 2.4">
        {/* Gray Circle outline for total budget */
/*   <circle
          cx="0"
          cy="0"
          r="1"
          fill="none"
          stroke="lightgray"
          strokeWidth="0.1"
        /> */
/* 
        { */
/*  {categories.map((category) => {
          const expensePercent =
            (Number(category.expenses) || 0) / totalExpenses; // Calculate percentage of total expenses
          const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
          cumulativePercent += expensePercent;
          const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

          const largeArcFlag = expensePercent > 0.5 ? 1 : 0;

          const pathData = [
            `M ${startX} ${startY}`, // Move to starting point
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Draw arc
          ].join(" ");
 */
// Only draw the path if there are expenses and they contribute to totalExpenses
/*  if (expensePercent > 0) {
            return (
              <path
                key={category.id}
                d={pathData}
                className="circle_path"
                stroke={category.color}
                strokeWidth="0.1" // Adjust stroke width as necessary
                fill="none"
              />
            );
          }
          return null; // If no expenses, return null
        })}
      </svg>
    </div>
  );
}
 */
