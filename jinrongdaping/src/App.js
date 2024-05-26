import { useEffect, useState } from 'react';
import './App.css';
import First from './pages/first';
import Second from './pages/second';
import Third from './pages/third';
import Four from './pages/four';
import Five from './pages/five';

function App() {
  const [showPage, setShowPage] = useState(1);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = event => {
      console.log('event', event.data)
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(function () {
    document.addEventListener("keydown", (event) => {
      console.log('event', event)
      // do something
      if (event.keyCode === 49) {
        setShowPage(1);
      }
      if (event.keyCode === 50) {
        setShowPage(2);
      }
      if (event.keyCode === 51) {
        setShowPage(3);
      }
      if (event.keyCode === 52) {
        setShowPage(4);
      }
      if (event.keyCode === 53) {
        setShowPage(7);
      }
      if (event.keyCode === 81) {
        setShowPage(5);
      }
      if (event.keyCode === 87) {
        setShowPage(6);
      }
    });
  }, [])

  console.log('showPage', showPage)

  return (
    <div className="App">
      <First show={showPage === 1} />
      <Second show={showPage === 2 || showPage === 5}  sub={showPage === 5}/>
      <Third show={showPage === 3 || showPage === 6} sub={showPage === 6} />
      <Four show={showPage === 4} />
      <Five show={showPage === 7} />
    </div>
  );
}

export default App;
