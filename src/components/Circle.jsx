/* SARAH */
import "../css/Sarah.css";

export default function Circle({ categories, availableBudget }) {
  // calculate total expenses based on categories
  const totalExpenses = categories.reduce((acc, category) => {
    const expense = Number(category.budget) - Number(category.remaining);
    return acc + (isNaN(expense) ? 0 : expense); // sum up valid expenses
  }, 0);

  let cumulativePercent = 0;

  // coordinates for percentage of circle
  function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  return (
    <div className="circle_container">
      <svg className="circle_svg" viewBox="-1.2 -1.2 2.4 2.4">
        {/* gray background circle */}
        <circle
          cx="0"
          cy="0"
          r="1"
          fill="none"
          stroke="var(--light_gray)"
          strokeWidth="16%"
        />

        {/* loop through categories + draw segments for those with expenses */}
        {categories.map((category) => {
          // how much of the budget has been used
          const expense = Number(category.budget) - Number(category.remaining);

          // only draw if there's a valid expense
          if (expense <= 0 || isNaN(expense)) return null;

          //percentage of available budget used for category
          const expensePercent =
            availableBudget > 0 ? expense / availableBudget : 0;

          // start and end coordinates for arc
          const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
          cumulativePercent += expensePercent;
          const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

          // if arc large enough to use the "large arc flag"
          const largeArcFlag = expensePercent > 0.5 ? 1 : 0;

          // path data for SVG arc
          const pathData = [
            `M ${startX} ${startY}`, // move to starting point
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // draw arc
          ].join(" ");

          // render arc segment for category
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
