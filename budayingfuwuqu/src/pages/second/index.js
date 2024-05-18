import { useEffect, useState, memo, useMemo } from "react";
import styles from "./index.module.scss";
import Iframe from '../../components/iframe';
import Publiser from '../../components/publiser';

import backImg from '../../asset/second/返回.png';

const App = memo(function App({ data, handleBack }) {
    return (
        <div className={styles.wrap}>
            {data === 1 && <Publiser></Publiser>}
            {data === 3 && <Iframe></Iframe>}
            <img src={backImg} className={styles.back} onClick={handleBack}></img>
        </div>
    );
})

export default App;