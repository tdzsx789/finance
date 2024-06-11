import { useEffect, useState, memo, useRef } from "react";
import styles from "./index.module.scss";

import subImage from "../../asset/third/二级产业大数据.jpg";
import image from "../../asset/third/二级八大产业园总览.jpg";

import videoUrl from './二级八大产业园总览_1.mp4';
import 二级产业大数据武汉光谷生物城_1 from './二级产业大数据武汉光谷生物城_1.mp4';
import 二级产业大数据 from './二级产业大数据-改.jpg';

const list = {
  武汉光谷中华科技产业园: {
    type: 'image',
    url: 二级产业大数据
  },
  武汉光谷生物城: {
    type: 'video',
    url: 二级产业大数据武汉光谷生物城_1
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
        ></video>
      }
    </>
  );
});

export default App;
