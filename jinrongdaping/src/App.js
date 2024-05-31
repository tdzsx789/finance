import { useEffect, useState, useRef } from "react";
import "./App.css";
import First from "./pages/first";
import Second from "./pages/second";
import Third from "./pages/third";
import Four from "./pages/four";
import Five from "./pages/five";

function App() {
  const socketRef = useRef();
  const [showPage, setShowPage] = useState(1);
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8080");

    socketRef.current.onopen = () => {
      console.log("建立webSocket成功！");
    };

    socketRef.current.onmessage = async (event) => {
      const _text = await event.data.text();
      console.log("tttt", _text);
      if (_text === 'jinrongdashuju') {
        setShowPage(1);
      }
      if (_text === 'chengshidashuju') {
        setShowPage(2);
      }
      if (_text === 'chanyedashuju') {
        setShowPage(3);
      }
      if (_text === 'chengshidashuju') {
        setShowPage(2);
      }
      if (_text === 'chengshidashujusubSelected') {
        setShowPage(5);
      }
      if (_text === 'chanyedashujusubSelected') {
        setShowPage(6);
      }
      if (_text === 'shidazhongdian') {
        setShowPage(4);
      }
      if (_text === 'xianshangpingtai') {
        setShowPage(7);
      }
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  return (
    <div className="App">
      <First show={showPage === 1} />
      <Second show={showPage === 2 || showPage === 5} sub={showPage === 5} />
      <Third show={showPage === 3 || showPage === 6} sub={showPage === 6} />
      <Four show={showPage === 4} />
      <Five show={showPage === 7} />
    </div>
  );
}

export default App;
