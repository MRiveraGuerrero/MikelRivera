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
    subtitle: "This Privacy Policy describes how information is handled when using the Auction Draft mobile application.",
    tocTitle: "Table of Contents",
    sections: [
      { id: "intro", label: "1. Introduction" },
      { id: "collection", label: "2. Information We Collect" },
      { id: "purchases", label: "3. In-App Purchases" },
      { id: "third-party", label: "4. Third-Party Services" },
      { id: "sharing", label: "5. Data Sharing" },
      { id: "retention", label: "6. Data Retention" },
      { id: "children", label: "7. Children's Privacy" },
      { id: "security", label: "8. Security" },
      { id: "rights", label: "9. User Rights" },
      { id: "future", label: "10. Future Features & Updates" },
      { id: "changes", label: "11. Changes to This Policy" },
      { id: "contact", label: "12. Contact Us" }
    ],
    termsLinkText: "View Terms & Conditions →",
    homeLinkText: "← Back to MikelRivera.com"
  },
  es: {
    pageTitle: "Política de Privacidad | Auction Draft",
    metaDesc: "Política de Privacidad para el juego móvil Auction Draft.",
    headerTag: "Juego Móvil Auction Draft",
    lastUpdated: "29 de agosto de 2026",
    title: "Política de Privacidad",
    subtitle: "Esta Política de Privacidad describe cómo se trata la información al utilizar la aplicación móvil Auction Draft.",
    tocTitle: "Índice de Contenidos",
    sections: [
      { id: "intro", label: "1. Introducción" },
      { id: "collection", label: "2. Información que Recopilamos" },
      { id: "purchases", label: "3. Compras en la Aplicación" },
      { id: "third-party", label: "4. Servicios de Terceros" },
      { id: "sharing", label: "5. Intercambio de Datos" },
      { id: "retention", label: "6. Conservación de Datos" },
      { id: "children", label: "7. Privacidad de Menores" },
      { id: "security", label: "8. Seguridad" },
      { id: "rights", label: "9. Derechos del Usuario" },
      { id: "future", label: "10. Funcionalidades Futuras" },
      { id: "changes", label: "11. Cambios en esta Política" },
      { id: "contact", label: "12. Contacto" }
    ],
    termsLinkText: "Ver Términos y Condiciones →",
    homeLinkText: "← Volver a MikelRivera.com"
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
                  This Privacy Policy applies to the mobile game application <strong>Auction Draft</strong> (hereinafter referred to as "the App"), developed by <strong>Mikel Rivera</strong>.
                </p>
                <p className={styles.paragraph}>
                  Auction Draft is primarily a casual, local mobile game. We respect your privacy and are committed to handling information transparently. This document clearly explains what data is processed when you download and play Auction Draft on your mobile device.
                </p>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>
                  Esta Política de Privacidad se aplica a la aplicación de juego móvil <strong>Auction Draft</strong> (en adelante, "la App"), desarrollada por <strong>Mikel Rivera</strong>.
                </p>
                <p className={styles.paragraph}>
                  Auction Draft es un juego móvil principalmente casual y local. Respetamos tu privacidad y nos comprometemos a tratar la información con total transparencia. Este documento explica de manera clara cómo se manejan los datos cuando descargas y juegas a Auction Draft en tu dispositivo.
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
              {lang === "en" ? "2.1 Information provided directly by the user" : "2.1 Información proporcionada directamente por el usuario"}
            </h3>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>
                  Currently, Auction Draft <strong>does not require</strong> users to provide personal identification details. We do not ask for or collect:
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Account creation or user registration</li>
                  <li className={styles.listItem}>Real name or username</li>
                  <li className={styles.listItem}>Email address</li>
                  <li className={styles.listItem}>Phone number</li>
                  <li className={styles.listItem}>Precise or approximate physical location</li>
                </ul>
                <p className={styles.paragraph}>
                  Furthermore, the App does not request access to your device's contacts, camera, microphone, photo gallery, or local file system outside of the standard isolated application container.
                </p>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>
                  Actualmente, Auction Draft <strong>no requiere</strong> que los usuarios proporcionen datos de identificación personal. No solicitamos ni recopilamos:
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Creación de cuenta o registro de usuario</li>
                  <li className={styles.listItem}>Nombre real o nombre de usuario</li>
                  <li className={styles.listItem}>Dirección de correo electrónico</li>
                  <li className={styles.listItem}>Número de teléfono</li>
                  <li className={styles.listItem}>Ubicación física precisa o aproximada</li>
                </ul>
                <p className={styles.paragraph}>
                  Asimismo, la App no solicita acceso a tus contactos, cámara, micrófono, galería de fotos ni al sistema de archivos local fuera del contenedor aislado estándar de la aplicación.
                </p>
              </>
            )}

            <h3 className={styles.subSectionTitle}>
              {lang === "en" ? "2.2 Local App Data" : "2.2 Datos Locales de la Aplicación"}
            </h3>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>
                  Auction Draft processes game sessions locally on your device. The App stores minimal local data using device storage mechanisms to maintain your gameplay state. This may include:
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>App settings & preferences (e.g., sound toggles)</li>
                  <li className={styles.listItem}>Selected language preference</li>
                  <li className={styles.listItem}>Local game progression and draft history</li>
                  <li className={styles.listItem}>Unlocked content & category status</li>
                </ul>
                <p className={styles.paragraph}>
                  <strong>Note:</strong> All local app data remains stored strictly on your device and is not transmitted to any external server managed by us.
                </p>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>
                  Auction Draft procesa las partidas localmente en tu dispositivo. La App almacena datos locales mínimos mediante mecanismos de almacenamiento interno del dispositivo para mantener el estado de tu juego. Esto puede incluir:
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Configuración y preferencias de la App (ej. sonido)</li>
                  <li className={styles.listItem}>Preferencia de idioma seleccionado</li>
                  <li className={styles.listItem}>Progresión local del juego e historial de drafts</li>
                  <li className={styles.listItem}>Estado del contenido y categorías desbloqueadas</li>
                </ul>
                <p className={styles.paragraph}>
                  <strong>Nota:</strong> Todos los datos locales de la aplicación permanecen guardados estrictamente en tu dispositivo y no se transmiten a ningún servidor externo gestionado por nosotros.
                </p>
              </>
            )}
          </section>

          {/* 3. In-App Purchases */}
          <section id="purchases" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "3. In-App Purchases" : "3. Compras en la Aplicación"}
            </h2>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>
                  Auction Draft is a free-to-play mobile application that may offer optional in-app purchases, such as category packs, premium content, or full version unlocks.
                </p>
                <p className={styles.paragraph}>
                  All payment transactions are processed directly and securely by standard app stores:
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}><strong>Android:</strong> Processed via <strong>Google Play Billing</strong>.</li>
                  <li className={styles.listItem}><strong>iOS:</strong> Processed via <strong>Apple In-App Purchase system</strong>.</li>
                </ul>
                <p className={styles.paragraph}>
                  Auction Draft and its developer <strong>do not collect, store, or have access to</strong> your payment card numbers, bank account details, or billing addresses. Purchases are governed by the respective terms of service and privacy policies of Google Play or Apple.
                </p>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>
                  Auction Draft es una aplicación gratuita que puede ofrecer compras opcionales dentro de la app, como paquetes de categorías, contenido premium o desbloqueo de la versión completa.
                </p>
                <p className={styles.paragraph}>
                  Todas las transacciones de pago son procesadas de forma directa y segura por las tiendas oficiales de aplicaciones:
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}><strong>Android:</strong> Procesadas a través de <strong>Google Play Billing</strong>.</li>
                  <li className={styles.listItem}><strong>iOS:</strong> Procesadas a través del sistema de <strong>Compras Integradas de Apple</strong>.</li>
                </ul>
                <p className={styles.paragraph}>
                  Auction Draft y su desarrollador <strong>no recopilan, almacenan ni tienen acceso</strong> a los números de tarjeta bancaria, datos de cuenta ni direcciones de facturación completa. Las compras están sujetas a las condiciones de servicio y políticas de privacidad correspondientes de Google Play o Apple.
                </p>
              </>
            )}
          </section>

          {/* 4. Third-Party Services */}
          <section id="third-party" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "4. Third-Party Services" : "4. Servicios de Terceros"}
            </h2>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>
                  The App is built using the Expo framework and standard React Native components. It uses official platform store services (Google Play Services / Apple App Store infrastructure) to deliver app updates and process purchases.
                </p>
                <p className={styles.paragraph}>
                  Auction Draft currently <strong>does not integrate third-party advertising SDKs, user tracking analytics tools, or external backend services</strong> (such as Firebase Analytics, AdMob, or Supabase). If operating system libraries or store frameworks collect technical diagnostic data, such data is governed directly by the platform provider's privacy policies.
                </p>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>
                  La App está construida utilizando el entorno Expo y componentes estándar de React Native. Utiliza los servicios oficiales de las plataformas (Google Play Services / infraestructura de Apple App Store) para ofrecer actualizaciones y procesar compras.
                </p>
                <p className={styles.paragraph}>
                  Auction Draft actualmente <strong>no integra SDKs de publicidad de terceros, herramientas de analítica y rastreo de usuarios, ni servicios de backend externos</strong> (tales como Firebase Analytics, AdMob o Supabase). Si las librerías del sistema operativo o los entornos de las tiendas recopilan datos técnicos de diagnóstico, dichos datos se rigen directamente por las políticas de privacidad de los proveedores de dichas plataformas.
                </p>
              </>
            )}
          </section>

          {/* 5. Data Sharing */}
          <section id="sharing" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "5. Data Sharing" : "5. Intercambio de Datos"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                We do not sell, trade, rent, or share personal data with third parties. Since Auction Draft does not collect personal identity information, no personal profiles or tracking identifiers are transmitted to third-party advertisers or brokers.
              </p>
            ) : (
              <p className={styles.paragraph}>
                No vendemos, comercializamos, alquilamos ni compartimos datos personales con terceros. Dado que Auction Draft no recopila información de identificación personal, no se transmiten perfiles personales ni identificadores de rastreo a anunciantes ni intermediarios.
              </p>
            )}
          </section>

          {/* 6. Data Retention */}
          <section id="retention" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "6. Data Retention" : "6. Conservación de Datos"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Because all game progress and preferences are stored locally on your device, you retain complete control over your data. You can erase all stored data at any time by:
              </p>
            ) : (
              <p className={styles.paragraph}>
                Dado que todo el progreso y las preferencias del juego se almacenan localmente en tu dispositivo, tú mantienes el control total sobre tus datos. Puedes eliminar todos los datos almacenados en cualquier momento:
              </p>
            )}
            <ul className={styles.list}>
              <li className={styles.listItem}>
                {lang === "en" ? "Clearing application data/cache in your device settings." : "Borrando los datos/caché de la aplicación en los ajustes de tu dispositivo."}
              </li>
              <li className={styles.listItem}>
                {lang === "en" ? "Uninstalling the Auction Draft application from your mobile device." : "Desinstalando la aplicación Auction Draft de tu dispositivo móvil."}
              </li>
            </ul>
          </section>

          {/* 7. Children's Privacy */}
          <section id="children" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "7. Children's Privacy" : "7. Privacidad de Menores"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                Auction Draft is designed as a casual game suitable for a general audience. We do not knowingly solicit or collect personal information from children. If you are a parent or guardian and have questions regarding device usage or in-app purchases, we recommend configuring parental controls provided by Google Play or Apple on your child's device.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Auction Draft está diseñado como un juego casual apto para todo público. No solicitamos ni recopilamos a sabiendas información personal de menores. Si eres padre, madre o tutor legal y tienes preguntas sobre el uso del dispositivo o compras integradas, recomendamos configurar los controles parentales facilitados por Google Play o Apple en el dispositivo del menor.
              </p>
            )}
          </section>

          {/* 8. Security */}
          <section id="security" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "8. Security" : "8. Seguridad"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                We prioritize data protection by keeping your game data local to your device using standard operating system sandboxing. While no digital system can guarantee 100% security, local processing drastically minimizes risks associated with online data exposure.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Priorizamos la protección de datos manteniendo los datos de tu juego almacenados localmente en tu dispositivo mediante los mecanismos de aislamiento (sandboxing) del sistema operativo. Aunque ningún sistema digital es 100% impenetrable, el procesamiento local minimiza drásticamente los riesgos asociados a la exposición de datos en línea.
              </p>
            )}
          </section>

          {/* 9. User Rights */}
          <section id="rights" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "9. User Rights (GDPR & International)" : "9. Derechos del Usuario (RGPD e Internacional)"}
            </h2>
            {lang === "en" ? (
              <>
                <p className={styles.paragraph}>
                  Under privacy regulations such as the General Data Protection Regulation (GDPR) applicable in the European Union, European Economic Area, and Spain, users have rights regarding access, rectification, erasure, and portability of personal data.
                </p>
                <p className={styles.paragraph}>
                  Because Auction Draft does not maintain user accounts, central servers, or personal identity databases, traditional server-side data access or deletion requests are not applicable. You exercise your right to data deletion directly by clearing local app data or uninstalling the app. If you have inquiries regarding privacy rights, you may contact us using the contact details provided below.
                </p>
              </>
            ) : (
              <>
                <p className={styles.paragraph}>
                  Conforme a la normativa de privacidad como el Reglamento General de Protección de Datos (RGPD) aplicable en la Unión Europea, el Espacio Económico Europeo y España, los usuarios cuentan con derechos de acceso, rectificación, supresión y portabilidad de sus datos personales.
                </p>
                <p className={styles.paragraph}>
                  Dado que Auction Draft no mantiene cuentas de usuario, servidores centrales ni bases de datos de identidad personal, las solicitudes tradicionales de acceso o eliminación de datos en servidores no aplican. Ejerces tu derecho de supresión directamente al borrar los datos locales o desinstalar la app. Si tienes cualquier consulta sobre tus derechos de privacidad, puedes contactarnos a través de los medios indicados más abajo.
                </p>
              </>
            )}
          </section>

          {/* 10. Future Features & Updates */}
          <section id="future" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "10. Future Features & Policy Updates" : "10. Funcionalidades Futuras y Actualizaciones"}
            </h2>
            <div className={styles.highlightQuote}>
              {lang === "en" ? (
                <p style={{ margin: 0 }}>
                  "If new online features or services involving additional data processing are introduced, this Privacy Policy will be updated accordingly before or when those features become available."
                </p>
              ) : (
                <p style={{ margin: 0 }}>
                  "Si se introducen nuevas funcionalidades en línea o servicios que impliquen un tratamiento adicional de datos, esta Política de Privacidad se actualizará en consecuencia antes o en el momento en que dichas funcionalidades estén disponibles."
                </p>
              )}
            </div>
          </section>

          {/* 11. Changes to This Privacy Policy */}
          <section id="changes" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "11. Changes to This Privacy Policy" : "11. Cambios en esta Política de Privacidad"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                We may update this Privacy Policy from time to time to reflect changes in the App, legal requirements, or store policies. The latest version will always be published on this page with the updated effective date.
              </p>
            ) : (
              <p className={styles.paragraph}>
                Podremos actualizar esta Política de Privacidad periódicamente para reflejar cambios en la App, requisitos legales o políticas de las tiendas. La versión más reciente estará siempre publicada en esta página con la fecha de entrada en vigor actualizada.
              </p>
            )}
          </section>

          {/* 12. Contact */}
          <section id="contact" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "12. Contact Us" : "12. Contacto"}
            </h2>
            {lang === "en" ? (
              <p className={styles.paragraph}>
                If you have any questions, comments, or privacy concerns regarding Auction Draft, please contact:
              </p>
            ) : (
              <p className={styles.paragraph}>
                Si tienes preguntas, comentarios o alguna consulta sobre privacidad en Auction Draft, puedes contactar con:
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
            {t.homeLinkText}
          </a>
          <Link to="/auctiondraft/terms" className={styles.footerLink}>
            {t.termsLinkText}
          </Link>
        </footer>

      </div>
    </div>
  );
}
