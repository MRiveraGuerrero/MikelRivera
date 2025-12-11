import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerBackground}>
                <div className={styles.streetTexture}></div>
            </div>

            <div className={styles.footerContent}>
                <div className={styles.footerTop}>
                    <div className={styles.footerLogo}>
                        <span className={styles.logoMain}>LM</span>
                        <span className={styles.logoSub}>LEGADO DE LA MUERTE</span>
                    </div>

                    <div className={styles.footerSocial}>
                        <a href="#" className={styles.socialLink}>
                            <span>IG</span>
                        </a>
                        <a href="#" className={styles.socialLink}>
                            <span>YT</span>
                        </a>
                        <a href="#" className={styles.socialLink}>
                            <span>TW</span>
                        </a>
                        <a href="#" className={styles.socialLink}>
                            <span>SP</span>
                        </a>
                    </div>
                </div>

                <div className={styles.footerDivider}></div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        © 2024 LEGADO DE LA MUERTE · BROTHERHOOD · CHAOS · MUSIC
                    </p>
                    <div className={styles.footerDoodles}>
                        <span className={styles.doodle}>★</span>
                        <span className={styles.doodle}>💀</span>
                        <span className={styles.doodle}>⚡</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
