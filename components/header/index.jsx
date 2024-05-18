"use client";

import styles from "./style.module.scss";
import { forwardRef } from "react";
import Brand from "../brand";
import Magnetism from "../magnetism";

const Header = forwardRef(function index(props, ref) {
  return (
    <header className={styles.header}>
      <Brand></Brand>
      <Magnetism>
        <div className={styles.burger}>
          <div ref={ref} className={styles.bounds}></div>
        </div>
      </Magnetism>
    </header>
  );
});

export default Header;
