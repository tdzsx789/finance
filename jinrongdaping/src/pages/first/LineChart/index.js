import { useEffect, useState, memo, useRef } from "react";
import axios from 'axios';
import * as echarts from 'echarts';
import styles from "./index.module.scss";
import { xAxisData } from './data';

const originOption = {
  grid: {
    left: 0,
    right: 0,
    top: 20,
    bottom: 0
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: xAxisData,
    axisLabel: {
      show: false,
      fontFamily: 'HarmonyOS_Sans_SC_Bold',
      fontSize: 48,
      color: '#fff'
    },
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false
    },
    // max: 0
  },
  series: [
    {
      data: [],
      type: 'line',
      showSymbol: false,
      lineStyle: {
        color: 'rgb(127,144,248)',
        width: 12
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgb(71,89,206)' // 0% 处的颜色 
          }, {
            offset: 1,
            color: 'rgba(71,89,206,0)' // 100% 处的颜色 
          }],
          global: false // 缺省为 false 
        }
      }
    }
  ]
};

const App = memo(function App({ show }) {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const chartRef1 = useRef();
  const chartRef2 = useRef();
  const chartRef3 = useRef();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  useEffect(function () {
    chartRef1.current = echarts.init(ref1.current, "light", {
      renderer: "canvas",
    });
    chartRef2.current = echarts.init(ref2.current, "light", {
      renderer: "canvas",
    });
    chartRef3.current = echarts.init(ref3.current, "light", {
      renderer: "canvas",
    });
  }, [])


  const getData = async (country, code, func) => {
    const _result = await axios.get(`/api/fin/index/${country}/5min/realtime?token=c15cc49a21dc4ecaaff430fafc128532&ticker=${code}`);
    if (_result.data.data && _result.data.data.length > 0) {
      // const _data = _result.data.data.map((ele) => {
      //   const _date = ele.date.split(' ')[1];
      //   return { name: _date, value: ele.close }
      // })
      const _values = _result.data.data.map((ele) => ele.close);
      const _data = _values.reverse();
      // console.log('_data', _data)
      func(_data);
    }
  }

  useEffect(() => {
    getData('CHN', '000001', setData1);
    getData('CHN', '399001', setData2);
    getData('CHN', '399006', setData3);
    const interval = setInterval(function () {
      getData('CHN', '000001', setData1);
      getData('CHN', '399001', setData2);
      getData('CHN', '399006', setData3);
    }, 60000 * 5)
    return () => {
      clearInterval(interval);
    }
  }, [])

  function getOption(_data) {
    const _option = JSON.parse(JSON.stringify(originOption));
    const _max = Math.max(..._data);
    const _min = Math.min(..._data);
    _option.series[0].data = _data;
    _option.yAxis.max = _max;
    _option.yAxis.min = _min;
    return _option;
  }

  useEffect(
    function () {
      const option = getOption(data1);
      chartRef1.current.setOption(option);
    },
    [data1]
  );

  useEffect(
    function () {
      const option = getOption(data2);
      chartRef2.current.setOption(option);
    },
    [data2]
  );

  useEffect(
    function () {
      const option = getOption(data3);
      chartRef3.current.setOption(option);
    },
    [data3]
  );

  return (
    <>
      <div className={styles.chart1} ref={ref1}></div>
      <div className={styles.chart2} ref={ref2}></div>
      <div className={styles.chart3} ref={ref3}></div>
    </>
  );
});

export default App;
