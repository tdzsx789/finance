import { useEffect, useRef, memo, useMemo, useState } from "react";
import styles from "./index.module.scss";

import 按钮1 from '../../asset/first/按键1.png';
import 按钮2 from '../../asset/first/按键2.png';
import 按钮3 from '../../asset/first/按键3.png';
import 文字 from '../../asset/first/文字.png';

import videoUrl from './video.mp4';

const App = memo(function App({ handleToSecond, handleToThird, handleToFour }) {
    // const swiperRef = useRef();

    return (
        <div className={styles.wrap}>
            <img
                src={按钮1}
                className={styles.button1}
                onClick={handleToSecond}>
            </img>
            <img
                src={按钮2}
                className={styles.button2}
                onClick={handleToThird}
            ></img>
            <img
                src={按钮3}
                className={styles.button3}
                onClick={handleToFour}
            ></img>
            <img src={文字} className={styles.text}></img>
            <video
                src={videoUrl}
                className={styles.video}
                autoPlay
                loop
                muted
            ></video>
        </div >
    );
})

export default App;