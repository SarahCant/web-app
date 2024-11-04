/*JULIE */

const ProgressBar = ({ progress }) => {
  // Array of image paths representing different levels of savings progress
  const images = [
    '/img/savings_empty.png',  // 0% savings
    '/img/savings_1.png',      // Approximately 10% savings
    '/img/savings_2.png',      // Approximately 20% savings
    '/img/savings_3.png',      // Approximately 30% savings
    '/img/savings_4.png',      // Approximately 40% savings
    '/img/savings_5.png',      // Approximately 50% savings
    '/img/savings_6.png',      // Approximately 60% savings
    '/img/savings_7.png',      // Approximately 70% savings
    '/img/savings_8.png',      // Approximately 80% savings
    '/img/savings_9.png',      // Approximately 90% savings
    '/img/savings_10.png',     // 100% savings
  ];

  // Calculate the index to select the appropriate image based on progress
  // Divide progress by 11 (approx. 10% increments), then use Math.min to cap at 10 (last index in array)
  const index = Math.min(Math.floor(progress / 11), 10);

  // Render the selected image to visually represent current savings progress
  return <img src={images[index]} alt="Savings progress" className="savings-image" />;
};

export default ProgressBar;
