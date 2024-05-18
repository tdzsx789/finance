import { useEffect, useState, memo, useMemo } from "react";
import styles from "./index.module.scss";

import oneUnSelect from '../../asset/third/1F(未选中).png';
import oneSelected from '../../asset/third/1F(选中).png';
import oneBuilding from '../../asset/third/1F轴测.png';
import twoBuilding from '../../asset/third/2F轴测.png';
import twoUnSelect from '../../asset/third/2F（未选中）.png';
import twoSelected from '../../asset/third/2F（选中）.png';
import close from '../../asset/third/关闭2.png';
import splice from '../../asset/third/整体切图2.png';
import splice2 from '../../asset/third/整体切图3.png';
import back from '../../asset/third/返回2.png';

const modalData = [splice, splice2];

const App = memo(function App({ handleBack }) {
    const [select, setSelect] = useState(1);
    const [modal, setModal] = useState(null);

    return (
        <div className={styles.wrap}>
            <img className={styles.back} src={back} onClick={handleBack}></img>
            {select === 1 && <>
                <img src={oneBuilding} className={styles.building}></img>
                <div className={styles.button1} onClick={function () {
                    setModal(1);
                }}></div>
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
                <div className={styles.button2} onClick={function () {
                    setModal(2);
                }}></div>
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
                <img src={modalData[modal - 1]} className={styles.modalBg}></img>
                <img src={close} className={styles.close} onClick={function () {
                    setModal(null);
                }}></img>
            </div>}
        </div>
    );
})

export default App;