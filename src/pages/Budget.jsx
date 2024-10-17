import { useState } from "react";

function Onboarding() {
  return (
    <div>
      <h1>Onboarding</h1>
    </div>
  )
}

export default function Budget() {
  const [harProfilCondition, setHarProfilCondition] = useState(false);
  return <>
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
  </>;
}