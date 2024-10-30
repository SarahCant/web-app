
const ProgressBar = ({ progress }) => {
  const images = [
    '/img/savings_1.png', // Erstat med rigtige sti til billederne
    '/img/savings_2.png',
    '/img/savings_3.png',
    '/img/savings_4.png',
    '/img/savings_5.png',
    '/img/savings_6.png',
    '/img/savings_7.png',
    '/img/savings_8.png',
    '/img/savings_9.png',
    '/img/savings_10.png',
  ];

  const index = Math.min(Math.floor(progress / 10), 9); // Vælg billede baseret på fremskridt

  return <img src={images[index]} alt="Opsparing fremskridt" className="savings-image" />;
};

export default ProgressBar;