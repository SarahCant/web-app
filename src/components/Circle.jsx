import "../css/Sarah.css";

export default function Circle({ categories, availableBudget }) {
  // Calculate total expenses based on categories
  const totalExpenses = categories.reduce((acc, category) => {
    const expense = Number(category.budget) - Number(category.remaining);
    return acc + (isNaN(expense) ? 0 : expense); // Sum up valid expenses
  }, 0);

  let cumulativePercent = 0;

  // Get coordinates for percentage of circle
  function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  return (
    <div className="circle_container">
      <svg className="circle_svg" viewBox="-1.2 -1.2 2.4 2.4">
        {/* Gray background circle */}
        <circle
          cx="0"
          cy="0"
          r="1"
          fill="none"
          stroke="var(--light_gray)"
          strokeWidth="16%"
        />

        {/* Draw remaining arc if there's any unspent budget */}
        {availableBudget > totalExpenses && (
          <path
            d={`M ${getCoordinatesForPercent(cumulativePercent).join(" ")}
              A 1 1 0 0 1 ${getCoordinatesForPercent(1).join(" ")}`}
            className="circle_path"
            stroke="var(--light_gray)" // Change to your desired remaining color
            strokeWidth="16%"
            fill="none"
          />
        )}

        {/* Loop through categories and draw segments for those with expenses */}
        {categories.map((category) => {
          // Calculate how much of the budget has been used
          const expense = Number(category.budget) - Number(category.remaining);

          // Only draw if there's a valid expense
          if (expense <= 0 || isNaN(expense)) return null;

          // Calculate the percentage of available budget used for this category
          const expensePercent =
            availableBudget > 0 ? expense / availableBudget : 0;

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
