import { useEffect, useRef, memo, useMemo, useState } from "react";
import styles from "./index.module.scss";
import 按钮 from '../../asset/first/按钮.png';
import 上证指数背景 from '../../asset/first/上证指数背景.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import image1 from '../../asset/first/整体切图1.png';
import image2 from '../../asset/first/整体切图2.png';
import buttonImg from '../../asset/first/椭圆2.png';
import maskImg from '../../asset/first/渐变.png';
import buttonsImg from '../../asset/first/按钮.png';
// import lineChartImg from '../../asset/first/折线图.jpg';
// import indexCover from '../../asset/first/上证指数背景.png';
import Card from './Card';

const images = [image1, image2];

const App = memo(function App({ handleClick }) {
    const swiperRef = useRef();

    return (
        <div className={styles.wrap}>
            <Swiper
                className={styles.swiper}
                slidesPerView={1}
                // spaceBetween={50}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                onInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
            >
                {images.map((ele, i) => {
                    return <SwiperSlide key={ele + i}>
                        <img src={ele}></img>
                        <img src={maskImg} className={styles.mask}></img>
                    </SwiperSlide>
                })}
            </Swiper>
            <img src={buttonImg} className={styles.button}></img>
            <img src={buttonsImg} className={styles.buttons}></img>
            <div className={styles.button1} onClick={function () {
                handleClick(1)
            }}></div>
            <div className={styles.button2} onClick={function () {
                // handleClick(2)
            }}></div>
            <div className={styles.button3} onClick={function () {
                handleClick(3)
            }}></div>
            {/* <img src={lineChartImg} className={styles.lineChart}></img> */}
            <Card data={['上证指数', '深圳成指', '创业版']} />
            {/* <img src={indexCover} className={styles.indexCover}></img> */}
            {/* <img className={styles.button} src={按钮}></img>
            <img className={styles.zhishuBg} src={上证指数背景}></img> */}
        </div >
    );
})

export default App;