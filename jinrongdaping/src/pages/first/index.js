import { useEffect, useState, memo, useRef } from "react";
// import axios from 'axios';
import styles from "./index.module.scss";
import Time from '../../components/timer';
import subCard from '../../asset/first/小卡片.png';
import Cards from './Card';
import LineChart from './LineChart';
import SubCard from './SubCard';
import videoUrl from '../../asset/first/待机.mp4';

export const cardData = ['上证指数', '深证成指', '创业版'];
export const subCardData = ['沪深300', '道琼斯指数', '标普500', '纳斯达克', '香港恒生', '日经225']
export const columns = 'close,date,high,low,open,ticker,volume,amount';

const App = memo(function App() {

  return (
    <div className={styles.wrap}>
      <video
        src={videoUrl}
        className={styles.video}
        autoPlay
        loop
        muted
      ></video>
      <Time />
      <Cards data={cardData}></Cards>
      <LineChart></LineChart>
      <div className={styles.subWrap}>
        <img src={subCard}></img>
      </div>
      <SubCard subCardData={subCardData}></SubCard>
    </div >
  );
});

export default App;
