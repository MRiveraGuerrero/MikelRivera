import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./AuctionDraftLegal.module.css";

const content = {
  en: {
    pageTitle: "Privacy Policy | Auction Draft",
    metaDesc: "Privacy Policy for the Auction Draft mobile game.",
    headerTag: "Auction Draft Mobile Game",
    lastUpdated: "August 29, 2026",
    title: "Privacy Policy",
    subtitle: "This Privacy Policy describes how information is collected, processed, and protected in the Auction Draft mobile application.",
    tocTitle: "Table of Contents",
    sections: [
      { id: "intro", label: "1. Introduction" },
      { id: "collection", label: "2. Information We Collect" },
      { id: "multiplayer", label: "3. Online Multiplayer Data" },
      { id: "admob", label: "4. Advertising (Google AdMob)" },
      { id: "purchases", label: "5. In-App Purchases" },
      { id: "storage", label: "6. Local Storage" },
      { id: "third-party", label: "7. Third-Party Services" },
      { id: "sharing", label: "8. Data Sharing" },
      { id: "legal-basis", label: "9. Legal Basis (European Users)" },
      { id: "ad-consent", label: "10. Advertising Consent (UMP)" },
      { id: "retention", label: "11. Data Retention" },
      { id: "deletion", label: "12. Data Deletion & Privacy Requests" },
      { id: "children", label: "13. Children's Privacy (Target 13+)" },
      { id: "security", label: "14. Security" },
      { id: "transfers", label: "15. International Transfers" },
      { id: "changes", label: "16. Changes to Policy" },
      { id: "contact", label: "17. Contact & Official Links" }
    ],
    termsLinkText: "View Terms & Conditions →",
    homeLinkText: "← Back to Auction Draft"
  },
  es: {
    pageTitle: "Política de Privacidad | Auction Draft",
    metaDesc: "Política de Privacidad para el juego móvil Auction Draft.",
    headerTag: "Juego Móvil Auction Draft",
    lastUpdated: "29 de agosto de 2026",
    title: "Política de Privacidad",
    subtitle: "Esta Política de Privacidad describe cómo se recopila, procesa y protege la información en la aplicación móvil Auction Draft.",
    tocTitle: "Índice de Contenidos",
    sections: [
      { id: "intro", label: "1. Introducción" },
      { id: "collection", label: "2. Información que Recopilamos" },
      { id: "multiplayer", label: "3. Datos de Multijugador Online" },
      { id: "admob", label: "4. Publicidad (Google AdMob)" },
      { id: "purchases", label: "5. Compras en la Aplicación" },
      { id: "storage", label: "6. Almacenamiento Local" },
      { id: "third-party", label: "7. Servicios de Terceros" },
      { id: "sharing", label: "8. Intercambio de Datos" },
      { id: "legal-basis", label: "9. Base Legal (Usuarios UE)" },
      { id: "ad-consent", label: "10. Consentimiento Publicitario (UMP)" },
      { id: "retention", label: "11. Conservación de Datos" },
      { id: "deletion", label: "12. Eliminación de Datos y Solicitudes" },
      { id: "children", label: "13. Privacidad de Menores (Público 13+)" },
      { id: "security", label: "14. Seguridad" },
      { id: "transfers", label: "15. Transferencias Internacionales" },
      { id: "changes", label: "16. Cambios en la Política" },
      { id: "contact", label: "17. Contacto y Enlaces Oficiales" }
    ],
    termsLinkText: "Ver Términos y Condiciones →",
    homeLinkText: "← Volver a Auction Draft"
  }
};

