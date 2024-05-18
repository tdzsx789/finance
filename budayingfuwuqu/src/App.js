import './App.css';
import { useEffect, useState } from 'react';
import First from './pages/first';
import Second from './pages/second';

function App() {
  const [showSecond, setShowSecond] = useState(null);

  function handleClick(i) {
      setShowSecond(i);
  }

  function handleBack() {
    setShowSecond(null);
  }

  return (
    <div className="App">
      {showSecond ? <Second data={showSecond} handleBack={handleBack}></Second> : <First handleClick={handleClick}></First>}
    </div>
  );
}

export default App;
