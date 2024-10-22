import { useState } from "react";
import '../css/App.css';
import '../css/Lejla.css'; // Importer lejla.css

function Onboarding() {
  return (
    <div className="onboarding-container">
      {/* Brødtekst der forklarer, at brugeren ikke har lavet et budget endnu */}
      <p>Hov! Det ligner, at du ikke har lavet et budget endnu. Kom i gang her!</p>

      {/* Pilbillede der skal pege nedad mod knappen */}
      <img src="public/img/pil.png" alt="Pil ned" className="onboarding-arrow" />

      {/* Knap for at starte processen med at lave et budget */}
      <button className="onboarding-button">Lav budget</button>

      {/* Billede af en drage eller andet, som vises under knappen */}
      <img src="public/img/drage.png" alt="Drage" className="onboarding-image" />
    </div>
  );
}

export default function Budget() {
  const [harProfilCondition, setHarProfilCondition] = useState(false);

  return (
    <>
      {/* Overskrift der siger "Mit budget" flyttet her */}
      <h1 className="budget-header">Mit budget</h1>

      <button className="button_budget" onClick={() => setHarProfilCondition(prev => !prev)}>
        {harProfilCondition ? 'Lejla er logget ind' : 'Login'}
      </button>

      {
        harProfilCondition ?
          <>
            <div>
              <h1>hej</h1>
              <h2>hhhhhhhh</h2>
            </div>
          </> :
          <Onboarding />
      }
    </>
  );
}
