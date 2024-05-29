import { useEffect, useState, memo, useRef } from "react";
import axios from 'axios';
import styles from "./index.module.scss";
import Time from '../../components/timer';
import subCard from '../../asset/first/国际金融指数.png';
import Cards from './Card';
import LineChart from './LineChart';
import videoUrl from '../../asset/first/待机.mp4';

const originIndexParams = {
  value: '',
  diff: '',
  diffPercent: ''
}

export const columns = 'close,date,high,low,open,ticker,volume,amount';

const App = memo(function App({ show }) {
  const [index1, setIndex1] = useState(originIndexParams);
  const [index2, setIndex2] = useState(originIndexParams);
  const [index3, setIndex3] = useState(originIndexParams);
  const [index4, setIndex4] = useState(originIndexParams);
  const [index5, setIndex5] = useState(originIndexParams);
  const [index6, setIndex6] = useState(originIndexParams);

  const getData = async (country, code) => {
    const _result = await axios.get(`/api/fin/index/${country}/daily?token=c15cc49a21dc4ecaaff430fafc128532&ticker=${code}&order=2`);
    if (_result.data && _result.data.length > 0) {

    }
  }

  const getCountry = async () => {
    const _result = await axios.get('/api/fin/index/country?token=c15cc49a21dc4ecaaff430fafc128532');
    console.log('ccc', _result)
  }

  const getTikers = async (country) => {
    const _result = await axios.get(`/api/fin/index/${country}/list?token=c15cc49a21dc4ecaaff430fafc128532`);
    console.log('tttt', _result)
  }

  const getSubIndexData = async (country, code, func) => {
    const _indexData = await axios.get(`/api/fin/index/${country}/daily/realtime?token=c15cc49a21dc4ecaaff430fafc128532&ticker=${code}&order=2&columns=${columns}`);
    const _dailyData = await axios.get(`/api/fin/index/${country}/daily?token=c15cc49a21dc4ecaaff430fafc128532&ticker=${code}&order=2&limit=1&columns=${columns}`);
    if (_indexData.data.data && _dailyData.data.data && _indexData.data.data.length > 0 && _dailyData.data.data.length > 0) {
      const _result = getSubNewData(_indexData.data.data[0], _dailyData.data.data[0]);
      func(_result);
    }
  }

  function getSubNewData(_today, _yesterday) {
    return {
      value: getNumber(_today.close),
      diff: getNumber(_today.close - _yesterday.close),
      diffPercent: getNumber((_today.close - _yesterday.close) / _yesterday.close * 100)
    }
  }

  useEffect(() => {
    // getCountry();
    // JPN, USA, GBR
    // getTikers('CHN')
    // getIndexData('HKG', 'HSI', setData3);


    getSubIndexData('CHN', '000300', setIndex1);
    getSubIndexData('USA', 'DJI', setIndex2);
    getSubIndexData('USA', 'GSPC', setIndex3);
    //科创50
    getSubIndexData('CHN', '000688', setIndex4);
    getSubIndexData('JPN', 'N225', setIndex5);
    //香港恒生
    getSubIndexData('HKG', 'HSI', setIndex6);


    // getSubIndexData('HKG', 'HSCE', setIndex1);
    // getSubIndexData('HKG', 'HSTECH', setIndex2);
    // getSubIndexData('HKG', 'HSIDV', setIndex3);
    // getSubIndexData('HKG', 'HSCI', setIndex4);
    // getSubIndexData('HKG', 'HSIL', setIndex5);
    // getSubIndexData('HKG', 'VHSI', setIndex6);
  }, [])

  function getNumber(_value) {
    return Math.round(_value * 100) / 100;
  }

  return (
    <div className={styles.wrap} style={{ display: show ? 'block' : 'none' }}>
      <video
        src={videoUrl}
        className={styles.video}
        autoPlay
        loop
        muted
      ></video>
      <Time />
      <Cards></Cards>
      <LineChart></LineChart>
      <div className={styles.subWrap}>
        <img src={subCard}></img>
      </div>
      <div className={styles.subCard}>
        <div className={styles.subValue}>{index1.value}</div>
        <div className={styles.subDiff}>{index1.diff > 0 ? '+' + index1.diff : index1.diff}</div>
        <div className={styles.subPercent}>{index1.diffPercent > 0 ? '+' + index1.diffPercent : index1.diffPercent}%</div>
      </div>
      <div className={styles.subCard} style={{ left: 1455 }}>
        <div className={styles.subValue}>{index2.value}</div>
        <div className={styles.subDiff}>{index2.diff > 0 ? '+' + index2.diff : index2.diff}</div>
        <div className={styles.subPercent}>{index2.diffPercent > 0 ? '+' + index2.diffPercent : index2.diffPercent}%</div>
      </div>
      <div className={styles.subCard} style={{ left: 2600 }}>
        <div className={styles.subValue}>{index3.value}</div>
        <div className={styles.subDiff}>{index3.diff > 0 ? '+' + index3.diff : index3.diff}</div>
        <div className={styles.subPercent}>{index3.diffPercent > 0 ? '+' + index3.diffPercent : index3.diffPercent}%</div>
      </div>
      <div className={styles.subCard} style={{ left: 3755 }}>
        <div className={styles.subValue}>{index4.value}</div>
        <div className={styles.subDiff}>{index4.diff > 0 ? '+' + index4.diff : index4.diff}</div>
        <div className={styles.subPercent}>{index4.diffPercent > 0 ? '+' + index4.diffPercent : index4.diffPercent}%</div>
      </div>
      <div className={styles.subCard} style={{ left: 4910 }}>
        <div className={styles.subValue}>{index5.value}</div>
        <div className={styles.subDiff}>{index5.diff > 0 ? '+' + index5.diff : index5.diff}</div>
        <div className={styles.subPercent}>{index5.diffPercent > 0 ? '+' + index5.diffPercent : index5.diffPercent}%</div>
      </div>
      <div className={styles.subCard} style={{ left: 6060 }}>
        <div className={styles.subValue}>{index6.value}</div>
        <div className={styles.subDiff}>{index6.diff > 0 ? '+' + index6.diff : index6.diff}</div>
        <div className={styles.subPercent}>{index6.diffPercent > 0 ? '+' + index6.diffPercent : index6.diffPercent}%</div>
      </div>
    </div >
  );
});

export default App;
