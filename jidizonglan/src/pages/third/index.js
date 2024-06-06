import { useEffect, useState, memo, useMemo } from "react";
import styles from "./index.module.scss";

import oneUnSelect from '../../asset/third/1F(未选中).png';
import oneSelected from '../../asset/third/1F(选中).png';
import oneBuilding from '../../asset/third/1F轴测.png';
import twoBuilding from '../../asset/third/2F轴测.png';
import twoUnSelect from '../../asset/third/2F（未选中）.png';
import twoSelected from '../../asset/third/2F（选中）.png';
import close from '../../asset/third/关闭2.png';
import back from '../../asset/third/返回2.png';

import 服务接待大厅 from '../../asset/third/tooltip/服务接待大厅.png';
import 共享办公室 from '../../asset/third/tooltip/共享办公室.png';
import 贵宾接待室 from '../../asset/third/tooltip/贵宾接待室.png';
import 会议室 from '../../asset/third/tooltip/会议室.png';
import 会议中心 from '../../asset/third/tooltip/会议中心.png';
import 机构办公区 from '../../asset/third/tooltip/机构办公区.png';
import 金融咖啡厅 from '../../asset/third/tooltip/金融咖啡厅.png';
import 科创金融路演大厅 from '../../asset/third/tooltip/科创金融路演大厅.png';
import 科创金融展厅 from '../../asset/third/tooltip/科创金融展厅.png';

import startUrl from './入场动画.mp4';
import loopUrl from './循环动画.mp4';

const modalData = {
    服务接待大厅, 共享办公室, 贵宾接待室, 会议室, 会议中心, 机构办公区, 金融咖啡厅, 科创金融路演大厅, 科创金融展厅
};

const buiding1List = [
    { name: '科创金融展厅', width: 590, left: 250, top: 1928 },
    { name: '金融咖啡厅', width: 666, left: 1588, top: 2210 },
    { name: '共享办公室', width: 650, left: 1260, top: 1950 },
    { name: '机构办公区', width: 850, left: 1360, top: 1679 },
    { name: '服务接待大厅', width: 866, left: 331, top: 2318 },
]

const building2List = [
    { name: '会议室', width:  590, left: 190, top: 1720 },
    { name: '科创金融路演大厅', width: 866, left: 304, top: 2180 },
    { name: '贵宾接待室', width: 535, left: 1742, top: 2322 },
    { name: '会议中心', width: 844, left: 504, top: 2567 },
]

const App = memo(function App({ handleBack }) {
    const [select, setSelect] = useState(1);
    const [modal, setModal] = useState(null);
    const [wait, setWait] = useState(true);

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
                <img className={styles.back} src={back} onClick={handleBack}></img>
                {select === 1 && <>
                    <img src={oneBuilding} className={styles.building}></img>
                    {buiding1List.map((ele) => {
                        return <div
                            key={ele.name}
                            style={{ left: ele.left, top: ele.top, width: ele.width }}
                            className={styles.button}
                            onClick={function () {
                                setModal(ele.name)
                            }}
                        ></div>
                    })}
                    {/* <div className={styles.button1} onClick={function () {
                        setModal(1);
                    }}></div> */}
                    <img
                        src={oneSelected}
                        className={styles.oneSelect1}
                    ></img>
                    <img
                        src={twoUnSelect}
                        className={styles.oneSelect2}
                        onClick={function () {
                            setSelect(2);
                        }}
                    ></img>
                </>}
                {select === 2 && <>
                    <img src={twoBuilding} className={styles.building2}></img>
                    {building2List.map((ele) => {
                        return <div
                            key={ele.name}
                            style={{ left: ele.left, top: ele.top, width: ele.width }}
                            className={styles.button}
                            onClick={function () {
                                setModal(ele.name)
                            }}
                        ></div>
                    })}
                    <img
                        src={oneUnSelect}
                        className={styles.twoSelect1}
                        onClick={function () {
                            setSelect(1);
                        }}
                    ></img>
                    <img
                        src={twoSelected}
                        className={styles.twoSelect2}
                    ></img>
                </>}
                {modal && <div className={styles.modal}>
                    <img src={modalData[modal]} className={styles.modalBg}></img>
                    <img src={close} className={styles.close} onClick={function () {
                        setModal(null);
                    }}></img>
                </div>}
            </div>
        </div>
    );
})

export default App;