import { useEffect, useState, memo, useRef } from "react";
import axios from "axios";
import * as echarts from "echarts";
import styles from "./index.module.scss";
import { xAxisData } from "./data";
import lineImg from "../../../asset/first/走势.png";
import { url } from "../config";

const originOption = {
  grid: {
    left: 0,
    right: 0,
    top: 20,
    bottom: 0,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: xAxisData,
    axisLabel: {
      show: false,
      fontFamily: "HarmonyOS_Sans_SC_Bold",
      fontSize: 48,
      color: "#fff",
    },
  },
  yAxis: {
    type: "value",
    splitLine: {
      show: false,
    },
    // max: 0
  },
  series: [
    {
      data: [],
      type: "line",
      showSymbol: false,
      lineStyle: {
        color: "rgb(127,144,248)",
        width: 4,
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgb(71,89,206)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(71,89,206,0)", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
  ],
  animationDuration: 3000,
};

const App = memo(function App({ code }) {
  const ref1 = useRef();
  const chartRef1 = useRef();
  const [data1, setData1] = useState([]);

  useEffect(function () {
    chartRef1.current = echarts.init(ref1.current, "light", {
      renderer: "canvas",
    });
  }, []);

  const getData = async (country, _code, func) => {
    const _result = await axios.get(
      `${url}/fin/index/${country}/5min/realtime?token=c15cc49a21dc4ecaaff430fafc128532&ticker=${_code}`
    );
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
  };

  useEffect(() => {
    getData("CHN", code, setData1);
    const interval = setInterval(function () {
      getData("CHN", "000001", setData1);
    }, 60000 * 5);
    return () => {
      clearInterval(interval);
    };
  }, [code]);

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

  return (
    <>
      <div className={styles.chart1} ref={ref1}></div>
      <img className={styles.lineImg} src={lineImg}></img>
    </>
  );
});

export default App;
