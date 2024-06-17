import { useEffect, useRef, useState } from 'react';
import buttons1 from './asset/control/按键.png';
import buttons2 from './asset/control/城市大数据二级.png';
import buttons3 from './asset/control/产业大数据二级.png';
import './Control.css';

const list1 = ['jinrongdashuju', 'chengshidashuju', 'chanyedashuju', 'xianshangpingtai'];
const chengshiList = [null, null, null,
  {
    name: '科创金融总部一期',
    type: 'video'
  },
  {
    name: '筑芯创研空间',
    type: 'image'
  }, null, null,
  {
    name: '武汉新城体育中心',
    type: 'image'
  },
  null, null];
const chanyeList = [
  {
    name: '武汉光谷中华科技产业园',
    type: 'image'
  },
  null, null, null, null,
  {
    name: '武汉光谷生物城',
    type: 'video'
  },
  null, null
];

function App() {
  const webSocketRef = useRef();
  const [selected, setSelected] = useState('jinrongdashuju');
  const [subSelect, setSubSelect] = useState(0);
  const [subSelect2, setSubSelect2] = useState(false);

  useEffect(() => {
    webSocketRef.current = new WebSocket('ws://192.168.10.18:8080');

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
          key={'buttons' + i}
          style={{ left: _left, borderWidth: ele === selected ? 20 : 0 }}
          onClick={function () {
            setSelected(ele);
            sendMessage(ele);
            setSubSelect(0);
            setSubSelect2(false);
          }}
        ></div>
      })}
      {selected === 'chengshidashuju' ? <>
        <img className="buttons2" src={buttons2}></img>
        {chengshiList.map((ele, i) => {
          const _order = i % 5;
          const row = parseInt(i / 5);
          const _left = 272 * _order + 290;
          const _top = 705 + row * 90;
          return <div
            className="subSelected"
            key={'chengshiSub' + i}
            style={{
              left: _left,
              top: _top,
              borderWidth: ele && (ele.name === subSelect) ? 8 : 0
            }}
            onClick={function () {
              setSubSelect2(false);
              if (ele) {
                sendMessage('chengshidashujusubSelected' + ele.name);
                setSubSelect(ele.name);
              }
            }}
          ></div>
        })}
        <div
          className="subSelect2"
          onClick={function () {
            sendMessage('shidazhongdian');
            setSubSelect2(true);
            setSubSelect(0);
          }}
          style={{
            borderWidth: subSelect2 ? 8 : 0
          }}
        ></div>
      </> : <></>}
      {selected === 'chanyedashuju' ? <>
        <img className="buttons2" src={buttons3}></img>
        {chanyeList.map((ele, i) => {
          const _order = i % 4;
          const row = parseInt(i / 4);
          const _left = 340 * _order + 290;
          const _top = 705 + row * 90;
          return <div
            className="subSelected"
            key={'chanyeSub' + i}
            style={{
              left: _left,
              top: _top,
              width: 300,
              borderWidth: ele && (ele.name === subSelect) ? 8 : 0
            }}
            onClick={function () {
              setSubSelect2(false);
              if (ele) {
                sendMessage('chanyedashujusubSelected' + ele.name);
                setSubSelect(ele.name);
              }
            }}
          ></div>
        })}
      </> : <></>}
    </div>
  );
}

export default App;
