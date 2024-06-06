import { useEffect, useState, memo, useRef } from "react";
import styles from "./index.module.scss";

import 矩形1 from '../../asset/second/矩形1.png';
import 矩形2 from '../../asset/second/矩形2.png';
import 政策公开 from '../../asset/second/政策公开.png';
import 选项文字 from '../../asset/second/选项文字.png';

import { publishList } from './data';

const App = memo(function App() {
    const ref = useRef();
    const [showButton, setShowButton] = useState(0);

    const buttons = [
        { left: 12, top: 466 },
        { left: 12, top: 625 },
        { left: 12, top: 775 },
        { left: 12, top: 936 },
    ]

    const clickButtons = [
        { left: 96, top: 484 },
        { left: 96, top: 641 },
        { left: 96, top: 797 },
        { left: 96, top: 953 },
    ]

    return (
        <div className={styles.wrap}>
            <img src={矩形1} className={styles.rect1}></img>
            <img src={矩形2} className={styles.rect2}></img>
            <img src={政策公开} className={styles.text1}></img>
            <img src={选项文字} className={styles.text2}></img>
            <div className={styles.scrollWrap} ref={ref}>
                {publishList[showButton].map((ele, i) => {
                    return <img key={'img' + i} src={ele} className={styles.image}></img>
                })}
            </div>
            {buttons.map((ele, i) => {
                return showButton === i ? <div
                    className={styles.button}
                    style={{ left: ele.left, top: ele.top }}
                    key={'button' + i}
                ></div> : <></>
            })}
            {clickButtons.map((ele, i) => {
                return <div
                    className={styles.clickButton}
                    style={{ left: ele.left, top: ele.top }}
                    key={'clickButtons' + i}
                    onClick={function () {
                        ref.current.scrollTo(0, 0)
                        setShowButton(i)
                    }}></div>
            })}
        </div>
    );
})

export default App;