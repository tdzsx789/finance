import { useEffect, useState, memo, useRef } from "react";
import styles from "./index.module.scss";

// import subImage from '../../asset/second/二级城市大数据.jpg';
// import image from '../../asset/second/二级城市大数据总览.jpg';

import videoUrl from './02武汉新城总体规划概览_1.mp4';
import 武汉新城金融总部一期_1 from './武汉新城金融总部一期_1.mp4';
import 二级城市大数据光谷筑芯科技产业园 from './二级城市大数据光谷筑芯科技产业园.jpg';
import 二级城市大数据武汉新城体育中心 from './二级城市大数据武汉新城体育中心.jpg';
import 光电子信息产业园 from './光电子信息产业园.jpg';
import 二级城市大数据青年社区 from './二级城市大数据青年社区.jpg';
import 中央公园 from './中央公园.jpg';
import 未来公园 from './未来公园.jpg';

const list = {
  科创金融总部一期: {
    type: 'video',
    url: 武汉新城金融总部一期_1
  },
  筑芯创研空间: {
    type: 'image',
    url: 二级城市大数据光谷筑芯科技产业园
  },
  武汉新城体育中心: {
    type: 'image',
    url: 二级城市大数据武汉新城体育中心
  },
  光电子信息产业园: {
    type: 'image',
    url: 光电子信息产业园
  },
  二级城市大数据青年社区: {
    type: 'image',
    url: 二级城市大数据青年社区
  },
  中央公园: {
    type: 'image',
    url: 中央公园
  },
  未来公园: {
    type: 'image',
    url: 未来公园
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
        <video
          src={videoUrl}
          className={styles.wrap}
          autoPlay
          loop
          muted
        ></video>}
    </>
  );
});

export default App;
