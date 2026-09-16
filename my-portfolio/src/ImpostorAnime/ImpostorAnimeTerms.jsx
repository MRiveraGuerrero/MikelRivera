import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ImpostorAnimeTerms.module.css";

export default function ImpostorAnimeTerms() {
  useEffect(() => {
    document.title = "Impostor Anime - Terms of Use";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Official Terms of Use for the mobile game Impostor Anime by Mikel Rivera Guerrero."
    );

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", "Impostor Anime - Terms of Use");

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute(
      "content",
      "Read the Terms of Use for playing Impostor Anime."
    );
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Header */}
        <header className={styles.headerCard}>
          <div className={styles.topBar}>
            <div className={styles.badgeGroup}>
              <span className={styles.appBadge}>Impostor Anime</span>
              <span className={styles.termsBadge}>Terms of Use</span>
            </div>
          </div>

          <h1 className={styles.mainTitle}>
            Terms of <span className={styles.titleGlow}>Use</span>
          </h1>

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <strong>Last updated:</strong> September 16, 2026
            </div>
            <div className={styles.metaItem}>
              <strong>Developer:</strong> Mikel Rivera Guerrero
            </div>
            <div className={styles.metaItem}>
              <strong>Location:</strong> Spain
            </div>
          </div>
        </header>

        {/* Table of Contents */}
        <nav className={styles.tocCard} aria-label="Terms of use table of contents">
          <h2 className={styles.tocTitle}>Table of Contents</h2>
          <ul className={styles.tocGrid}>
            <li><a href="#acceptance" className={styles.tocLink}>1. Terms of Use</a></li>
            <li><a href="#about-app" className={styles.tocLink}>2. About the App</a></li>
            <li><a href="#eligibility" className={styles.tocLink}>3. Eligibility & Use</a></li>
            <li><a href="#license" className={styles.tocLink}>4. License</a></li>
            <li><a href="#prohibited-uses" className={styles.tocLink}>5. Prohibited Uses</a></li>
            <li><a href="#purchases" className={styles.tocLink}>6. In-App Purchases</a></li>
            <li><a href="#restoring-purchases" className={styles.tocLink}>7. Restoring Purchases</a></li>
            <li><a href="#ip-app" className={styles.tocLink}>8. Intellectual Property (App)</a></li>
            <li><a href="#third-party-ip" className={styles.tocLink}>9. Third-Party IP Notice</a></li>
            <li><a href="#user-conduct" className={styles.tocLink}>10. User Conduct</a></li>
            <li><a href="#availability" className={styles.tocLink}>11. Availability & Updates</a></li>
            <li><a href="#disclaimer" className={styles.tocLink}>12. Disclaimer</a></li>
            <li><a href="#limitation-liability" className={styles.tocLink}>13. Limitation of Liability</a></li>
            <li><a href="#privacy" className={styles.tocLink}>14. Privacy Policy Link</a></li>
            <li><a href="#changes" className={styles.tocLink}>15. Changes to Terms</a></li>
            <li><a href="#governing-law" className={styles.tocLink}>16. Governing Law</a></li>
            <li><a href="#contact" className={styles.tocLink}>17. Contact Information</a></li>
          </ul>
        </nav>

        {/* Main Content Card */}
        <main className={styles.contentCard}>

          {/* 1. Terms of Use */}
          <section id="acceptance" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>1.</span> Terms of Use
            </h2>
            <p className={styles.paragraph}>
              By downloading, installing, or playing the mobile game <strong>Impostor Anime</strong> (the "App"), you agree to be bound by these Terms of Use, subject to any applicable mandatory consumer protection laws in your jurisdiction.
            </p>
            <p className={styles.paragraph}>
              If you do not agree with these Terms of Use, please do not download, install, or use the application.
            </p>
          </section>

          {/* 2. About the App */}
          <section id="about-app" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>2.</span> About the App
            </h2>
            <p className={styles.paragraph}>
              Impostor Anime is an independent local party game developed by <strong>Mikel Rivera Guerrero</strong>.
            </p>
            <p className={styles.paragraph}>
              Users may play the game with other people using the supported local gameplay modes offered by the application on a single device or through supported local features.
            </p>
          </section>

          {/* 3. Eligibility and Responsible Use */}
          <section id="eligibility" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>3.</span> Eligibility and Responsible Use
            </h2>
            <p className={styles.paragraph}>
              You agree to use the application lawfully, responsibly, and in full compliance with these Terms and applicable App Store or Google Play rules.
            </p>
            <p className={styles.paragraph}>
              If you are under the age required to enter into binding agreements in your country of residence, you should review these Terms with a parent or legal guardian.
            </p>
          </section>

          {/* 4. License */}
          <section id="license" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>4.</span> License
            </h2>
            <p className={styles.paragraph}>
              The developer grants you a limited, personal, non-exclusive, non-transferable, revocable license to download, install, and execute Impostor Anime for your personal, non-commercial entertainment purposes, subject to applicable platform terms (such as Apple's App Store Terms of Service).
            </p>
            <p className={styles.paragraph}>
              All rights, titles, and ownership interests in and to the application itself remain strictly with the developer.
            </p>
          </section>

          {/* 5. Prohibited Uses */}
          <section id="prohibited-uses" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>5.</span> Prohibited Uses
            </h2>
            <p className={styles.paragraph}>
              When using Impostor Anime, you agree not to engage in any of the following prohibited activities:
            </p>
            <ul className={styles.bulletList}>
              <li>Attempting to interfere with, disrupt, or compromise the security or integrity of the application.</li>
              <li>Reverse engineering, decompiling, or disassembling the App's source code, except where such restriction is prohibited by applicable law.</li>
              <li>Exploiting bugs, glitches, or vulnerabilities to disrupt services or bypass digital locks.</li>
              <li>Using the application for any illegal, unauthorized, or fraudulent purpose.</li>
              <li>Attempting unauthorized access to backend systems, infrastructure, or connected network endpoints.</li>
            </ul>
            <p className={styles.paragraph}>
              Nothing in this section restricts mandatory statutory user rights guaranteed by law.
            </p>
          </section>

          {/* 6. In-App Purchases */}
          <section id="purchases" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>6.</span> In-App Purchases
            </h2>
            <p className={styles.paragraph}>
              Impostor Anime may offer optional in-app purchases (such as content packs or ad removal).
            </p>
            <p className={styles.paragraph}>
              On iOS devices, all transactions are processed securely by Apple through the App Store. Prices, payment conditions, and currency specifications displayed by Apple at the time of purchase apply.
            </p>
            <p className={styles.paragraph}>
              In-app purchases may be subject to Apple's own terms and conditions. Refund requests for Apple store transactions are generally handled through Apple's purchase systems and subject to applicable statutory consumer rights.
            </p>
          </section>

          {/* 7. Restoring Purchases */}
          <section id="restoring-purchases" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>7.</span> Restoring Purchases
            </h2>
            <p className={styles.paragraph}>
              Eligible non-consumable digital purchases can generally be restored on supported devices signed into the same App Store account through the application's built-in "Restore Purchases" functionality, where applicable.
            </p>
          </section>

          {/* 8. Intellectual Property – Impostor Anime */}
          <section id="ip-app" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>8.</span> Intellectual Property – Impostor Anime
            </h2>
            <p className={styles.paragraph}>
              All original software code, user interface designs, original graphics, written content, branding elements, layouts, and original assets comprising Impostor Anime are owned by <strong>Mikel Rivera Guerrero</strong> or used with appropriate authorization.
            </p>
          </section>

          {/* 9. Third-Party Names, Characters, Works and Trademarks */}
          <section id="third-party-ip" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>9.</span> Third-Party Names, Characters, Works and Trademarks
            </h2>
            
            <div className={styles.ipBox}>
              <p className={styles.ipParagraph}>
                Impostor Anime may make nominal references to third-party works, fictional characters, franchises, titles, companies or trademarks for identification, categorization, commentary or gameplay purposes.
              </p>
              <p className={styles.ipParagraph}>
                Such references are textual/name-based references only.
              </p>
              <p className={styles.ipParagraph}>
                All third-party names, trademarks and associated intellectual property remain the property of their respective owners.
              </p>
              <p className={styles.ipParagraph}>
                Impostor Anime is an independent application and is not affiliated with, sponsored by, endorsed by, approved by or officially connected with those third parties unless expressly stated otherwise.
              </p>
              <p className={styles.ipParagraph}>
                The application does not reproduce third-party anime artwork, manga panels, screenshots, promotional artwork, franchise logos, video footage or copyrighted audio as part of those nominal references.
              </p>
            </div>
          </section>

          {/* 10. User Conduct During Party Games */}
          <section id="user-conduct" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>10.</span> User Conduct During Party Games
            </h2>
            <p className={styles.paragraph}>
              As a local party game, players interact directly with each other in physical social environments. Players remain solely responsible for their conduct, statements, and interactions with other people while playing.
            </p>
            <p className={styles.paragraph}>
              The developer does not control or monitor the verbal statements, actions, or behavior of players physically gathered together during gameplay.
            </p>
          </section>

          {/* 11. Availability and Updates */}
          <section id="availability" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>11.</span> Availability and Updates
            </h2>
            <p className={styles.paragraph}>
              The application may be updated, modified, temporarily unavailable due to maintenance, or discontinued at the developer's discretion. The developer does not guarantee permanent or indefinite server availability or maintenance.
            </p>
            <p className={styles.paragraph}>
              Where applicable law provides mandatory consumer guarantees regarding software updates or conformity, those rights remain unaffected.
            </p>
          </section>

          {/* 12. Disclaimer */}
          <section id="disclaimer" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>12.</span> Disclaimer
            </h2>
            <p className={styles.paragraph}>
              To the extent permitted by applicable law, Impostor Anime is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including fitness for a particular purpose or error-free operation.
            </p>
            <p className={styles.paragraph}>
              Nothing in these Terms excludes or limits statutory consumer rights that cannot legally be excluded under Spanish, European Union, or applicable local consumer protection laws.
            </p>
          </section>

          {/* 13. Limitation of Liability */}
          <section id="limitation-liability" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>13.</span> Limitation of Liability
            </h2>
            <p className={styles.paragraph}>
              To the maximum extent permitted by applicable law, the developer shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the application.
            </p>
            <p className={styles.paragraph}>
              Nothing in these Terms limits or excludes liability for intent, gross negligence, personal injury, or any other liability where such limitation is prohibited by law.
            </p>
          </section>

          {/* 14. Privacy */}
          <section id="privacy" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>14.</span> Privacy
            </h2>
            <p className={styles.paragraph}>
              Our handling of user data and technical information is described in detail in our{" "}
              <Link to="/impostor-anime/privacy" className={styles.externalLink}>
                Privacy Policy
              </Link>.
            </p>
          </section>

          {/* 15. Changes to These Terms */}
          <section id="changes" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>15.</span> Changes to These Terms
            </h2>
            <p className={styles.paragraph}>
              These Terms of Use may be updated from time to time. When changes occur, the updated date at the top of this document will be revised. For material changes, reasonable efforts will be made to provide notice where appropriate.
            </p>
          </section>

          {/* 16. Governing Law */}
          <section id="governing-law" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>16.</span> Governing Law
            </h2>
            <p className={styles.paragraph}>
              These Terms are governed by the laws of <strong>Spain</strong>.
            </p>
            <p className={styles.paragraph}>
              If you are a consumer residing in the European Union or another jurisdiction, this choice of law does not deprive you of the mandatory statutory consumer protection rights afforded by the laws of your country of residence.
            </p>
          </section>

          {/* 17. Contact */}
          <section id="contact" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>17.</span> Contact Information
            </h2>
            <p className={styles.paragraph}>
              If you have any questions or inquiries regarding these Terms of Use, please contact:
            </p>

            <div className={styles.contactGrid}>
              <div className={styles.contactCard}>
                <span className={styles.contactLabel}>Developer</span>
                <span className={styles.contactValue}>Mikel Rivera Guerrero</span>
              </div>
              <div className={styles.contactCard}>
                <span className={styles.contactLabel}>Country</span>
                <span className={styles.contactValue}>Spain</span>
              </div>
              <div className={styles.contactCard}>
                <span className={styles.contactLabel}>Support Contact</span>
                <a href="mailto:mikelrg2003@gmail.com" className={styles.externalLink}>
                  mikelrg2003@gmail.com
                </a>
              </div>
            </div>
          </section>

        </main>

        {/* Section 18: Footer & Links */}
        <div className={styles.linksCard}>
          <h2 className={styles.linksTitle}>Related Documents</h2>
          <div className={styles.linksGrid}>
            <Link to="/impostor-anime/support" className={styles.navLinkBtn}>
              Support Center
            </Link>
            <Link to="/impostor-anime/privacy" className={styles.navLinkBtn}>
              Privacy Policy
            </Link>
            <Link to="/impostor-anime" className={styles.navLinkBtn}>
              Impostor Anime
            </Link>
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.footerNavLinks}>
            <Link to="/impostor-anime/support" className={styles.footerLink}>
              Support
            </Link>
            <Link to="/impostor-anime/privacy" className={styles.footerLink}>
              Privacy Policy
            </Link>
            <Link to="/impostor-anime" className={styles.footerLink}>
              Impostor Anime
            </Link>
          </div>
          <p className={styles.footerText}>
            © 2026 Mikel Rivera Guerrero. All rights reserved.
          </p>
        </footer>

      </div>
    </div>
  );
}
