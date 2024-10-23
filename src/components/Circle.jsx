import "../css/Sarah.css";

export default function Circle({ categories }) {
  // Calculate total budget (sum of all categories' budgets)
  const totalBudget = categories.reduce(
    (acc, category) => acc + (Number(category.budget) || 0),
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
        {/* Background circle */}
        <circle
          cx="0"
          cy="0"
          r="1"
          fill="none"
          stroke="var(--light_gray)"
          strokeWidth="16%"
        />

        {/* Loop through categories and draw segments for those with expenses */}
        {categories.map((category) => {
          // Calculate how much of the budget has been used
          const expense = category.budget - category.remaining;

          // Calculate the percentage of the total budget used for this category
          const expensePercent = expense / totalBudget;

          // Skip if no expenses or invalid budget
          if (expensePercent <= 0 || isNaN(expensePercent)) return null;

          // Get start and end coordinates for the arc
          const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
          cumulativePercent += expensePercent;
          const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

          // Determine if the arc is large enough to use the "large arc flag"
          const largeArcFlag = expensePercent > 0.5 ? 1 : 0;

          // Create path data for SVG arc
          const pathData = [
            `M ${startX} ${startY}`, // Move to starting point
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Draw arc
          ].join(" ");

          // Render the arc segment for the category
          return (
            <path
              key={category.id}
              d={pathData}
              className="circle_path"
              stroke={category.color}
              strokeWidth="16%"
              fill="none"
            />
          );
        })}
      </svg>
    </div>
  );
}
