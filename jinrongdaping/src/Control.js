import { useEffect, useRef, useState } from 'react';
import buttons1 from './asset/control/按键.png';
import buttons2 from './asset/control/城市大数据二级.png';
import './Control.css';

const list1 = ['jinrongdashuju', 'chengshidashuju', 'chanyedashuju', 'xianshangpingtai'];
const list2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function App() {
  const webSocketRef = useRef();
  const [selected, setSelected] = useState('jinrongdashuju');
  const [subSelect, setSubSelect] = useState(0);

  useEffect(() => {
    webSocketRef.current = new WebSocket('ws://192.168.2.172:8080');

    webSocketRef.current.onopen = () => {
      console.log('连接webSocket成功！')
    }

    return () => {
      webSocketRef.current.close();
    }
  }, [])

  const sendMessage = (ele) => {
    webSocketRef.current.send(ele)
  }

  return (
    <div className="Control">
      <img className="buttons1" src={buttons1}
        onClick={sendMessage}
      ></img>
      {list1.map((ele, i) => {
        const _left = 363 * i + 268;
        return <div
          className="selected"
          style={{ left: _left, borderWidth: ele === selected ? 20 : 0 }}
          onClick={function () {
            setSelected(ele);
            sendMessage(ele);
            setSubSelect(0);
          }}
        ></div>
      })}
      {selected === 'chengshidashuju' || selected === 'chanyedashuju' ? <>
        <img className="buttons2" src={buttons2}></img>
        {list2.map((ele, i) => {
          const _order = i % 5;
          const row = parseInt(i / 5);
          const _left = 272 * _order + 290;
          const _top = 705 + row * 90;
          return <div
            className="subSelected"
            style={{
              left: _left,
              top: _top,
              borderWidth: ele === subSelect ? 8 : 0
            }}
            onClick={function () {
              setSubSelect(ele);
            }}
          ></div>
        })}
        {/* <div className="subSelect2"></div> */}
      </> : <></>}

    </div>
  );
}

export default App;
