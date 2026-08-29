import React from "react";
import { Link } from "react-router-dom";
import styles from "../AuctionDraftHome.module.css";

const LINKS = {
  youtube: "https://www.youtube.com/@mriveragg",
  googlePlay: "https://play.google.com/store/apps/dev?id=8276397884817662642&utm_source=emea_Med",
  linkedin: "https://www.linkedin.com/in/mikel-rivera-guerrero-801248295/",
  github: "https://github.com/MRiveraGuerrero"
};

export default function AuctionDraftFooter({ lang }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.footerContent}>
          <div>
            <div className={styles.footerBrand}>Auction Draft</div>
            <div className={styles.footerCopy}>© 2026 Mikel Rivera Guerrero. All rights reserved.</div>

            <div className={styles.socialButtons}>
              <a href={LINKS.googlePlay} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                Google Play
              </a>
              <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                YouTube
              </a>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                GitHub
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                LinkedIn
              </a>
            </div>
          </div>

          <ul className={styles.footerLinks}>
            <li>
              <Link to="/auctiondraft/privacy" className={styles.footerLink}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/auctiondraft/terms" className={styles.footerLink}>
                Terms & Conditions
              </Link>
            </li>
            <li>
              <a href="mailto:mikelrg2003@gmail.com" className={styles.footerLink}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
