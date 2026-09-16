import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ImpostorAnimePrivacy.module.css";

export default function ImpostorAnimePrivacy() {
  useEffect(() => {
    document.title = "Impostor Anime Privacy Policy";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Official Privacy Policy for Impostor Anime mobile game developed by Mikel Rivera Guerrero."
    );

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", "Impostor Anime Privacy Policy");

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute(
      "content",
      "Learn how privacy and user data are handled in Impostor Anime."
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
              <span className={styles.privacyBadge}>Privacy Policy</span>
            </div>
          </div>

          <h1 className={styles.mainTitle}>
            Privacy <span className={styles.titleGlow}>Policy</span>
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
        <nav className={styles.tocCard} aria-label="Privacy policy table of contents">
          <h2 className={styles.tocTitle}>Table of Contents</h2>
          <ul className={styles.tocGrid}>
            <li><a href="#introduction" className={styles.tocLink}>1. Introduction</a></li>
            <li><a href="#information-collected" className={styles.tocLink}>2. Information We Collect</a></li>
            <li><a href="#supabase" className={styles.tocLink}>3. Backend Infrastructure – Supabase</a></li>
            <li><a href="#purchases" className={styles.tocLink}>4. In-App Purchases</a></li>
            <li><a href="#advertising" className={styles.tocLink}>5. Advertising and Tracking</a></li>
            <li><a href="#intellectual-property" className={styles.tocLink}>6. Third-Party Content & IP</a></li>
            <li><a href="#how-we-use" className={styles.tocLink}>7. How We Use Information</a></li>
            <li><a href="#data-sharing" className={styles.tocLink}>8. Data Sharing</a></li>
            <li><a href="#data-retention" className={styles.tocLink}>9. Data Retention</a></li>
            <li><a href="#data-deletion" className={styles.tocLink}>10. Data Deletion & Requests</a></li>
            <li><a href="#childrens-privacy" className={styles.tocLink}>11. Children's Privacy</a></li>
            <li><a href="#international" className={styles.tocLink}>12. International Processing</a></li>
            <li><a href="#security" className={styles.tocLink}>13. Security</a></li>
            <li><a href="#user-rights" className={styles.tocLink}>14. GDPR / User Rights</a></li>
            <li><a href="#changes" className={styles.tocLink}>15. Changes to This Policy</a></li>
            <li><a href="#contact" className={styles.tocLink}>16. Contact Information</a></li>
          </ul>
        </nav>

        {/* Content Body */}
        <main className={styles.contentCard}>

          {/* 1. Introduction */}
          <section id="introduction" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>1.</span> Introduction
            </h2>
            <p className={styles.paragraph}>
              This Privacy Policy describes how information is handled when you download, install, or play the mobile game <strong>Impostor Anime</strong> (the "App").
            </p>
            <p className={styles.paragraph}>
              The App is developed and operated by <strong>Mikel Rivera Guerrero</strong>, located in <strong>Spain</strong>. We are committed to maintaining transparent, fair, and minimal data practices.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section id="information-collected" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>2.</span> Information We Collect
            </h2>
            <p className={styles.paragraph}>
              Impostor Anime is designed to operate primarily on your device without collecting unnecessary personal information.
            </p>

            <h3 className={styles.subHeading}>2.1 Information Provided Directly by Users</h3>
            <p className={styles.paragraph}>
              Impostor Anime <strong>does not require you to create an account</strong>, sign in with social credentials, or provide personal identity details (such as your name, email address, or phone number) to play the game.
            </p>

            <h3 className={styles.subHeading}>2.2 Gameplay & Local Preferences</h3>
            <p className={styles.paragraph}>
              Game settings (such as sound effects toggles, vibration preferences, language selection, and local player setup) are saved locally on your device using local storage (`AsyncStorage`). This data remains on your physical device.
            </p>

            <h3 className={styles.subHeading}>2.3 Technical Information</h3>
            <p className={styles.paragraph}>
              The app relies on standard mobile operating system capabilities to render graphics, play audio, and execute local game logic. The app does <strong>not</strong> collect advertising identifiers (such as IDFA or GAID) or build advertising profiles.
            </p>

            <h3 className={styles.subHeading}>2.4 Purchase Information</h3>
            <p className={styles.paragraph}>
              If you choose to purchase digital items (such as feature unlocks or ad-free modes), purchase entitlements and unlocked product IDs (e.g. `remove_ads`, `pack_anime_premium`) are saved on your local device to unlock the corresponding content.
            </p>
          </section>

          {/* 3. Supabase */}
          <section id="supabase" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>3.</span> Backend Infrastructure – Supabase
            </h2>
            <p className={styles.paragraph}>
              Supabase is utilized as backend infrastructure for cloud services and server-side data management where enabled.
            </p>

            <div className={styles.highlightBox}>
              <p className={styles.paragraph}>
                <strong>Implementation Audit Details:</strong> In the current client implementation of Impostor Anime, core game state, settings, and digital entitlement records are stored locally on your physical device. When optional cloud features or remote server synchronization are active, technical requests sent to backend services may log standard infrastructure information such as IP addresses, request timestamps, and system diagnostics for operational security and rate limiting.
              </p>
            </div>

            <div className={styles.todoCallout}>
              [TODO: Developer to confirm specific Supabase database tables or log retention policies if live backend endpoints are configured]
            </div>

            <p className={styles.paragraph}>
              For information regarding how Supabase handles security and infrastructure privacy, please consult the official{" "}
              <a 
                href="https://supabase.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.externalLink}
              >
                Supabase Privacy Policy
              </a>.
            </p>
          </section>

          {/* 4. In-App Purchases */}
          <section id="purchases" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>4.</span> In-App Purchases
            </h2>
            <p className={styles.paragraph}>
              In-app purchases on iOS devices are processed directly through the <strong>Apple App Store</strong> (and on Android via Google Play Store where applicable).
            </p>
            <p className={styles.paragraph}>
              The developer does <strong>not</strong> receive or store complete payment card details, billing addresses, or financial account credentials. The app receives transaction receipts and product identifier states necessary to confirm valid purchases and activate digital content.
            </p>
          </section>

          {/* 5. Advertising and Tracking */}
          <section id="advertising" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>5.</span> Advertising and Tracking
            </h2>
            <div className={styles.accentBox}>
              <p className={styles.paragraph}>
                <strong>Impostor Anime does not display third-party advertisements and does not use AdMob.</strong>
              </p>
              <p className={styles.paragraph}>
                <strong>We do not use personal information for cross-app advertising tracking.</strong>
              </p>
            </div>
            <p className={styles.paragraph}>
              The app does not include third-party advertising SDKs, ad networks, or user profiling tools designed to serve targeted ads.
            </p>
          </section>

          {/* 6. Third-Party Content & IP Notice */}
          <section id="intellectual-property" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>6.</span> Third-Party Content and Intellectual Property
            </h2>
            <div className={styles.amberBox}>
              <p className={styles.paragraph}>
                Impostor Anime may include nominal references to third-party works, franchises, fictional characters, titles or trademarks for identification and gameplay purposes.
              </p>
              <p className={styles.paragraph}>
                These references do not imply affiliation, sponsorship or endorsement.
              </p>
              <p className={styles.paragraph}>
                Names and trademarks belong to their respective owners.
              </p>
              <p className={styles.paragraph}>
                The app does not use third-party copyrighted artwork, anime screenshots, promotional images, franchise logos, copyrighted video footage or copyrighted audio in connection with these nominal references.
              </p>
            </div>
          </section>

          {/* 7. How We Use Information */}
          <section id="how-we-use" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>7.</span> How We Use Information
            </h2>
            <p className={styles.paragraph}>
              Any local or technical data processed in connection with Impostor Anime is used solely for legitimate operational purposes:
            </p>
            <ul className={styles.bulletList}>
              <li>Operating the game and maintaining local gameplay features.</li>
              <li>Saving your sound, vibration, and language preferences locally.</li>
              <li>Validating and restoring in-app purchase entitlements.</li>
              <li>Debugging technical issues, preventing abuse, and ensuring app stability.</li>
            </ul>
          </section>

          {/* 8. Data Sharing */}
          <section id="data-sharing" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>8.</span> Data Sharing
            </h2>
            <p className={styles.paragraph}>
              <strong>We do not sell personal information under any circumstances.</strong>
            </p>
            <p className={styles.paragraph}>
              Information is only processed by essential platform service providers necessary for the app to function:
            </p>
            <ul className={styles.bulletList}>
              <li>
                <strong>Apple App Store / Google Play:</strong> Process purchase transactions, billing, and purchase restoration under their respective platform privacy policies.
              </li>
              <li>
                <strong>Supabase:</strong> Provides cloud infrastructure and database hosting services where backend communication is configured.
              </li>
            </ul>
          </section>

          {/* 9. Data Retention */}
          <section id="data-retention" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>9.</span> Data Retention
            </h2>
            <p className={styles.paragraph}>
              Local game preferences and purchase states remain stored on your physical device until you delete the app or clear its application data via device settings.
            </p>
            <p className={styles.paragraph}>
              Where technical server logs or infrastructure data are generated by cloud infrastructure (such as IP addresses in access logs), such data is retained only for as long as reasonably necessary to fulfill security, debugging, and operational requirements before being deleted or anonymized.
            </p>
          </section>

          {/* 10. Data Deletion and Privacy Requests */}
          <section id="data-deletion" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>10.</span> Data Deletion and Privacy Requests
            </h2>
            <p className={styles.paragraph}>
              Because Impostor Anime does not require user account registration, we do not maintain central user profiles indexed by email address or user name.
            </p>
            <p className={styles.paragraph}>
              If you wish to submit a privacy request or inquire about data associated with your device or transaction, please contact us at:
            </p>
            <p className={styles.paragraph}>
              <strong>Privacy Email:</strong>{" "}
              <a href="mailto:mikelrg2003@gmail.com" className={styles.externalLink}>
                mikelrg2003@gmail.com
              </a>{" "}
              <span style={{ opacity: 0.7 }}>(or [INSERT PRIVACY EMAIL])</span>
            </p>
            <p className={styles.paragraph}>
              To assist with your request, we may ask for sufficient technical details (such as store transaction IDs) to locate any relevant server-side records. Please note that data stored strictly on your local device can be removed at any time by uninstalling the application.
            </p>
          </section>

          {/* 11. Children's Privacy */}
          <section id="childrens-privacy" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>11.</span> Children's Privacy
            </h2>
            <p className={styles.paragraph}>
              Impostor Anime is designed as a general-audience party game. We do not knowingly solicit or request personal information directly from children. If a parent or legal guardian believes that personal information has been transmitted to us, please contact us so we can take appropriate measures to locate and remove any such information.
            </p>
          </section>

          {/* 12. International Processing */}
          <section id="international" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>12.</span> International Data Processing
            </h2>
            <p className={styles.paragraph}>
              Impostor Anime operates internationally. Platform providers such as Apple, Google, and Supabase operate data centers and cloud infrastructure globally. As a result, technical data processed by these service providers may be stored or processed in jurisdictions outside your country of residence.
            </p>
          </section>

          {/* 13. Security */}
          <section id="security" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>13.</span> Security
            </h2>
            <p className={styles.paragraph}>
              We employ reasonable technical and organizational safeguards designed to protect against unauthorized access, loss, or misuse of data. However, please be aware that no electronic storage mechanism or internet transmission can be guaranteed to be completely secure.
            </p>
          </section>

          {/* 14. User Rights (GDPR / EEA) */}
          <section id="user-rights" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>14.</span> User Rights (GDPR / EEA)
            </h2>
            <p className={styles.paragraph}>
              As the developer is based in Spain (European Union), users in the European Economic Area (EEA) and other applicable jurisdictions enjoy specific privacy rights under the General Data Protection Regulation (GDPR), including:
            </p>
            <ul className={styles.bulletList}>
              <li><strong>Right of Access:</strong> Request details about data processed about you.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate information.</li>
              <li><strong>Right to Erasure:</strong> Request deletion of personal data where applicable.</li>
              <li><strong>Right to Restriction & Objection:</strong> Object to or restrict specific processing operations.</li>
              <li><strong>Right to Data Portability:</strong> Request a structured copy of your data where applicable.</li>
            </ul>
            <p className={styles.paragraph}>
              To exercise these rights, please contact our privacy inbox listed below.
            </p>
          </section>

          {/* 15. Changes to This Privacy Policy */}
          <section id="changes" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>15.</span> Changes to This Privacy Policy
            </h2>
            <p className={styles.paragraph}>
              We may update this Privacy Policy from time to time to reflect changes in our data practices, legal requirements, or app features. The latest version will always be published on this page with an updated "Last Updated" date.
            </p>
          </section>

          {/* 16. Contact Information */}
          <section id="contact" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>16.</span> Contact Information
            </h2>
            <p className={styles.paragraph}>
              If you have any questions, concerns, or requests regarding this Privacy Policy, please contact the developer:
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
                <span className={styles.contactLabel}>Privacy Email</span>
                <a href="mailto:mikelrg2003@gmail.com" className={styles.externalLink}>
                  mikelrg2003@gmail.com
                </a>
              </div>
            </div>
          </section>

        </main>

        {/* Section 18: Footer & Links */}
        <div className={styles.linksCard}>
          <h2 className={styles.linksTitle}>Related Navigation</h2>
          <div className={styles.linksGrid}>
            <Link to="/impostor-anime/support" className={styles.navLinkBtn}>
              Support Center
            </Link>
            <Link to="/impostor-anime/terms" className={styles.navLinkBtn}>
              Terms of Use
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
            <Link to="/impostor-anime/terms" className={styles.footerLink}>
              Terms of Use
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
