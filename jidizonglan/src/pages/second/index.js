import { useEffect, useState, memo, useMemo } from "react";
import styles from "./index.module.scss";

import back from '../../asset/second/返回.png';
import close from '../../asset/second/关闭.png';
import splice1 from '../../asset/second/整体切图.png';
import splice2 from '../../asset/second/整体切图2.png';
import splice3 from '../../asset/second/整体切图3.png';
import buttons from '../../asset/second/buttons.jpg';

import startUrl from './入场动画.mp4';
import loopUrl from './循环动画.mp4';

const modalData = [splice3, splice1, splice2];

const App = memo(function App({ handleBack }) {
    const [wait, setWait] = useState(true);
    const [modal, setModal] = useState(null);

    return (
        <div className={styles.wrap}>
            {wait && <video
                src={startUrl}
                className={styles.waitVideo}
                autoPlay
                muted
                onEnded={function () {
                    setWait(false);
                }}
            ></video>}
            <div className={styles.container}>
                <video
                    src={loopUrl}
                    className={styles.loopVideo}
                    autoPlay
                    muted
                    loop
                ></video>
                {/* <img src={buttons} className={styles.button}></img> */}
                <div
                    className={styles.button1}
                    onClick={function () {
                        setModal(1);
                    }}
                ></div>
                <div
                    className={styles.button2}
                    onClick={function () {
                        setModal(2);
                    }}
                ></div>
                <div
                    className={styles.button3}
                    onClick={function () {
                        setModal(3);
                    }}
                ></div>
                <img className={styles.back} src={back} onClick={handleBack}></img>
                {modal && <div className={styles.modal}>
                    <img src={modalData[modal - 1]} className={styles.modalBg}></img>
                    <img src={close} className={styles.close} onClick={function () {
                        setModal(null);
                    }}></img>
                </div>}
            </div>
        </div>
    );
})

export default App;