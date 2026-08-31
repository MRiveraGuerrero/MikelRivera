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
      { id: "currency", label: "3. Virtual Currency Used During Matches" },
      { id: "no-gambling", label: "4. No Gambling Declaration" },
      { id: "multiplayer", label: "5. Online Multiplayer Rules" },
      { id: "room-codes", label: "6. Room Codes" },
      { id: "advertising", label: "7. Advertising" },
      { id: "purchases", label: "8. In-App Purchases & Refunds" },
      { id: "ip", label: "9. Intellectual Property" },
      { id: "ai-content", label: "10. AI-Assisted Development and Content" },
      { id: "availability", label: "11. Availability & Service Disruption" },
      { id: "game-changes", label: "12. Changes to the Game" },
      { id: "accounts", label: "13. User Accounts Statement" },
      { id: "restrictions", label: "14. Termination & Restrictions" },
      { id: "disclaimer", label: "15. Entertainment Score Disclaimer" },
      { id: "liability", label: "16. Limitation of Liability" },
      { id: "governing-law", label: "17. Governing Law (Spain & EU)" },
      { id: "changes", label: "18. Changes to Terms" },
      { id: "contact", label: "19. Contact Information" }
    ],
    privacyLinkText: "← View Privacy Policy",
    homeLinkText: "Back to Auction Draft"
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
      { id: "acceptance", label: "1. Aceptación de los Términos" },
      { id: "description", label: "2. Descripción del Servicio" },
      { id: "currency", label: "3. Moneda Virtual Utilizada en las Partidas" },
      { id: "no-gambling", label: "4. Declaración de Ausencia de Apuestas" },
      { id: "multiplayer", label: "5. Reglas del Multijugador En Línea" },
      { id: "room-codes", label: "6. Códigos de Sala" },
      { id: "advertising", label: "7. Publicidad" },
      { id: "purchases", label: "8. Compras Integradas y Reembolsos" },
      { id: "ip", label: "9. Propiedad Intelectual" },
      { id: "ai-content", label: "10. Desarrollo y Contenido Asistido por IA" },
      { id: "availability", label: "11. Disponibilidad del Servicio" },
      { id: "game-changes", label: "12. Cambios en el Juego" },
      { id: "accounts", label: "13. Declaración Sobre Cuentas de Usuario" },
      { id: "restrictions", label: "14. Rescisión y Restricciones" },
      { id: "disclaimer", label: "15. Exención de Puntuaciones" },
      { id: "liability", label: "16. Limitación de Responsabilidad" },
      { id: "governing-law", label: "17. Ley Aplicable (España y UE)" },
      { id: "changes", label: "18. Cambios en los Términos" },
      { id: "contact", label: "19. Información de Contacto" }
    ],
    privacyLinkText: "← Ver Política de Privacidad",
    homeLinkText: "Volver a Auction Draft"
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

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", t.pageTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", t.metaDesc);
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
              <strong>{lang === "en" ? "Developer:" : "Desarrollador:"}</strong> Mikel Rivera Guerrero
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
                By downloading, installing, accessing, or playing <strong>Auction Draft</strong> (the "App"), created and developed by <strong>Mikel Rivera Guerrero</strong>, you agree to comply with and be bound by these Terms & Conditions. If you do not agree to these Terms, please do not use the App.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Al descargar, instalar, acceder o jugar a <strong>Auction Draft</strong> (la "App"), creada y desarrollada por <strong>Mikel Rivera Guerrero</strong>, aceptas cumplir y quedar vinculado por estos Términos y Condiciones. Si no estás de acuerdo con estos Términos, no utilices la App.
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
                Auction Draft is a competitive casual mobile game where two players receive a virtual starting budget (typically $20) to bid on thematic items, build a draft, and compare total hidden scores to determine the match winner.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Auction Draft es un juego móvil casual competitivo donde dos jugadores reciben un presupuesto inicial virtual (normalmente $20) para pujar por elementos temáticos, construir un draft y comparar puntuaciones ocultas para determinar el ganador.
              </p>
            )}
          </section>

          {/* 3. Virtual Currency */}
          <section id="currency" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "3. Virtual Currency Used During Matches" : "3. Moneda Virtual Utilizada en las Partidas"}
            </h2>
            <div className={styles.warningBox}>
              <div className={styles.warningTitle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                {lang === "en" ? "FICTIONAL VIRTUAL CURRENCY NOTICE" : "AVISO DE MONEDA VIRTUAL FICTICIA"}
              </div>
              {lang === "en" ? (
                <span>
                  The starting budget of <strong>$20</strong> (and any bids made during gameplay) represents <strong>strictly fictional in-game virtual currency</strong> used solely as a competitive video game mechanic.
                </span>
              ) : (
                <span>
                  El presupuesto inicial de <strong>$20</strong> (y cualquier puja realizada durante la partida) representa <strong>estrictamente moneda virtual ficticia dentro del juego</strong> utilizada únicamente como mecánica lúdica.
                </span>
              )}
            </div>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>{lang === "en" ? "No Monetary Value:" : "Sin Valor Monetario:"}</strong>{" "}
                {lang === "en" ? "Virtual currency cannot be redeemed, cashed out, or exchanged for real money, cryptocurrency, NFTs, or real-world goods." : "La moneda virtual no se puede canjear, retirar ni cambiar por dinero real, criptomonedas, NFTs ni bienes del mundo real."}
              </li>
              <li className={styles.listItem}>
                <strong>{lang === "en" ? "No Deposited Funds:" : "Sin Fondos Depositados:"}</strong>{" "}
                {lang === "en" ? "In-game dollars do not represent stored real money deposits or banking balances." : "Los dólares del juego no representan depósitos de dinero real ni saldos bancarios."}
              </li>
            </ul>
          </section>

          {/* 4. No Gambling */}
          <section id="no-gambling" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "4. No Gambling Declaration" : "4. Declaración de Ausencia de Apuestas"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                <strong>Auction Draft is not a gambling service or real-money wagering platform.</strong> In-game bidding is a purely virtual score-assembly mechanic. The App does not offer real-money gambling, cash prizes, or convertible rewards.
              </p>
            ) : (
              <p className={styles.paragraph}>
                <strong>Auction Draft no es un servicio de apuestas ni una plataforma de apuestas con dinero real.</strong> Las pujas del juego son una mecánica virtual de asignación de puntuación. La App no ofrece apuestas con dinero real, premios en metálico ni recompensas convertibles.
              </p>
            )}
          </section>

          {/* 5. Online Multiplayer Rules */}
          <section id="multiplayer" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "5. Online Multiplayer Acceptable Use" : "5. Reglas de Uso del Multijugador En Línea"}
            </h2>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>When participating in online room matches, you agree not to:</p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Interfere deliberately with match connectivity or room state</li>
                  <li className={styles.listItem}>Exploit software bugs, vulnerabilities, or automated bidding bots</li>
                  <li className={styles.listItem}>Tamper with or attempt unauthorized access to online backend infrastructure</li>
                  <li className={styles.listItem}>Engage in malicious denial-of-service or cheating activities</li>
                </ul>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>Al participar en partidas de sala en línea, aceptas no:</p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Interferir deliberadamente con la conectividad de las partidas o el estado de las salas</li>
                  <li className={styles.listItem}>Explotar errores del software, vulnerabilidades o bots de pujas automatizados</li>
                  <li className={styles.listItem}>Manipular o intentar acceder de forma no autorizada a la infraestructura de backend</li>
                  <li className={styles.listItem}>Realizar ataques maliciosos de denegación de servicio o actividades de trampa</li>
                </ul>
              </>
            )}
          </section>

          {/* 6. Room Codes */}
          <section id="room-codes" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "6. Room Codes" : "6. Códigos de Sala"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Online match room codes allow players to connect temporary game sessions. Room codes are utility identifiers shared at the user's discretion and do not represent permanent accounts or secret security credentials.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Los códigos de sala permiten conectar sesiones temporales de juego entre jugadores. Los códigos de sala son identificadores utilitarios compartidos a discreción del usuario y no representan cuentas permanentes ni credenciales secretas.
              </p>
            )}
          </section>

          {/* 7. Advertising */}
          <section id="advertising" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "7. Advertising" : "7. Publicidad"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                The free version of Auction Draft may present advertisements served via Google AdMob. Ads help support ongoing game development and server operations.
              </p>
            ) : (
              <p className={styles.paragraph}>
                La versión gratuita de Auction Draft puede mostrar anuncios servidos a través de Google AdMob. La publicidad ayuda a financiar el desarrollo continuo y la operativa de servidores.
              </p>
            )}
          </section>

          {/* 8. In-App Purchases */}
          <section id="purchases" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "8. In-App Purchases & Refunds" : "8. Compras Integradas y Reembolsos"}
            </h2>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>
                  Optional digital unlocks (such as category expansion packs or ad removal) are processed directly by platform store systems (Google Play / Apple App Store).
                </p>
                <p className={styles.paragraph}>
                  Purchases grant non-transferable digital usage rights inside the App. All refund requests are governed by the applicable refund rules and statutory consumer protection rights of the respective app store platform.
                </p>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>
                  Los desbloqueos digitales opcionales (como paquetes de categorías o eliminación de anuncios) son procesados por los sistemas oficiales de las tiendas (Google Play / Apple App Store).
                </p>
                <p className={styles.paragraph}>
                  Las compras otorgan derechos de uso digital no transferibles en la App. Todas las solicitudes de reembolso están sujetas a las normas de reembolso y a los derechos legales del consumidor aplicables en la plataforma correspondiente.
                </p>
              </>
            )}
          </section>

          {/* 9. Intellectual Property */}
          <section id="ip" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "9. Intellectual Property Protection" : "9. Protección de Propiedad Intelectual"}
            </h2>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>
                  The name <strong>Auction Draft</strong>, original logo, user interface design, codebase, graphics, and original item datasets are protected by intellectual property laws and owned by or licensed to <strong>Mikel Rivera Guerrero</strong>.
                </p>
                <h3 className={styles.subSectionTitle}>Third-Party References</h3>
                <p className={styles.paragraph}>
                  Auction Draft may include textual references to third-party names, titles, characters, works, trademarks, or franchises for identification, entertainment, and thematic purposes. All third-party names and trademarks remain the property of their respective owners. Their inclusion does not imply affiliation, sponsorship, endorsement, or any official relationship with Auction Draft or its developer. Auction Draft does not claim ownership of any third-party trademarks, characters, titles, or works referenced in the game.
                </p>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>
                  El nombre <strong>Auction Draft</strong>, logotipo original, diseño de interfaz, código fuente, gráficos y bases de datos de elementos originales están protegidos por las leyes de propiedad intelectual y son propiedad de o están licenciados a <strong>Mikel Rivera Guerrero</strong>.
                </p>
                <h3 className={styles.subSectionTitle}>Referencias a Terceros</h3>
                <p className={styles.paragraph}>
                  Auction Draft puede incluir referencias textuales a nombres, títulos, personajes, obras, marcas comerciales o franquicias de terceros con fines de identificación, entretenimiento y temática del juego. Todos los nombres y marcas comerciales de terceros siguen siendo propiedad de sus respectivos dueños. Su inclusión no implica afiliación, patrocinio, respaldo ni ninguna relación oficial con Auction Draft o su desarrollador. Auction Draft no reclama la propiedad de ninguna marca comercial, personaje, título u obra de terceros referenciados en el juego.
                </p>
              </>
            )}
          </section>

          {/* 10. AI Content */}
          <section id="ai-content" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "10. AI-Assisted Development and Content" : "10. Desarrollo y Contenido Asistido por IA"}
            </h2>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>
                  Auction Draft has been developed with the assistance of artificial intelligence tools. Certain elements of the App, including portions of its code, text, visual assets, design concepts, game content, or other materials, may have been created, generated, refined, or assisted using AI-based tools.
                </p>
                <p className={styles.paragraph}>
                  AI-assisted content is reviewed, selected, modified, and integrated by the developer where appropriate. The use of artificial intelligence does not imply that any third-party AI provider owns, operates, sponsors, endorses, or is affiliated with Auction Draft.
                </p>
                <p className={styles.paragraph}>
                  AI-generated or AI-assisted outputs may occasionally contain inaccuracies or unexpected results. The developer may update, replace, correct, or remove such content when necessary.
                </p>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>
                  Auction Draft ha sido desarrollado con la asistencia de herramientas de inteligencia artificial. Determinados elementos de la App, incluyendo partes de su código, texto, recursos visuales, conceptos de diseño, contenido del juego u otros materiales, pueden haber sido creados, generados, refinados o asistidos utilizando herramientas basadas en IA.
                </p>
                <p className={styles.paragraph}>
                  El contenido asistido por IA es revisado, seleccionado, modificado e integrado por el desarrollador según corresponda. El uso de inteligencia artificial no implica que ningún proveedor de IA de terceros sea propietario, opere, patrocine, respalde o esté afiliado a Auction Draft.
                </p>
                <p className={styles.paragraph}>
                  Los resultados generados o asistidos por IA pueden contener ocasionalmente imprecisiones o resultados inesperados. El desarrollador podrá actualizar, sustituir, corregir o eliminar dicho contenido cuando sea necesario.
                </p>
              </>
            )}
          </section>

          {/* 11. Availability */}
          <section id="availability" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "11. Availability & Service Disruption" : "11. Disponibilidad del Servicio"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Online features are provided on an "as is" and "as available" basis. Temporary outages may occur due to maintenance, updates, or third-party server disruptions.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Las funciones en línea se proporcionan "tal cual" y "según disponibilidad". Pueden producirse interrupciones temporales debido a mantenimiento, actualizaciones o incidencias en servidores de terceros.
              </p>
            )}
          </section>

          {/* 12. Changes to the Game */}
          <section id="game-changes" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "12. Changes to the Game" : "12. Cambios en el Juego"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                We reserve the right to modify, balance score values, add or adjust categories, and roll out new game modes to optimize user experience.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Nos reservamos el derecho de modificar, equilibrar valores de puntuación, añadir o ajustar categorías y lanzar nuevos modos de juego para optimizar la experiencia de usuario.
              </p>
            )}
          </section>

          {/* 13. Account Section */}
          <section id="accounts" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "13. User Accounts Statement" : "13. Declaración Sobre Cuentas de Usuario"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                <strong>Auction Draft does not require user accounts.</strong> Users are not required to maintain passwords, profiles, or registration credentials to enjoy the App.
              </p>
            ) : (
              <p className={styles.paragraph}>
                <strong>Auction Draft no requiere cuentas de usuario.</strong> Los usuarios no tienen que mantener contraseñas, perfiles ni credenciales de registro para disfrutar de la App.
              </p>
            )}
          </section>

          {/* 14. Termination / Restrictions */}
          <section id="restrictions" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "14. Restrictions & Abuse Prevention" : "14. Restricciones y Prevención de Abusos"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                We reserve the right to technically restrict online room access in cases of severe terms violations, malicious backend tampering, or automated cheat exploits.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Nos reservamos el derecho de restringir técnicamente el acceso a salas en línea en casos de infracciones graves, manipulación maliciosa de backend o uso de exploits de trampas.
              </p>
            )}
          </section>

          {/* 15. Disclaimer */}
          <section id="disclaimer" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "15. Entertainment Score Disclaimer" : "15. Exención Sobre Puntuaciones Recreativas"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Item scores and rankings within Auction Draft are fictional numerical values designed strictly for entertainment and game balance. They do not constitute real-world objective evaluations or endorsements.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Las puntuaciones de los elementos en Auction Draft son valores numéricos ficticios diseñados estrictamente para el entretenimiento y el equilibrio del juego. No constituyen evaluaciones objetivas ni valoraciones oficiales del mundo real.
              </p>
            )}
          </section>

          {/* 16. Limitation of Liability */}
          <section id="liability" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "16. Limitation of Liability" : "16. Limitación de Responsabilidad"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                To the extent permitted by applicable law, Mikel Rivera Guerrero is not liable for indirect or consequential losses. Mandatory statutory consumer rights under applicable laws remain unaffected.
              </p>
            ) : (
              <p className={styles.paragraph}>
                En la medida en que lo permita la ley aplicable, Mikel Rivera Guerrero no se hace responsable de pérdidas indirectas o consecuentes. Los derechos legales imperativos del consumidor permanecen inalterados.
              </p>
            )}
          </section>

          {/* 17. Governing Law */}
          <section id="governing-law" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "17. Governing Law (Spain & EU)" : "17. Ley Aplicable (España y UE)"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                These Terms are governed by the laws of Spain and applicable European Union consumer regulations.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Estos Términos se rigen por las leyes de España y las regulaciones aplicables de la Unión Europea sobre protección al consumidor.
              </p>
            )}
          </section>

          {/* 18. Changes to Terms */}
          <section id="changes" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "18. Changes to Terms" : "18. Cambios en los Términos"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                We may revise these Terms as new features are added. Continued play after updates indicates acceptance of revised Terms.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Podremos revisar estos Términos al añadir nuevas funciones. Continuar jugando tras las actualizaciones implica la aceptación de los Términos revisados.
              </p>
            )}
          </section>

          {/* 19. Contact */}
          <section id="contact" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "19. Contact Information" : "19. Información de Contacto"}
            </h2>
            <p className={styles.paragraph}>
              <strong>Mikel Rivera Guerrero</strong>
              <br />
              <strong>Email:</strong>{" "}
              <a href="mailto:mikelrg2003@gmail.com" className={styles.link}>
                mikelrg2003@gmail.com
              </a>
              <br />
              <strong>Website:</strong>{" "}
              <a href="https://mikelrivera.com" className={styles.link}>
                https://mikelrivera.com
              </a>
            </p>
          </section>

        </main>

        {/* Footer Navigation */}
        <footer className={styles.footerNav}>
          <Link to="/auctiondraft" className={styles.footerLink}>
            ← {t.homeLinkText}
          </Link>
          <Link to="/auctiondraft/privacy" className={styles.footerLink}>
            {t.privacyLinkText}
          </Link>
        </footer>

      </div>
    </div>
  );
}
