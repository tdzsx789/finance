import { useEffect, useState, memo, useRef } from "react";
import styles from "./index.module.scss";

import subImage from '../../asset/third/二级产业大数据.jpg';
import image from '../../asset/third/二级八大产业园总览.jpg';

const App = memo(function App({ show, sub }) {

  return (
    <div className={styles.wrap} style={{ display: show ? 'block' : 'none', backgroundImage: `url(${sub ? subImage : image})` }}></div>
  );
});

export default App;
