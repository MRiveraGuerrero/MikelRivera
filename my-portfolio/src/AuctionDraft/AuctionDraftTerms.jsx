import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./AuctionDraftLegal.module.css";

const content = {
  en: {
    pageTitle: "Terms & Conditions | Auction Draft",
    metaDesc: "Terms and Conditions for the Auction Draft mobile game.",
    headerTag: "Auction Draft Mobile Game",
    lastUpdated: "August 29, 2026",
    title: "Terms & Conditions",
    subtitle: "Please read these Terms & Conditions carefully before playing the Auction Draft mobile application.",
    tocTitle: "Table of Contents",
    sections: [
      { id: "acceptance", label: "1. Acceptance of Terms" },
      { id: "description", label: "2. Description of the Service" },
      { id: "currency", label: "3. Virtual Currency Disclaimer" },
      { id: "entertainment", label: "4. Entertainment Purpose" },
      { id: "purchases", label: "5. In-App Purchases & Refunds" },
      { id: "digital-content", label: "6. Digital Content & Unlocks" },
      { id: "acceptable-use", label: "7. Acceptable Use" },
      { id: "ip", label: "8. Intellectual Property" },
      { id: "availability", label: "9. Availability & Disclaimers" },
      { id: "updates", label: "10. Game Updates & Modifications" },
      { id: "liability", label: "11. Limitation of Liability" },
      { id: "termination", label: "12. Termination & Restrictions" },
      { id: "changes", label: "13. Changes to Terms" },
      { id: "contact", label: "14. Contact Information" }
    ],
    privacyLinkText: "← View Privacy Policy",
    homeLinkText: "Back to MikelRivera.com"
  },
  es: {
    pageTitle: "Términos y Condiciones | Auction Draft",
    metaDesc: "Términos y Condiciones para el juego móvil Auction Draft.",
    headerTag: "Juego Móvil Auction Draft",
    lastUpdated: "29 de agosto de 2026",
    title: "Términos y Condiciones",
    subtitle: "Por favor, lee detenidamente estos Términos y Condiciones antes de jugar a la aplicación móvil Auction Draft.",
    tocTitle: "Índice de Contenidos",
    sections: [
      { id: "acceptance", label: "1. Aceptación de Términos" },
      { id: "description", label: "2. Descripción del Servicio" },
      { id: "currency", label: "3. Moneda Virtual y Exención" },
      { id: "entertainment", label: "4. Propósito de Entretenimiento" },
      { id: "purchases", label: "5. Compras e Reembolsos" },
      { id: "digital-content", label: "6. Contenido Digital" },
      { id: "acceptable-use", label: "7. Uso Aceptable" },
      { id: "ip", label: "8. Propiedad Intelectual" },
      { id: "availability", label: "9. Disponibilidad" },
      { id: "updates", label: "10. Actualizaciones" },
      { id: "liability", label: "11. Limitación de Responsabilidad" },
      { id: "termination", label: "12. Rescisión y Restricciones" },
      { id: "changes", label: "13. Cambios en los Términos" },
      { id: "contact", label: "14. Información de Contacto" }
    ],
    privacyLinkText: "← Ver Política de Privacidad",
    homeLinkText: "Volver a MikelRivera.com"
  }
};

