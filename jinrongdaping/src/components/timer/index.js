import { useEffect, useState, memo, useRef } from "react";
import calendar from "js-calendar-converter";
import styles from "./index.module.scss";

const App = memo(function App() {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState({week: '', date: ''});

  useEffect(() => {
    const _newDate = new Date();
    const _date = calendar.solar2lunar(_newDate);
    setDate({
        week: _date.ncWeek,
        date: _date.date
    })

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.time}>{time.toLocaleTimeString()}</div>
      <div className={styles.date}>{date.date}</div>
      <div className={styles.week}>{date.week}</div>
    </div>
  );
});

export default App;
