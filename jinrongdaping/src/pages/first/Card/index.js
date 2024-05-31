import { useEffect, useState, memo, useRef } from "react";
import axios from 'axios';
import styles from "./index.module.scss";
import cardBg from '../../../asset/first/大卡片.png';
import { columns } from '../index';

const originParams = {
    value: '',
    diff: '',
    diffPercent: '',
    open: '',
    highest: '',
    yesterday: '',
    lowest: '',
    volume: '',
    amount: '',
    amplitude: '',
    changes: '',
    changePercent: ''
}

const App = memo(function App({ data }) {
    const [data1, setData1] = useState(originParams);
    const [data2, setData2] = useState(originParams);
    const [data3, setData3] = useState(originParams);

    const getIndexData = async (country, code, func) => {
        const _indexData = await axios.get(`/api/fin/index/${country}/daily/realtime?token=c15cc49a21dc4ecaaff430fafc128532&ticker=${code}&order=2&columns=${columns}`);
        const _dailyData = await axios.get(`/api/fin/index/${country}/daily?token=c15cc49a21dc4ecaaff430fafc128532&ticker=${code}&order=2&limit=1&columns=${columns}`);
        if (_indexData.data.data && _dailyData.data.data && _indexData.data.data.length > 0 && _dailyData.data.data.length > 0) {
            const _result = getNewData(_indexData.data.data[0], _dailyData.data.data[0]);
            func(_result);
        }
    }

    useEffect(() => {
        getIndexData('CHN', '000001', setData1);
        getIndexData('CHN', '399001', setData2);
        getIndexData('CHN', '399006', setData3);
        const interval = setInterval(function () {
            getIndexData('CHN', '000001', setData1);
            getIndexData('CHN', '399001', setData2);
            getIndexData('CHN', '399006', setData3);
        }, 1000)
        return () => {
            clearInterval(interval);
        }
    }, [])

    function getNewData(_today, _yesterday) {
        return {
            value: getNumber(_today.close),
            diff: getNumber(_today.close - _yesterday.close),
            diffPercent: getNumber((_today.close - _yesterday.close) / _yesterday.close * 100),
            open: _today.open,
            highest: _today.high,
            yesterday: _yesterday.close,
            lowest: _today.low,
            volume: getNumber(_today.volume / 100000000),
            amount: getNumber(_today.amount / 100000000),
            amplitude: getNumber((_today.high - _today.low) / _yesterday.close * 100),
            changes: getNumber(_today.close - _yesterday.close),
            changePercent: getNumber((_today.close - _yesterday.close) / _yesterday.close * 100)
        }
    }

    function getNumber(_value) {
        return Math.round(_value * 100) / 100;
    }

    return (
        <>
            <div className={styles.card1}>
                <img src={cardBg}></img>
                <div className={styles.title}>{data[0]}</div>
                <div className={styles.point} style={{ backgroundColor: data1.diff > 0 ? 'rgb(230, 79, 39)' : 'rgb(88, 108, 246)' }}></div>
                <div className={styles.value}>{data1.value}</div>
                <div className={styles.diff}>{data1.diff > 0 ? '+' + data1.diff : data1.diff}</div>
                <div className={styles.diffPercent}>{data1.diffPercent > 0 ? '+' + data1.diffPercent : data1.diffPercent}%</div>
                <div className={styles.open}>{data1.open}</div>
                <div className={styles.highest}>{data1.highest}</div>
                <div className={styles.yesterday}>{data1.yesterday}</div>
                <div className={styles.lowest}>{data1.lowest}</div>
                <div className={styles.liang}>{data1.volume}亿</div>
                <div className={styles.volume}>{data1.amount}亿</div>
                <div className={styles.amplitude}>{data1.amplitude}</div>
                <div className={styles.changes}>{data1.changes}</div>
                <div className={styles.changePercent}>{data1.changePercent}%</div>
            </div>
            <div className={styles.card2}>
                <img src={cardBg}></img>
                <div className={styles.title}>{data[1]}</div>
                <div className={styles.point} style={{ backgroundColor: data2.diff > 0 ? 'rgb(230, 79, 39)' : 'rgb(88, 108, 246)' }}></div>
                <div className={styles.value}>{data2.value}</div>
                <div className={styles.diff}>{data2.diff > 0 ? '+' + data2.diff : data2.diff}</div>
                <div className={styles.diffPercent}>{data2.diffPercent > 0 ? '+' + data2.diffPercent : data2.diffPercent}%</div>
                <div className={styles.open}>{data2.open}</div>
                <div className={styles.highest}>{data2.highest}</div>
                <div className={styles.yesterday}>{data2.yesterday}</div>
                <div className={styles.lowest}>{data2.lowest}</div>
                <div className={styles.liang}>{data2.volume}亿</div>
                <div className={styles.volume}>{data2.amount}亿</div>
                <div className={styles.amplitude}>{data2.amplitude}</div>
                <div className={styles.changes}>{data2.changes}</div>
                <div className={styles.changePercent}>{data2.changePercent}%</div>
            </div>
            <div className={styles.card3}>
                <img src={cardBg}></img>
                <div className={styles.title}>{data[2]}</div>
                <div className={styles.point} style={{ backgroundColor: data3.diff > 0 ? 'rgb(230, 79, 39)' : 'rgb(88, 108, 246)' }}></div>
                <div className={styles.value}>{data3.value}</div>
                <div className={styles.diff}>{data3.diff > 0 ? '+' + data3.diff : data3.diff}</div>
                <div className={styles.diffPercent}>{data3.diffPercent > 0 ? '+' + data3.diffPercent : data3.diffPercent}%</div>
                <div className={styles.open}>{data3.open}</div>
                <div className={styles.highest}>{data3.highest}</div>
                <div className={styles.yesterday}>{data3.yesterday}</div>
                <div className={styles.lowest}>{data3.lowest}</div>
                <div className={styles.liang}>{data3.volume}亿</div>
                <div className={styles.volume}>{data3.amount}亿</div>
                <div className={styles.amplitude}>{data3.amplitude}</div>
                <div className={styles.changes}>{data3.changes}</div>
                <div className={styles.changePercent}>{data3.changePercent}%</div>
            </div>
        </>
    );
});

export default App;
