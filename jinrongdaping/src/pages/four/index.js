import { useEffect, useState, memo, useRef } from "react";
import styles from "./index.module.scss";

const App = memo(function App({ show }) {

  return (
    <div className={styles.wrap} style={{ display: show ? 'block' : 'none' }}></div>
  );
});

export default App;
