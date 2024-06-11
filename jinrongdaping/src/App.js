import { useEffect, useState, useRef } from "react";
import "./App.css";
import First from "./pages/first";
import Second from "./pages/second";
import Third from "./pages/third";
import Four from "./pages/four";
import Five from "./pages/five";

function App() {
  const socketRef = useRef();
  const [showPage, setShowPage] = useState({
    page: 1,
    subPage: null,
  });
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://192.168.10.172:8080");

    socketRef.current.onopen = () => {
      console.log("建立webSocket成功！");
    };

    socketRef.current.onmessage = async (event) => {
      const _text = await event.data.text();
      if (_text === "jinrongdashuju") {
        setShowPage({
          page: 1,
        });
      }
      if (_text === "chengshidashuju") {
        setShowPage({
          page: 2,
        });
      }
      if (_text === "chanyedashuju") {
        setShowPage({
          page: 3,
        });
      }
      if (_text.indexOf("chengshidashujusubSelected") > -1) {
        const _split = _text.split("chengshidashujusubSelected");
        setShowPage({
          page: 2,
          subPage: _split[1],
        });
      }
      if (_text.indexOf("chanyedashujusubSelected") > -1) {
        const _split = _text.split("chanyedashujusubSelected");
        setShowPage({
          page: 3,
          subPage: _split[1],
        });
      }
      if (_text === "shidazhongdian") {
        setShowPage({
          page: 4,
        });
      }
      if (_text === "xianshangpingtai") {
        setShowPage({
          page: 5,
        });
      }
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  return (
    <div className="App">
      {showPage.page === 1 && <First />}
      {showPage.page === 2 && (
        <Second key={Math.random()} sub={showPage.subPage} />
      )}
      {showPage.page === 3 && (
        <Third key={Math.random()} sub={showPage.subPage} />
      )}
      {showPage.page === 4 && <Four />}
      {showPage.page === 5 && <Five />}
    </div>
  );
}

export default App;
