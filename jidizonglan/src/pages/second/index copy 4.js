import { useEffect, useState, memo, useRef } from "react";
import styles from "./index.module.scss";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import back from '../../asset/second/返回.png';
import close from '../../asset/second/关闭.png';
import splice1 from '../../asset/second/整体切图.png';
import splice2 from '../../asset/second/整体切图2.png';
import splice3 from '../../asset/second/整体切图3.png';

import startUrl from './入场动画.mp4';
import loopUrl from './循环动画.mp4';

import 建设科创金融展厅 from './tooltip/建设科创金融展厅.png';
import 搭建科创金融线上平台 from './tooltip/搭建科创金融线上平台.png';
import 设立企业上市服务中心 from './tooltip/设立企业上市服务中心.png';
import 设立上市公司服务中心 from './tooltip/设立上市公司服务中心.png';
import 设立债券融资服务中心 from './tooltip/设立债券融资服务中心.png';
import 设立股权投资服务中心 from './tooltip/设立股权投资服务中心.png';
import 设立科技保险服务中心 from './tooltip/设立科技保险服务中心.png';
import 设立资本市场发展基金 from './tooltip/设立资本市场发展基金.png';

const modalData = [splice3, splice1, splice2];

const list = [
    { name: '设立企业上市服务中心', url: 设立企业上市服务中心 },
    { name: '设立上市公司服务中心', url: 设立上市公司服务中心 },
    { name: '设立股权投资服务中心', url: 设立股权投资服务中心 },
    { name: '建设科创金融展厅', url: 建设科创金融展厅 },
    { name: '搭建科创金融线上平台', url: 搭建科创金融线上平台 },
    { name: '设立债券融资服务中心', url: 设立债券融资服务中心 },
    { name: '设立科技保险服务中心', url: 设立科技保险服务中心 },
    { name: '设立资本市场发展基金', url: 设立资本市场发展基金 },
]

const App = memo(function App({ handleBack }) {
    const swiperRef = useRef();
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
                <Swiper
                    className={styles.swiper}
                    slidesPerView={5}
                    // spaceBetween={50}
                    centeredSlides={true}
                    effect={'coverflow'}
                    initialSlide={3}
                    coverflowEffect={{
                        rotate: 0,
                        depth: 0,
                        stretch: 0,
                        modifier: 1,
                        scale: 0.9,
                        slideShadows: false,
                    }}
                    modules={[EffectCoverflow]}
                    auto
                    onInit={(swiper) => {
                        swiperRef.current = swiper;
                        // const { visibleSlides } = swiperRef.current;
                        // visibleSlides[0].style['margin-top'] = '100px'
                        // console.log('children', visibleSlides)
                    }}
                    onAfterInit={() => {
                    }}
                >
                    {list.map((ele) => {
                        return <SwiperSlide key={ele.name}>
                            <div className={styles.point} src={ele}>
                                <div className={styles.name}>{ele.name}</div>
                            </div>
                        </SwiperSlide>
                    })}
                </Swiper>
                {/* <div
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
                ></div> */}
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