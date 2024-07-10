import { useEffect, useState, memo, useRef } from "react";
import styles from "./index.module.scss";

import back from '../../asset/second/返回.png';
import close from '../../asset/second/关闭.png';
import startUrl from './入场动画.mp4';
import loopUrl from './循环动画.mp4';
// import buttonBg from './导航.png';
// import selectBg from './选中色块.png';

// import img from './111.png';

// const buttons = ['基地活动总览', '分类一', '分类二', '分类三'];
// const widths = [26, 24, 24, 26];
// const images = [1, 1, 1, 1, 1];

const App = memo(function App({ handleBack }) {
    const [wait, setWait] = useState(true);
    const [modal, setModal] = useState(null);
    const [images, setImages] = useState([]);
    // const [select, setSelect] = useState(0);

    async function getImages() {
        console.log('www', window.electron)
        if (window.electron && window.electron.readDirectory) {
            const files = await window.electron.readDirectory('/images');
            console.log('filesfilesfiles', files)
            setImages(files);
        }
    }

    useEffect(function () {
        getImages();
    }, [])

    console.log('images', images)

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
                <div className={styles.scrollWrap}>
                    {images.map((ele, i) => {
                        return <img key={`images_${i}`} className={styles.img} src={ele}></img>
                    })}
                </div>
                {/* <div className={styles.buttonWrap}>
                    <img src={buttonBg}></img>
                    <div className={styles.buttons}>
                        {buttons.map((ele, i) => {
                            return <div
                                key={ele}
                                className={styles.select}
                                style={select === i ? { backgroundImage: `url(${selectBg})`, width: `${widths[i]}%` } : { width: `${widths[i]}%` }}
                                onClick={function () {
                                    setSelect(i);
                                }}
                            >{ele}</div>
                        })}
                    </div>
                </div> */}
                <img className={styles.back} src={back} onClick={handleBack}></img>
                {modal && <div className={styles.modalBg}>
                    <img src={modal} className={styles.modal}></img>
                    <img
                        src={close}
                        className={styles.close}
                        onClick={function () {
                            setModal(null);
                        }}></img>
                </div>}
            </div>
        </div>
    );
})

export default App;