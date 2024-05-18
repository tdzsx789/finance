import { useEffect, useState, memo, useMemo } from "react";
import styles from "./index.module.scss";

const App = memo(function App({ handleClick }) {
    return (
        <div className={styles.wrap} onClick={handleClick}></div>
    );
})

export default App;