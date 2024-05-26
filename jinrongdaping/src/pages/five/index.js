import { useEffect, useState, memo, useRef } from "react";
import styles from "./index.module.scss";

const App = memo(function App({ show }) {

  return (
    <div className={styles.wrap} style={{ display: show ? 'block' : 'none' }}>
      <iframe
        src={"https://financeun.com/"}
        className={styles.iframe}
        width={7360}
        height={7070}
      // onLoad={function () {
      //     setLoading(false)
      // }}
      ></iframe>
    </div>
  );
});

export default App;
