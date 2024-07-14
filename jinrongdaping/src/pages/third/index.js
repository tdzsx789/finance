import { useEffect, useState, memo, useRef } from "react";
import styles from "./index.module.scss";

// import subImage from "../../asset/third/二级产业大数据.jpg";
// import image from "../../asset/third/二级八大产业园总览.jpg";

// import videoUrl from './二级八大产业园总览_1.mp4';
// import 二级产业大数据武汉光谷生物城_1 from './二级产业大数据武汉光谷生物城_1.mp4';
// import 二级产业大数据 from './二级产业大数据-改.jpg';
import secondImg from './二级产业大数据-新.jpg';
import 光谷中华科技产业园 from './光谷中华科技产业园.jpg';
import 光电子信息产业园 from './光电子信息产业园.jpg';
import 未来科技城 from './未来科技城.jpg';
import 现代服务业园 from './现代服务业园.jpg';
import 智能制造产业园 from './智能制造产业园.jpg';
import 武汉光谷生物城 from './武汉光谷生物城.jpg';
import 综保区 from './综保区.jpg';
import 中心城 from './中心城.jpg';

const list = {
  光谷中华科技产业园: {
    type: 'image',
    url: 光谷中华科技产业园
  },
  光电子信息产业园: {
    type: 'image',
    url: 光电子信息产业园
  },
  未来科技城: {
    type: 'image',
    url: 未来科技城
  },
  现代服务业园: {
    type: 'image',
    url: 现代服务业园
  },
  智能制造产业园: {
    type: 'image',
    url: 智能制造产业园
  },
  武汉光谷生物城: {
    type: 'image',
    url: 武汉光谷生物城
  },
  综保区: {
    type: 'image',
    url: 综保区
  },
  中心城: {
    type: 'image',
    url: 中心城
  }
}

const App = memo(function App({ sub }) {
  return (
    <>
      {(sub && list[sub]) ? (list[sub].type === 'video' ?
        <video
          src={list[sub].url}
          className={styles.wrap}
          autoPlay
          loop
          muted
        ></video> :
        <img className={styles.wrap} src={list[sub].url}></img>
      ) :
        // <video
        //   src={videoUrl}
        //   className={styles.wrap}
        //   autoPlay
        //   loop
        //   muted
        // ></video>
        <img className={styles.wrap} src={secondImg}></img>
      }
    </>
  );
});

export default App;