export default function AuctionDraftPrivacy() {
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
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

        {/* Content Body */}
        <main className={styles.contentCard}>

          {/* 1. Introduction */}
          <section id="intro" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "1. Introduction" : "1. Introducción"}
            </h2>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>
                  This Privacy Policy governs the mobile application <strong>Auction Draft</strong> (the "App"), developed by <strong>Mikel Rivera Guerrero</strong>.
                </p>
                <p className={styles.paragraph}>
                  Auction Draft is an independent casual mobile game offering local and online 1v1 draft battles. We are dedicated to maintaining complete transparency regarding how data is handled. Contact email for privacy inquiries:{" "}
                  <a href="mailto:mikelrg2003@gmail.com" className={styles.link}>
                    mikelrg2003@gmail.com
                  </a>.
                </p>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>
                  Esta Política de Privacidad rige para la aplicación móvil <strong>Auction Draft</strong> (la "App"), desarrollada por <strong>Mikel Rivera Guerrero</strong>.
                </p>
                <p className={styles.paragraph}>
                  Auction Draft es un juego móvil casual independiente que ofrece batallas de draft 1vs1 locales y en línea. Estamos dedicados a mantener total transparencia sobre cómo se manejan los datos. Correo de contacto para consultas de privacidad:{" "}
                  <a href="mailto:mikelrg2003@gmail.com" className={styles.link}>
                    mikelrg2003@gmail.com
                  </a>.
                </p>
              </>
            )}
          </section>

          {/* 2. Information We Collect */}
          <section id="collection" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "2. Information We Collect" : "2. Información que Recopilamos"}
            </h2>

            <h3 className={styles.subSectionTitle}>
              {lang === "en" ? "2.1 Information Directly Provided by Users" : "2.1 Información Proporcionada Directamente por los Usuarios"}
            </h3>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>
                  Auction Draft <strong>does not require user account registration</strong>. We do not ask for or store:
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Real names or username profiles</li>
                  <li className={styles.listItem}>Email addresses or passwords</li>
                  <li className={styles.listItem}>Phone numbers or postal addresses</li>
                  <li className={styles.listItem}>Social media logins</li>
                </ul>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>
                  Auction Draft <strong>no requiere el registro de una cuenta de usuario</strong>. No solicitamos ni guardamos:
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Nombres reales ni perfiles de usuario</li>
                  <li className={styles.listItem}>Direcciones de correo electrónico ni contraseñas</li>
                  <li className={styles.listItem}>Números de teléfono ni direcciones postales</li>
                  <li className={styles.listItem}>Inicios de sesión mediante redes sociales</li>
                </ul>
              </>
            )}

            <h3 className={styles.subSectionTitle}>
              {lang === "en" ? "2.2 Information Collected Automatically" : "2.2 Información Recopilada de Forma Automática"}
            </h3>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>
                  Depending on features used (such as advertising or online room synchronization), technical data may be processed automatically by infrastructure providers:
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Device identifiers and operating system version</li>
                  <li className={styles.listItem}>Approximate coarse location derived from IP address</li>
                  <li className={styles.listItem}>Application interaction events and diagnostic performance data</li>
                  <li className={styles.listItem}>Advertising identifiers (e.g., Google AAID / IDFA where permitted)</li>
                </ul>
                <div className={styles.highlightQuote}>
                  Auction Draft <strong>does not request precise GPS location access</strong>, nor does it access contacts, camera, microphone, photos, SMS, or device calendar.
                </div>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>
                  Según las funciones utilizadas (como publicidad o sincronización de salas en línea), los proveedores de infraestructura pueden procesar automáticamente datos técnicos:
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Identificadores del dispositivo y versión del sistema operativo</li>
                  <li className={styles.listItem}>Ubicación aproximada derivada de la dirección IP</li>
                  <li className={styles.listItem}>Eventos de interacción en la app y datos de diagnóstico de rendimiento</li>
                  <li className={styles.listItem}>Identificadores publicitarios (ej. Google AAID / IDFA cuando corresponda)</li>
                </ul>
                <div className={styles.highlightQuote}>
                  Auction Draft <strong>no solicita acceso a la ubicación GPS precisa</strong>, ni accede a contactos, cámara, micrófono, fotos, SMS ni calendario del dispositivo.
                </div>
              </>
            )}
          </section>

          {/* 3. Online Multiplayer Data */}
          <section id="multiplayer" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "3. Online Multiplayer Data" : "3. Datos de Multijugador En Línea"}
            </h2>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>
                  When using the online 1v1 room mode, Auction Draft uses real-time room synchronization backend services (such as Supabase infrastructure). The technical data processed includes:
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Anonymous session and room identifiers</li>
                  <li className={styles.listItem}>Generated room connection codes</li>
                  <li className={styles.listItem}>In-game virtual bids and game actions</li>
                  <li className={styles.listItem}>Timestamps and network status connection logs</li>
                </ul>
                <p className={styles.paragraph}>
                  This data is processed solely to connect match players, synchronize bidding turns, prevent cheating/abuse, and maintain server stability. Room codes are connection utility tokens and do not constitute permanent user identity profiles.
                </p>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>
                  Al utilizar el modo de salas en línea 1vs1, Auction Draft utiliza servicios de backend de sincronización en tiempo real (como la infraestructura de Supabase). Los datos técnicos procesados incluyen:
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Identificadores anónimos de sesión y de sala</li>
                  <li className={styles.listItem}>Códigos generados para la conexión a la sala</li>
                  <li className={styles.listItem}>Pujas virtuales y acciones dentro del juego</li>
                  <li className={styles.listItem}>Marcas de tiempo y logs de conexión del estado de la red</li>
                </ul>
                <p className={styles.paragraph}>
                  Estos datos se procesan únicamente para conectar a los jugadores de la partida, sincronizar los turnos de puja, prevenir trampas y mantener la estabilidad del servidor. Los códigos de sala son tokens de conexión y no constituyen perfiles permanentes de identidad.
                </p>
              </>
            )}
          </section>

          {/* 4. Advertising */}
          <section id="admob" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "4. Advertising (Google AdMob)" : "4. Publicidad (Google AdMob)"}
            </h2>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>
                  Free versions of Auction Draft may display advertisements delivered via <strong>Google AdMob</strong> (Google Mobile Ads SDK).
                </p>
                <p className={styles.paragraph}>
                  Google Mobile Ads may collect and process information such as IP address, approximate location, device identifiers, ad interactions, and diagnostic metrics to serve, personalize, measure, and secure advertisements.
                </p>
                <p className={styles.paragraph}>
                  To learn more about how Google processes advertising data, please view the official{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    Google Privacy Policy
                  </a>.
                </p>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>
                  Las versiones gratuitas de Auction Draft pueden mostrar anuncios servidos a través de <strong>Google AdMob</strong> (Google Mobile Ads SDK).
                </p>
                <p className={styles.paragraph}>
                  Google Mobile Ads puede recopilar y procesar información como dirección IP, ubicación aproximada, identificadores del dispositivo, interacciones con anuncios y métricas de diagnóstico para servir, personalizar, medir y asegurar la publicidad.
                </p>
                <p className={styles.paragraph}>
                  Para conocer más sobre cómo Google procesa los datos publicitarios, consulta la{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    Política de Privacidad oficial de Google
                  </a>.
                </p>
              </>
            )}
          </section>

          {/* 5. In-App Purchases */}
          <section id="purchases" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "5. In-App Purchases" : "5. Compras en la Aplicación"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                In-app purchases (such as category expansion packs or full unlocks) are handled securely through platform billing services (<strong>Google Play Billing</strong> on Android and <strong>Apple In-App Purchases</strong> on iOS). The developer does not receive or store credit card details or bank account numbers. Technical transaction tokens are processed to verify purchases and unlock digital items.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Las compras integradas (como paquetes de categorías o desbloqueos completos) se gestionan de forma segura a través de las plataformas de facturación oficiales (<strong>Google Play Billing</strong> en Android y <strong>Compras Integradas de Apple</strong> en iOS). El desarrollador no recibe ni almacena números de tarjeta bancaria. Se procesan tokens técnicos de transacción únicamente para verificar compras y desbloquear elementos digitales.
              </p>
            )}
          </section>

          {/* 6. Local Storage */}
          <section id="storage" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "6. Local Storage" : "6. Almacenamiento Local"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Auction Draft stores game settings, selected language, local match progression, sound preferences, and unlock flags locally on your device storage (via React Native AsyncStorage). This data remains on your physical device.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Auction Draft guarda la configuración del juego, idioma seleccionado, progresión local de partidas, preferencias de sonido y compras desbloqueadas localmente en el almacenamiento de tu dispositivo (mediante React Native AsyncStorage). Estos datos permanecen en tu dispositivo físico.
              </p>
            )}
          </section>

          {/* 7. Third-Party Services */}
          <section id="third-party" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "7. Third-Party Services Summary" : "7. Resumen de Servicios de Terceros"}
            </h2>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>The App integrates or connects with the following platform services:</p>
                <ul className={styles.list}>
                  <li className={styles.listItem}><strong>Google Play Services / Apple App Store:</strong> Application delivery & billing infrastructure.</li>
                  <li className={styles.listItem}><strong>Google AdMob:</strong> Advertising delivery & fraud prevention.</li>
                  <li className={styles.listItem}><strong>Supabase Infrastructure:</strong> Real-time online room multiplayer synchronization.</li>
                </ul>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>La App integra o se conecta con los siguientes servicios de plataforma:</p>
                <ul className={styles.list}>
                  <li className={styles.listItem}><strong>Google Play Services / Apple App Store:</strong> Infraestructura de distribución y facturación de la app.</li>
                  <li className={styles.listItem}><strong>Google AdMob:</strong> Distribución de publicidad y prevención de fraude.</li>
                  <li className={styles.listItem}><strong>Infraestructura de Supabase:</strong> Sincronización multijugador de salas en línea en tiempo real.</li>
                </ul>
              </>
            )}
          </section>

          {/* 8. Data Sharing */}
          <section id="sharing" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "8. Data Sharing" : "8. Intercambio de Datos"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Technical data is shared exclusively with necessary infrastructure service providers (Google for ads/billing, Supabase for online room connections). We do not sell user personal data or trade personal profiles to third-party data brokers.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Los datos técnicos se comparten exclusivamente con los proveedores de servicios de infraestructura necesarios (Google para anuncios/facturación, Supabase para salas online). No vendemos datos personales de usuarios ni comercializamos perfiles personales con terceros.
              </p>
            )}
          </section>

          {/* 9. Legal Basis / European Users */}
          <section id="legal-basis" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "9. Legal Basis (European Union / EEA / Spain)" : "9. Base Legal (Unión Europea / EEE / España)"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Under the General Data Protection Regulation (GDPR), technical data processing is based on: (a) Performance of service for online room synchronization, (b) Legitimate interest in maintaining security and preventing abuse, and (c) User consent where legally required for advertising personalization.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Bajo el Reglamento General de Protección de Datos (RGPD), el tratamiento técnico de datos se basa en: (a) Ejecución del servicio para la sincronización de salas en línea, (b) Interés legítimo en mantener la seguridad y prevenir abusos, y (c) Consentimiento del usuario cuando sea legalmente exigible para la personalización de publicidad.
              </p>
            )}
          </section>

          {/* 10. Advertising Consent */}
          <section id="ad-consent" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "10. Advertising Consent Framework" : "10. Marco de Consentimiento Publicitario"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Where required by law (such as for European EEA/UK users), Google User Messaging Platform (UMP) or equivalent consent frameworks will be presented to allow users to manage ad personalization preferences.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Cuando la ley lo exija (como para usuarios del EEE/Reino Unido), se presentará la plataforma de consentimiento de Google (UMP) o equivalente para que los usuarios gestionen sus preferencias de publicidad.
              </p>
            )}
          </section>

          {/* 11. Data Retention */}
          <section id="retention" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "11. Data Retention" : "11. Conservación de Datos"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Temporary online room states are discarded after match completion. Local data is retained on your device until you clear app data or uninstall the application.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Los estados temporales de las salas en línea se descartan al finalizar la partida. Los datos locales permanecen en tu dispositivo hasta que borres los datos de la app o la desinstales.
              </p>
            )}
          </section>

          {/* 12. Data Deletion */}
          <section id="deletion" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "12. Data Deletion & Privacy Requests" : "12. Eliminación de Datos y Solicitudes"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Because Auction Draft does not maintain server user accounts, local data deletion is performed by clearing app data or uninstalling. For privacy inquiries or legal requests, write to{" "}
                <a href="mailto:mikelrg2003@gmail.com" className={styles.link}>
                  mikelrg2003@gmail.com
                </a>.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Dado que Auction Draft no mantiene cuentas de usuario en servidores, la eliminación de datos locales se realiza borrando los datos de la app o desinstalándola. Para consultas o solicitudes legales de privacidad, escribe a{" "}
                <a href="mailto:mikelrg2003@gmail.com" className={styles.link}>
                  mikelrg2003@gmail.com
                </a>.
              </p>
            )}
          </section>

          {/* 13. Children's Privacy */}
          <section id="children" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "13. Children's Privacy (Target Audience 13+)" : "13. Privacidad de Menores (Público Objetivo 13+)"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Auction Draft is intended for general teenage and adult audiences (13+). The App is not directed specifically to children under 13, and we do not knowingly solicit personal data from young children.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Auction Draft está destinado al público general adolescente y adulto (13+). La App no está dirigida específicamente a niños menores de 13 años y no solicitamos a sabiendas datos personales de niños pequeños.
              </p>
            )}
          </section>

          {/* 14. Security */}
          <section id="security" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "14. Security" : "14. Seguridad"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                We employ standard encryption protocols (HTTPS/WSS) for online room communication and rely on secure mobile platform sandboxing for local storage.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Empleamos protocolos de cifrado estándar (HTTPS/WSS) para la comunicación de salas en línea y confiamos en el aislamiento seguro de las plataformas móviles para el almacenamiento local.
              </p>
            )}
          </section>

          {/* 15. International Transfers */}
          <section id="transfers" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "15. International Transfers" : "15. Transferencias Internacionales"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Infrastructure providers (such as Google or Supabase) may process technical data in servers globally under recognized legal safeguards like Standard Contractual Clauses.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Los proveedores de infraestructura (como Google o Supabase) pueden procesar datos técnicos en servidores globales bajo salvaguardas legales reconocidas como Cláusulas Contractuales Tipo.
              </p>
            )}
          </section>

          {/* 16. Changes */}
          <section id="changes" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "16. Changes to This Privacy Policy" : "16. Cambios en esta Política de Privacidad"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                We reserve the right to update this Privacy Policy as Auction Draft evolves. The updated date will always be displayed at the top.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Nos reservamos el derecho de actualizar esta Política de Privacidad a medida que evolucione Auction Draft. La fecha actualizada estará siempre al inicio del documento.
              </p>
            )}
          </section>

          {/* 17. Contact */}
          <section id="contact" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "17. Contact & Official Links" : "17. Contacto y Enlaces Oficiales"}
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

            <ul className={styles.list}>
              <li>
                <a href="https://play.google.com/store/apps/dev?id=8276397884817662642&utm_source=emea_Med" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Google Play Developer Profile
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@mriveragg" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  YouTube (@mriveragg)
                </a>
              </li>
              <li>
                <a href="https://github.com/MRiveraGuerrero" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  GitHub Profile
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/mikel-rivera-guerrero-801248295/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          </section>

        </main>

        {/* Footer Navigation */}
        <footer className={styles.footerNav}>
          <Link to="/auctiondraft" className={styles.footerLink}>
            {t.homeLinkText}
          </Link>
          <Link to="/auctiondraft/terms" className={styles.footerLink}>
            {t.termsLinkText}
          </Link>
        </footer>

      </div>
    </div>
  );
}
