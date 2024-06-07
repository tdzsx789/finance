import { useEffect, useState, memo, useRef } from "react";
import styles from "./index.module.scss";

import subImage from '../../asset/second/二级城市大数据.jpg';
import image from '../../asset/second/二级城市大数据总览.jpg';

const App = memo(function App({ sub }) {
  return (
    <div className={styles.wrap} style={{ backgroundImage: `url(${sub ? subImage : image})` }}></div>
  );
});

export default App;
