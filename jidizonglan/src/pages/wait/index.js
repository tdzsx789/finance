import { useEffect, useRef, memo, useMemo } from "react";
import styles from "./index.module.scss";
import videoUrl from '../../asset/videos/基地总览待机.mp4'

const App = memo(function App({ handleClick, show }) {
    const videoRef = useRef();

    useEffect(function () {
        if (show) {
            videoRef.current.play();
        } else {
            videoRef.current.currentTime = 0;
            videoRef.current.pause();
        }
    }, [show])

    return (
        <div
            className={styles.wrap}
            onClick={handleClick}
            style={{ display: show ? 'block' : 'none' }}
        >
            <video
                ref={videoRef}
                src={videoUrl}
                className={styles.video}
                autoPlay
                loop
                muted
            ></video>
        </div>
    );
})

export default App;