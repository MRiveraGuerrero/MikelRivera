import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ImpostorAnimeSupport.module.css";

export default function ImpostorAnimeSupport() {
  useEffect(() => {
    // Set page title exactly as requested
    document.title = "Impostor Anime Support";

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Official support page for Impostor Anime. Find answers to frequently asked questions, purchase restoration help, bug reporting guidelines, and contact support."
    );

    // Set OpenGraph title & description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", "Impostor Anime Support");

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute(
      "content",
      "Need help with Impostor Anime? Find answers or contact support."
    );
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Header Section */}
        <header className={styles.headerCard}>
          <div className={styles.topBar}>
            <div className={styles.badgeGroup}>
              <span className={styles.appBadge}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="2" y="6" width="20" height="12" rx="4" />
                  <path d="M6 12h4m-2-2v4" />
                  <circle cx="15" cy="10" r="1" fill="currentColor" />
                  <circle cx="18" cy="13" r="1" fill="currentColor" />
                </svg>
                Impostor Anime
              </span>
              <span className={styles.supportBadge}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Support
              </span>
            </div>
          </div>

          <h1 className={styles.mainTitle}>
            Impostor Anime <span className={styles.titleGlow}>Support</span>
          </h1>

          <p className={styles.subtitle}>
            Need help with Impostor Anime? Find answers or contact us below.
          </p>
        </header>

        {/* Quick Navigation / Table of Contents */}
        <nav className={styles.tocCard} aria-label="Support sections navigation">
          <h2 className={styles.tocTitle}>Table of Contents</h2>
          <ul className={styles.tocGrid}>
            <li>
              <a href="#faq" className={styles.tocLink}>
                <svg className={styles.tocIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Frequently Asked Questions
              </a>
            </li>
            <li>
              <a href="#contact" className={styles.tocLink}>
                <svg className={styles.tocIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Contact Support
              </a>
            </li>
            <li>
              <a href="#purchases" className={styles.tocLink}>
                <svg className={styles.tocIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Purchases & Billing
              </a>
            </li>
            <li>
              <a href="#intellectual-property" className={styles.tocLink}>
                <svg className={styles.tocIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Intellectual Property Notice
              </a>
            </li>
          </ul>
        </nav>

        {/* Content Body */}
        <main className={styles.contentCard}>

          {/* Section 2: Frequently Asked Questions */}
          <section id="faq" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            </div>

            <div className={styles.faqList}>

              {/* FAQ 1 */}
              <article className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  <span className={styles.faqQPrefix}>Q:</span> How do I play Impostor Anime?
                </h3>
                <p className={styles.faqAnswer}>
                  Impostor Anime is a local party game played by multiple people using one device. Players pass the device around in turns to receive secret roles and words before engaging in discussions to identify who among them is the Impostor.
                </p>
              </article>

              {/* FAQ 2 */}
              <article className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  <span className={styles.faqQPrefix}>Q:</span> Do I need an account?
                </h3>
                <p className={styles.faqAnswer}>
                  No. An account is not required to play. You can open the app and jump right into a game session with your friends without creating a profile or registering credentials.
                </p>
              </article>

              {/* FAQ 3 */}
              <article className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  <span className={styles.faqQPrefix}>Q:</span> Does the game require an internet connection?
                </h3>
                <p className={styles.faqAnswer}>
                  The core game is designed to be playable locally on a single device without requiring an active internet connection.
                </p>
              </article>

              {/* FAQ 4 */}
              <article className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  <span className={styles.faqQPrefix}>Q:</span> How do I restore my purchases?
                </h3>
                <p className={styles.faqAnswer}>
                  Purchases made through Apple can be restored using the in-app "Restore Purchases" functionality where available. Purchases are securely associated with your App Store account.
                </p>
              </article>

              {/* FAQ 5 */}
              <article className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  <span className={styles.faqQPrefix}>Q:</span> I purchased something but it is not unlocked. What should I do?
                </h3>
                <p className={styles.faqAnswer}>
                  If your purchased content does not unlock immediately, please follow these steps:
                </p>
                <ol className={styles.orderedList}>
                  <li>Verify that your device is signed into the exact same Apple ID used for the original purchase.</li>
                  <li>Try using the <strong>Restore Purchases</strong> button inside the app settings/store menu.</li>
                  <li>Restart the Impostor Anime app completely.</li>
                  <li>If the problem remains after trying these steps, please contact our support team below with your transaction receipt.</li>
                </ol>
              </article>

              {/* FAQ 6 */}
              <article className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  <span className={styles.faqQPrefix}>Q:</span> How can I report a bug?
                </h3>
                <p className={styles.faqAnswer}>
                  If you encounter a technical glitch or bug, please send an email to our support contact with the following information:
                </p>
                <ul className={styles.bulletList}>
                  <li><strong>Device Model:</strong> (e.g., iPhone 15 Pro, iPad Air 5th Gen)</li>
                  <li><strong>iOS Version:</strong> (e.g., iOS 17.5)</li>
                  <li><strong>App Version:</strong> (e.g., v1.0.2)</li>
                  <li><strong>Explanation of the issue:</strong> A clear description of what went wrong.</li>
                  <li><strong>Steps to reproduce:</strong> What actions led to the bug.</li>
                  <li><strong>Screenshot or recording:</strong> If relevant and available.</li>
                </ul>
              </article>

              {/* FAQ 7 */}
              <article className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  <span className={styles.faqQPrefix}>Q:</span> How can I suggest a feature?
                </h3>
                <p className={styles.faqAnswer}>
                  We welcome feedback and feature suggestions from our players! You can submit your ideas directly by sending an email to our support contact.
                </p>
              </article>

            </div>
          </section>

          {/* Section 3: Contact Support */}
          <section id="contact" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={`${styles.sectionIcon} ${styles.cyanIcon}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h2 className={styles.sectionTitle}>Contact Support</h2>
            </div>

            <div className={styles.contactGrid}>
              <div className={styles.contactCard}>
                <span className={styles.contactLabel}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Developer
                </span>
                <span className={styles.contactValue}>Mikel Rivera Guerrero</span>
              </div>

              <div className={styles.contactCard}>
                <span className={styles.contactLabel}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Support Email
                </span>
                <a href="mailto:mikelrg2003@gmail.com" className={styles.mailtoLink}>
                  mikelrg2003@gmail.com
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>

              <div className={styles.contactCard}>
                <span className={styles.contactLabel}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Location
                </span>
                <span className={styles.contactValue}>Spain</span>
              </div>

              <div className={styles.contactCard}>
                <span className={styles.contactLabel}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                  Legal Address
                </span>
                <span className={styles.placeholderText}>[INSERT LEGAL ADDRESS]</span>
              </div>

              <div className={styles.contactCard}>
                <span className={styles.contactLabel}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Telephone
                </span>
                <span className={styles.placeholderText}>[INSERT TELEPHONE NUMBER]</span>
              </div>
            </div>

            <div className={styles.noticeBox}>
              <svg className={styles.noticeIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>We usually review support requests as soon as reasonably possible.</span>
            </div>
          </section>

          {/* Section 4: Purchases */}
          <section id="purchases" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={`${styles.sectionIcon} ${styles.pinkIcon}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <h2 className={styles.sectionTitle}>Purchases & Billing Information</h2>
            </div>

            <div className={styles.purchasesBox}>
              <div className={styles.purchaseDetail}>
                <svg className={styles.purchaseIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p className={styles.purchaseText}>
                  Purchases in Impostor Anime are processed directly through the <strong>Apple App Store</strong> on iOS devices.
                </p>
              </div>

              <div className={styles.purchaseDetail}>
                <svg className={styles.purchaseIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <p className={styles.purchaseText}>
                  The developer does not directly receive, process, or store the user's payment card information. All transactions are handled securely by Apple's payment infrastructure.
                </p>
              </div>

              <div className={styles.purchaseDetail}>
                <svg className={styles.purchaseIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 10h18M3 14h18" />
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                </svg>
                <p className={styles.purchaseText}>
                  Refund requests for App Store purchases are generally handled through Apple's official purchase and refund systems.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Intellectual Property Notice */}
          <section id="intellectual-property" className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={`${styles.sectionIcon} ${styles.amberIcon}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h2 className={styles.sectionTitle}>Intellectual Property Notice</h2>
            </div>

            <div className={styles.ipBox}>
              <p className={styles.ipParagraph}>
                Impostor Anime may contain nominal references to third-party works, franchises, fictional characters, titles or trademarks for identification and gameplay purposes.
              </p>
              <p className={styles.ipParagraph}>
                All such names and trademarks remain the property of their respective owners.
              </p>
              <p className={styles.ipParagraph}>
                Impostor Anime is an independent product and is not affiliated with, endorsed by, sponsored by, or officially connected with those rights holders.
              </p>
              <p className={styles.ipParagraph}>
                The app does not reproduce third-party copyrighted artwork, anime screenshots, promotional images, franchise logos, video footage or copyrighted audio as part of those references.
              </p>
            </div>
          </section>

        </main>

        {/* Section 6: Links */}
        <div className={styles.linksCard}>
          <h2 className={styles.linksTitle}>Related Documents & Links</h2>
          <div className={styles.linksGrid}>
            <Link to="/impostor-anime/privacy" className={styles.navLinkBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Privacy Policy
            </Link>

            <Link to="/impostor-anime/terms" className={styles.navLinkBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Terms of Use
            </Link>

            <Link to="/impostor-anime" className={styles.navLinkBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Impostor Anime
            </Link>
          </div>
        </div>

        {/* Section 7: Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerNavLinks}>
            <Link to="/impostor-anime/privacy" className={styles.footerLink}>
              Privacy Policy
            </Link>
            <Link to="/impostor-anime/terms" className={styles.footerLink}>
              Terms of Use
            </Link>
            <Link to="/impostor-anime/support" className={styles.footerLink}>
              Support
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
