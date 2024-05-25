import { useEffect, useState, memo, useRef } from "react";
import styles from "./index.module.scss";
import Time from '../../components/timer';

const App = memo(function App({ show }) {

  return (
    <div className={styles.wrap} style={{ display: show ? 'block' : 'none' }}>
      <Time />
    </div>
  );
});

export default App;
