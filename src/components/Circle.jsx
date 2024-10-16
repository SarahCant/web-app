export default function Circle({ categories }) {
  // Calculate total budget
  const totalBudget = categories.reduce(
    (acc, category) => acc + Number(category.budget),
    0
  );

  let cumulativePercent = 0;

  // Utility function to get coordinates for percentage of circle
  function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  return (
    <svg
      width="200"
      height="200"
      viewBox="-1 -1 2 2"
      style={{ transform: "rotate(-90deg)" }}
    >
      {categories.map((category) => {
        const percent = Number(category.budget) / totalBudget;
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
        cumulativePercent += percent;
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

        const largeArcFlag = percent > 0.5 ? 1 : 0;

        const pathData = [
          `M ${startX} ${startY}`, // Move to starting point
          `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Draw arc
          `L 0 0`, // Line back to center
        ].join(" ");

        return (
          <path
            key={category.id}
            d={pathData}
            fill={category.color}
            stroke="white"
            strokeWidth="0.01"
          />
        );
      })}
    </svg>
  );
}
