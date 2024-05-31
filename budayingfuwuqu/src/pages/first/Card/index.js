import { useEffect, useState, memo, useRef } from "react";
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
// import 'swiper/css/pagination';

import styles from "./index.module.scss";
import cardBg from '../../../asset/first/上证指数背景.png';

import LineChart from '../LineChart';

const columns = 'close,date,high,low,open,ticker,volume,amount';

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
    const swiperRef = useRef();
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
        <Swiper
            className={styles.swiper}
            slidesPerView={1}
            // spaceBetween={50}
            // pagination={{
            //     clickable: true,
            // }}
            modules={[Autoplay]}
            onInit={(swiper) => {
                swiperRef.current = swiper;
            }}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
        >
            <SwiperSlide>
                <div className={styles.card1}>
                    <img src={cardBg}></img>
                    <div className={styles.title}>{data[0]}</div>
                    <div className={styles.point} style={{ backgroundColor: data1.diff > 0 ? 'rgb(230, 79, 39)' : 'rgb(88, 108, 246)' }}></div>
                    <div className={styles.value}>{data1.value}</div>
                    <div className={styles.diff}>{data1.diff > 0 ? '+' + data1.diff : data1.diff}</div>
                    <div className={styles.diffPercent}>{data1.diffPercent > 0 ? '+' + data1.diffPercent : data1.diffPercent}%</div>
                    <div className={styles.open}><span className={styles.type}>今&nbsp;&nbsp;&nbsp;开</span>&nbsp;&nbsp;&nbsp;{data1.open}</div>
                    <div className={styles.highest}><span className={styles.type}>最&nbsp;&nbsp;&nbsp;高</span>&nbsp;&nbsp;&nbsp;{data1.highest}</div>
                    <div className={styles.yesterday}><span className={styles.type}>昨&nbsp;&nbsp;&nbsp;收</span>&nbsp;&nbsp;&nbsp;{data1.yesterday}</div>
                    <div className={styles.lowest}><span className={styles.type}>最&nbsp;&nbsp;&nbsp;低</span>&nbsp;&nbsp;&nbsp;{data1.lowest}</div>
                    <div className={styles.liang}><span className={styles.type}>成交量</span>&nbsp;&nbsp;&nbsp;{data1.volume}亿</div>
                    <div className={styles.volume}><span className={styles.type}>成交额</span>&nbsp;&nbsp;&nbsp;{data1.amount}亿</div>
                    <div className={styles.amplitude}><span className={styles.type}>振&nbsp;&nbsp;&nbsp;幅</span>&nbsp;&nbsp;&nbsp;{data1.amplitude}</div>
                    <div className={styles.changes}><span className={styles.type}>涨跌额</span>&nbsp;&nbsp;&nbsp;{data1.changes}</div>
                    <div className={styles.changePercent}><span className={styles.type}>涨跌幅</span>&nbsp;&nbsp;&nbsp;{data1.changePercent}%</div>
                    <LineChart code="000001" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.card2}>
                    <img src={cardBg}></img>
                    <div className={styles.title}>{data[1]}</div>
                    <div className={styles.point} style={{ backgroundColor: data2.diff > 0 ? 'rgb(230, 79, 39)' : 'rgb(88, 108, 246)' }}></div>
                    <div className={styles.value}>{data2.value}</div>
                    <div className={styles.diff}>{data2.diff > 0 ? '+' + data2.diff : data2.diff}</div>
                    <div className={styles.diffPercent}>{data2.diffPercent > 0 ? '+' + data2.diffPercent : data2.diffPercent}%</div>
                    <div className={styles.open}><span className={styles.type}>今&nbsp;&nbsp;&nbsp;开</span>&nbsp;&nbsp;&nbsp;{data2.open}</div>
                    <div className={styles.highest}><span className={styles.type}>最&nbsp;&nbsp;&nbsp;高</span>&nbsp;&nbsp;&nbsp;{data2.highest}</div>
                    <div className={styles.yesterday}><span className={styles.type}>昨&nbsp;&nbsp;&nbsp;收</span>&nbsp;&nbsp;&nbsp;{data2.yesterday}</div>
                    <div className={styles.lowest}><span className={styles.type}>最&nbsp;&nbsp;&nbsp;低</span>&nbsp;&nbsp;&nbsp;{data2.lowest}</div>
                    <div className={styles.liang}><span className={styles.type}>成交量</span>&nbsp;&nbsp;&nbsp;{data2.volume}亿</div>
                    <div className={styles.volume}><span className={styles.type}>成交额</span>&nbsp;&nbsp;&nbsp;{data2.amount}亿</div>
                    <div className={styles.amplitude}><span className={styles.type}>振&nbsp;&nbsp;&nbsp;幅</span>&nbsp;&nbsp;&nbsp;{data2.amplitude}</div>
                    <div className={styles.changes}><span className={styles.type}>涨跌额</span>&nbsp;&nbsp;&nbsp;{data2.changes}</div>
                    <div className={styles.changePercent}><span className={styles.type}>涨跌幅</span>&nbsp;&nbsp;&nbsp;{data2.changePercent}%</div>
                    <LineChart code="399001" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.card3}>
                    <img src={cardBg}></img>
                    <div className={styles.title}>{data[2]}</div>
                    <div className={styles.point} style={{ backgroundColor: data3.diff > 0 ? 'rgb(230, 79, 39)' : 'rgb(88, 108, 246)' }}></div>
                    <div className={styles.value}>{data3.value}</div>
                    <div className={styles.diff}>{data3.diff > 0 ? '+' + data3.diff : data3.diff}</div>
                    <div className={styles.diffPercent}>{data3.diffPercent > 0 ? '+' + data3.diffPercent : data3.diffPercent}%</div>
                    <div className={styles.open}><span className={styles.type}>今&nbsp;&nbsp;&nbsp;开</span>&nbsp;&nbsp;&nbsp;{data3.open}</div>
                    <div className={styles.highest}><span className={styles.type}>最&nbsp;&nbsp;&nbsp;高</span>&nbsp;&nbsp;&nbsp;{data3.highest}</div>
                    <div className={styles.yesterday}><span className={styles.type}>昨&nbsp;&nbsp;&nbsp;收</span>&nbsp;&nbsp;&nbsp;{data3.yesterday}</div>
                    <div className={styles.lowest}><span className={styles.type}>最&nbsp;&nbsp;&nbsp;低</span>&nbsp;&nbsp;&nbsp;{data3.lowest}</div>
                    <div className={styles.liang}><span className={styles.type}>成交量</span>&nbsp;&nbsp;&nbsp;{data3.volume}亿</div>
                    <div className={styles.volume}><span className={styles.type}>成交额</span>&nbsp;&nbsp;&nbsp;{data3.amount}亿</div>
                    <div className={styles.amplitude}><span className={styles.type}>振&nbsp;&nbsp;&nbsp;幅</span>&nbsp;&nbsp;&nbsp;{data3.amplitude}</div>
                    <div className={styles.changes}><span className={styles.type}>涨跌额</span>&nbsp;&nbsp;&nbsp;{data3.changes}</div>
                    <div className={styles.changePercent}><span className={styles.type}>涨跌幅</span>&nbsp;&nbsp;&nbsp;{data3.changePercent}%</div>
                    <LineChart code="399006" />
                </div>
            </SwiperSlide>
        </Swiper>
    );
});

export default App;
