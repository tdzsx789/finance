import './App.css';
import { useEffect, useState, useRef } from 'react';
import Wait from './pages/wait';
import First from './pages/first';
import Second from './pages/second';
import Third from './pages/third';

function App() {
  const [showPage, setShowPage] = useState(0);
  const timeoutRef = useRef();

  function handleClick(i) {
    setShowPage(i);
  }

  useEffect(function () {
    function touchStart() {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(function () {
        setShowPage(0);
      }, 60000 * 5)
    }

    window.addEventListener('touchstart', touchStart, { passive: false });
  }, [])

  return (
    <div className="App">
      <Wait handleClick={function () {
        handleClick(1);
      }} show={showPage === 0} />
      {showPage === 1 && <First
        handleToSecond={function () {
          handleClick(2);
        }}
        handleToThird={function () {
          handleClick(3);
        }}
      />}
      {showPage === 2 && <Second handleBack={function () {
        handleClick(1);
      }} />}
      {showPage === 3 && <Third handleBack={function () {
        handleClick(1);
      }} />}
    </div>
  );
}

export default App;
