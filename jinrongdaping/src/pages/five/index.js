import { useEffect, useState, memo, useRef } from "react";
import styles from "./index.module.scss";

const App = memo(function App() {

  return (
    <div className={styles.wrap}>
      <iframe
        src={"https://fininfov.cnfic.com.cn/shareScreen/eyJzY3JlZW5JZCI6NzAwMTd9"}
        className={styles.iframe}
        width={3956}
        height={3784}
      // onLoad={function () {
      //     setLoading(false)
      // }}
      ></iframe>
    </div>
  );
});

export default App;
