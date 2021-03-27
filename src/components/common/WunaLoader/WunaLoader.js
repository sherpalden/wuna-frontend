import React from 'react';
import clsx from 'clsx';
import roundLogo from 'images/roundLogo.png';
import styles from './WunaLoader.module.css';

function WunaLoader() {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img
          src={roundLogo}
          alt="logo"
          className={clsx(styles.absoluteCenter, styles.logo)}
        />
        <div className={styles.absoluteCenter}>
          <div className={styles.ring}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div className={styles.pleaseWait}>Please wait</div>
    </div>
  );
}

export default WunaLoader;
