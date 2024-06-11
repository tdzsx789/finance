import { useEffect, useState, memo, useRef } from "react";
import styles from "./index.module.scss";

import videoUrl from './武汉新城十大重点项目_1.mp4';

const App = memo(function App() {

  return (
    <div className={styles.wrap}>
      <video
        src={videoUrl}
        className="video"
        autoPlay
        loop
        muted
      ></video>
    </div>
  );
});

export default App;