export default function AuctionDraftTerms() {
  const [lang, setLang] = useState("en");
  const t = content[lang];

  useEffect(() => {
    document.title = t.pageTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", t.metaDesc);
  }, [lang, t]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>

        {/* Header Card */}
        <header className={styles.headerCard}>
          <div className={styles.topBar}>
            <span className={styles.appBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              {t.headerTag}
            </span>

            {/* Language Switcher */}
            <div className={styles.langToggle} aria-label="Language selector">
              <button
                className={`${styles.langBtn} ${lang === "en" ? styles.langBtnActive : ""}`}
                onClick={() => setLang("en")}
              >
                English
              </button>
              <button
                className={`${styles.langBtn} ${lang === "es" ? styles.langBtnActive : ""}`}
                onClick={() => setLang("es")}
              >
                Español
              </button>
            </div>
          </div>

          <h1 className={styles.title}>{t.title}</h1>
          <div className={styles.metaInfo}>
            <span className={styles.metaItem}>
              <strong>{lang === "en" ? "Last updated:" : "Última actualización:"}</strong> {t.lastUpdated}
            </span>
            <span>•</span>
            <span className={styles.metaItem}>
              <strong>{lang === "en" ? "Developer:" : "Desarrollador:"}</strong> Mikel Rivera
            </span>
          </div>

          <p className={styles.subtitle}>{t.subtitle}</p>
        </header>

        {/* Table of Contents */}
        <nav className={styles.tocCard} aria-label="Table of contents">
          <h2 className={styles.tocTitle}>{t.tocTitle}</h2>
          <ul className={styles.tocList}>
            {t.sections.map((sec) => (
              <li key={sec.id}>
                <a href={`#${sec.id}`} className={styles.tocLink}>
                  {sec.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Body Card */}
        <main className={styles.contentCard}>

          {/* 1. Acceptance of Terms */}
          <section id="acceptance" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "1. Acceptance of Terms" : "1. Aceptación de los Términos"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                By downloading, installing, accessing, or playing <strong>Auction Draft</strong> (the "App"), developed by <strong>Mikel Rivera</strong>, you agree to be bound by these Terms & Conditions. If you do not agree to these Terms, please do not install or use the App.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Al descargar, instalar, acceder o jugar a <strong>Auction Draft</strong> (la "App"), desarrollada por <strong>Mikel Rivera</strong>, aceptas quedar vinculado por estos Términos y Condiciones. Si no estás de acuerdo con estos Términos, por favor no instales ni utilices la App.
              </p>
            )}
          </section>

          {/* 2. Description of the Service */}
          <section id="description" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "2. Description of the Service" : "2. Descripción del Servicio"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Auction Draft is a casual mobile application offering interactive virtual drafting and auction-based mini-games. The game is designed primarily for local offline play on mobile devices.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Auction Draft es una aplicación móvil casual que ofrece minijuegos interactivos basados en subastas y drafts virtuales. El juego está diseñado principalmente para jugar en formato local sin necesidad de conexión constante en dispositivos móviles.
              </p>
            )}
          </section>

          {/* 3. Virtual Currency Disclaimer */}
          <section id="currency" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "3. Virtual Currency Disclaimer" : "3. Moneda Virtual y Exención de Apuestas"}
            </h2>

            <div className={styles.warningBox}>
              <div className={styles.warningTitle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                {lang === "en" ? "IMPORTANT NOTICE REGARDING IN-GAME CURRENCY" : "AVISO IMPORTANTE SOBRE MONEDA DEL JUEGO"}
              </div>
              {lang === "en" ? (
                <span>
                  All money, budgets, balances, or numerical values displayed during gameplay (such as starting balances like "$20" or auction bids) represent <strong>strictly virtual, fictional in-game units</strong>.
                </span>
              ) : (
                <span>
                  Todo el dinero, presupuestos, saldos o valores numéricos mostrados durante la partida (como saldos iniciales de "$20" o pujas de subasta) representan <strong>estrictamente unidades ficticias y virtuales dentro del juego</strong>.
                </span>
              )}
            </div>

            {/* Explicit bullet points for Google Play compliance */}
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>{lang === "en" ? "No Real-Money Cashout:" : "Sin valor ni canje en dinero real:"}</strong>{" "}
                {lang === "en" ? "Virtual currency cannot be redeemed, cashed out, or exchanged for real-world currency, legal tender, goods, or services." : "La moneda virtual no se puede canjear, retirar ni cambiar por dinero real, moneda legal, bienes o servicios del mundo real."}
              </li>
              <li className={styles.listItem}>
                <strong>{lang === "en" ? "No Real Gambling:" : "No constituye apuestas reales:"}</strong>{" "}
                {lang === "en" ? "Auction Draft is not a gambling app, casino game, or real-money wagering platform. Virtual auctions are mechanics for entertainment only." : "Auction Draft no es una aplicación de apuestas, juego de casino ni plataforma de apuestas con dinero real. Las subastas virtuales son mecánicas lúdicas para entretenimiento."}
              </li>
              <li className={styles.listItem}>
                <strong>{lang === "en" ? "No Financial Value:" : "Sin valor monetario:"}</strong>{" "}
                {lang === "en" ? "Game scores, draft results, and virtual balances carry zero monetary value outside the App." : "Las puntuaciones, resultados de drafts y saldos virtuales tienen un valor monetario nulo fuera de la App."}
              </li>
            </ul>
          </section>

          {/* 4. Entertainment Purpose */}
          <section id="entertainment" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "4. Entertainment Purpose Only" : "4. Propósito Exclusivo de Entretenimiento"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Auction Draft is provided strictly for recreational and entertainment purposes. You agree to use the App responsibly and in accordance with applicable laws.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Auction Draft se proporciona estrictamente con fines recreativos y de entretenimiento. Aceptas utilizar la App de manera responsable y de conformidad con las leyes aplicables.
              </p>
            )}
          </section>

          {/* 5. In-App Purchases */}
          <section id="purchases" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "5. In-App Purchases & Pricing" : "5. Compras en la Aplicación y Precios"}
            </h2>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>
                  Auction Draft is free to download. The App may offer optional in-app purchases (such as category expansion packs, premium items, or full game unlocks).
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    <strong>Payment Processing:</strong> Transactions are handled exclusively by official store billing systems (Google Play Billing on Android or Apple App Store on iOS).
                  </li>
                  <li className={styles.listItem}>
                    <strong>Price Changes:</strong> Prices for digital items may be adjusted from time to time directly in the store listings.
                  </li>
                  <li className={styles.listItem}>
                    <strong>Refund Policies:</strong> All purchase transactions and refund requests are subject to the governing terms and refund policies of Google Play or Apple App Store.
                  </li>
                </ul>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>
                  Auction Draft es de descarga gratuita. La App puede ofrecer compras integradas opcionales (tales como paquetes de ampliación de categorías, elementos premium o desbloqueo del juego completo).
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    <strong>Procesamiento de Pagos:</strong> Las transacciones son gestionadas exclusivamente por los sistemas oficiales de facturación de la tienda correspondiente (Google Play Billing en Android o Apple App Store en iOS).
                  </li>
                  <li className={styles.listItem}>
                    <strong>Modificación de Precios:</strong> Los precios del contenido digital pueden ajustarse de vez en cuando directamente en las fichas de las tiendas.
                  </li>
                  <li className={styles.listItem}>
                    <strong>Políticas de Reembolso:</strong> Todas las transacciones de compra y solicitudes de reembolso están sujetas a las condiciones y políticas de reembolso vigentes de Google Play o Apple App Store.
                  </li>
                </ul>
              </>
            )}
          </section>

          {/* 6. Digital Content */}
          <section id="digital-content" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "6. Digital Content & Unlocks" : "6. Contenido Digital y Desbloqueos"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                In-app unlocks grant a limited, non-exclusive, non-transferable, revocable license to access digital features within the App. Unlocks represent digital virtual assets and do not constitute physical property or tangible goods.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Los desbloqueos dentro de la aplicación conceden una licencia limitada, no exclusiva, no transferible y revocable para acceder a funciones digitales dentro de la App. Los desbloqueos representan activos virtuales digitales y no constituyen bienes físicos ni propiedades tangibles.
              </p>
            )}
          </section>

          {/* 7. Acceptable Use */}
          <section id="acceptable-use" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "7. Acceptable Use" : "7. Uso Aceptable"}
            </h2>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>You agree not to engage in any of the following prohibited activities:</p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Decompiling, reverse engineering, or attempting to extract the source code of the App.</li>
                  <li className={styles.listItem}>Exploiting software bugs, vulnerabilities, or automated tools to alter game outcomes.</li>
                  <li className={styles.listItem}>Modifying, tampering with, or creating derivative works based on the App or its content.</li>
                  <li className={styles.listItem}>Abusing, disrupting, or attempting unauthorized access to any future online services or servers connected to the App.</li>
                </ul>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>Aceptas no realizar ninguna de las siguientes actividades prohibidas:</p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Descompilar, realizar ingeniería inversa o intentar extraer el código fuente de la App.</li>
                  <li className={styles.listItem}>Explotar errores del software, vulnerabilidades o herramientas automatizadas para alterar los resultados del juego.</li>
                  <li className={styles.listItem}>Modificar, alterar o crear obras derivadas basadas en la App o su contenido.</li>
                  <li className={styles.listItem}>Abusar, interrumpir o intentar acceder de forma no autorizada a futuros servicios en línea o servidores conectados a la App.</li>
                </ul>
              </>
            )}
          </section>

          {/* 8. Intellectual Property */}
          <section id="ip" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "8. Intellectual Property" : "8. Propiedad Intelectual"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                All rights, title, and interest in and to <strong>Auction Draft</strong>, including its original codebase, visual design, user interface, brand assets, logos, and original written content, are owned by or licensed to <strong>Mikel Rivera</strong> and protected by applicable copyright and intellectual property laws.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Todos los derechos, títulos e intereses relativos a <strong>Auction Draft</strong>, incluyendo su código fuente original, diseño visual, interfaz de usuario, marca, logotipos y contenido escrito original, son propiedad de o están licenciados a <strong>Mikel Rivera</strong> y están protegidos por las leyes aplicables de propiedad intelectual y derechos de autor.
              </p>
            )}
          </section>

          {/* 9. Availability */}
          <section id="availability" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "9. Service Availability & Disclaimers" : "9. Disponibilidad del Servicio"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Auction Draft is provided on an "AS IS" and "AS AVAILABLE" basis. While we strive to deliver a smooth gaming experience, we do not guarantee uninterrupted, error-free, or bug-free operation at all times.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Auction Draft se proporciona "TAL CUAL" y "SEGÚN DISPONIBILIDAD". Aunque nos esforzamos por ofrecer una experiencia de juego fluida, no garantizamos un funcionamiento ininterrumpido ni totalmente libre de errores en todo momento.
              </p>
            )}
          </section>

          {/* 10. Updates */}
          <section id="updates" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "10. Game Updates & Feature Modifications" : "10. Actualizaciones y Modificaciones"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                We reserve the right to update, modify, expand, or discontinue features of Auction Draft at any time to improve stability, introduce new content, or ensure compliance with mobile platform guidelines.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Nos reservamos el derecho de actualizar, modificar, ampliar o retirar funcionalidades de Auction Draft en cualquier momento para mejorar la estabilidad, introducir nuevo contenido o garantizar la conformidad con las directrices de las plataformas móviles.
              </p>
            )}
          </section>

          {/* 11. Limitation of Liability */}
          <section id="liability" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "11. Limitation of Liability" : "11. Limitación de Responsabilidad"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                To the maximum extent permitted by applicable law, Mikel Rivera shall not be liable for any indirect, incidental, or consequential damages resulting from your access to or use of (or inability to access or use) the App. Nothing in these Terms excludes statutory consumer rights under mandatory local laws.
              </p>
            ) : (
              <p className={styles.paragraph}>
                En la máxima medida permitida por la legislación aplicable, Mikel Rivera no será responsable de daños indirectos, incidentales o consecuentes derivados del acceso o uso (o la imposibilidad de acceso o uso) de la App. Nada de lo dispuesto en estos Términos excluye los derechos legales imperativos del consumidor bajo las leyes locales.
              </p>
            )}
          </section>

          {/* 12. Termination */}
          <section id="termination" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "12. Termination & Restriction" : "12. Rescisión y Restricción"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                We reserve the right to restrict or terminate access to online features or services in the event of severe terms violations, fraudulent activity, or abuse of the application.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Nos reservamos el derecho de restringir o rescindir el acceso a servicios o funciones en línea en caso de incumplimiento grave de estos Términos, actividades fraudulentas o abuso de la aplicación.
              </p>
            )}
          </section>

          {/* 13. Changes to Terms */}
          <section id="changes" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "13. Changes to Terms & Conditions" : "13. Cambios en los Términos y Condiciones"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                We may revise these Terms & Conditions as Auction Draft evolves. Updated versions will be posted on this page with an updated "Last Updated" date. Continued use of the App following updates constitutes acceptance of the revised Terms.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Podremos revisar estos Términos y Condiciones a medida que evolucione Auction Draft. Las versiones actualizadas se publicarán en esta página con la fecha de actualización correspondiente. El uso continuado de la App tras la publicación de cambios constituye la aceptación de los nuevos Términos.
              </p>
            )}
          </section>

          {/* 14. Contact */}
          <section id="contact" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "14. Contact Information" : "14. Información de Contacto"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                If you have any questions regarding these Terms & Conditions, please contact:
              </p>
            ) : (
              <p className={styles.paragraph}>
                Si tienes alguna pregunta sobre estos Términos y Condiciones, puedes contactar con:
              </p>
            )}
            <p className={styles.paragraph}>
              <strong>Mikel Rivera</strong>
              <br />
              <strong>Email:</strong>{" "}
              <a href="mailto:mikelrg2003@gmail.com" className={styles.link}>
                mikelrg2003@gmail.com
              </a>
            </p>
          </section>

        </main>

        {/* Footer Navigation */}
        <footer className={styles.footerNav}>
          <a href="https://mikelrivera.com" className={styles.footerLink}>
            ← {t.homeLinkText}
          </a>
          <Link to="/auctiondraft/privacy" className={styles.footerLink}>
            {t.privacyLinkText}
          </Link>
        </footer>

      </div>
    </div>
  );
}
