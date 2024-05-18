import { useEffect, useState, memo, useMemo } from "react";
import styles from "./index.module.scss";
import loadImg from '../../asset/loading.webp';

const App = memo(function App() {
    const [loading, setLoading] = useState(true);
    console.log('loading', loading)

    useEffect(function() {
        setTimeout(function() {
            setLoading(false)
        }, 2000)
    }, [])

    return (
        <div className={styles.wrap}>
            {loading && <div className={styles.loadingWrap}>
                <img src={loadImg} className={styles.loadingImg}></img>
            </div>}
            <iframe
                src={"https://www.baidu.com/"}
                className={styles.iframe}
                width={945}
                height={1350}
                // onLoad={function () {
                //     setLoading(false)
                // }}
            ></iframe>
        </div>
    );
})

export default App;