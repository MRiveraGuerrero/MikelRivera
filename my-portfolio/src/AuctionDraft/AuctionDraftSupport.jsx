import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./AuctionDraftLegal.module.css";

const content = {
  en: {
    pageTitle: "Support & Help Center | Auction Draft — $20 Battle",
    metaDesc: "Help center, FAQ, game rules, online multiplayer troubleshooting, and support contact for the Auction Draft mobile game.",
    headerTag: "Auction Draft Support Center",
    lastUpdated: "September 10, 2026",
    title: "Game Support & Help Center",
    subtitle: "Need assistance with Auction Draft? Browse our frequently asked questions, learn game mechanics, fix connection issues, or contact support.",
    tocTitle: "Support Topics",
    sections: [
      { id: "faq", label: "1. Frequently Asked Questions" },
      { id: "gameplay", label: "2. How to Play & Game Mechanics" },
      { id: "multiplayer", label: "3. Online Multiplayer & Room Codes" },
      { id: "purchases", label: "4. In-App Purchases & Restoring Unlocks" },
      { id: "troubleshooting", label: "5. Troubleshooting & Bug Reports" },
      { id: "contact", label: "6. Direct Contact Support" }
    ],
    homeLinkText: "← Back to Auction Draft",
    privacyLinkText: "Privacy Policy",
    termsLinkText: "Terms & Conditions"
  },
  es: {
    pageTitle: "Soporte y Centro de Ayuda | Auction Draft — Batalla de $20",
    metaDesc: "Centro de ayuda, preguntas frecuentes, reglas, solución de problemas multijugador y contacto de soporte para el juego móvil Auction Draft.",
    headerTag: "Centro de Soporte Auction Draft",
    lastUpdated: "10 de septiembre de 2026",
    title: "Soporte y Centro de Ayuda",
    subtitle: "¿Necesitas ayuda con Auction Draft? Consulta las preguntas frecuentes, aprende las mecánicas, resuelve problemas de conexión o escríbenos directamente.",
    tocTitle: "Temas de Ayuda",
    sections: [
      { id: "faq", label: "1. Preguntas Frecuentes (FAQ)" },
      { id: "gameplay", label: "2. Cómo Jugar y Mecánicas de Juego" },
      { id: "multiplayer", label: "3. Multijugador En Línea y Códigos de Sala" },
      { id: "purchases", label: "4. Compras Integradas y Restaurar Contenido" },
      { id: "troubleshooting", label: "5. Solución de Problemas y Errores" },
      { id: "contact", label: "6. Contacto Directo de Soporte" }
    ],
    homeLinkText: "← Volver a Auction Draft",
    privacyLinkText: "Política de Privacidad",
    termsLinkText: "Términos y Condiciones"
  }
};

export default function AuctionDraftSupport() {
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
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
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
        <nav className={styles.tocCard} aria-label="Support topics">
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

          {/* 1. FAQ */}
          <section id="faq" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "1. Frequently Asked Questions (FAQ)" : "1. Preguntas Frecuentes (FAQ)"}
            </h2>

            <h3 className={styles.subSectionTitle}>
              {lang === "en" ? "What is Auction Draft?" : "¿Qué es Auction Draft?"}
            </h3>
            <p className={styles.paragraph}>
              {lang === "en"
                ? "Auction Draft is a competitive 1v1 casual mobile game where two players receive a virtual starting budget of $20 to bid on thematic items (such as Anime, Sports, Movies, Games, etc.). Once all picks are placed, hidden card scores are revealed to determine who built the ultimate draft."
                : "Auction Draft es un juego móvil casual competitivo 1vs1 donde dos jugadores reciben un presupuesto virtual inicial de $20 para pujar por elementos temáticos (Anime, Deportes, Películas, Videojuegos, etc.). Al finalizar el draft, se revelan las puntuaciones ocultas de cada carta para declarar al ganador."}
            </p>

            <h3 className={styles.subSectionTitle}>
              {lang === "en" ? "Is Auction Draft free to play?" : "¿Auction Draft es gratuito?"}
            </h3>
            <p className={styles.paragraph}>
              {lang === "en"
                ? "Yes! Auction Draft is completely free to download and play. Both local pass-and-play and online 1v1 multiplayer modes are free. Optional category expansions or ad removal can be unlocked via Premium purchases."
                : "¡Sí! Auction Draft se puede descargar y jugar de forma totalmente gratuita. Tanto el modo local como el multijugador 1vs1 en línea son gratis. Opcionalmente puedes adquirir la versión Premium para desbloquear todas las categorías y eliminar la publicidad."}
            </p>

            <h3 className={styles.subSectionTitle}>
              {lang === "en" ? "Does the $20 budget involve real money?" : "¿El presupuesto de $20 utiliza dinero real?"}
            </h3>
            <div className={styles.warningBox}>
              <div className={styles.warningTitle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                {lang === "en" ? "FICTIONAL IN-GAME CURRENCY" : "MONEDA FICTICIA DENTRO DEL JUEGO"}
              </div>
              <span>
                {lang === "en"
                  ? "No real money is spent or gambled during matches. The $20 budget consists purely of fictional in-game virtual points designed solely for auction bidding mechanics."
                  : "No se gasta ni se apuesta dinero real durante las partidas. El presupuesto de $20 son puntos virtuales ficticios dentro del juego diseñados exclusivamente para la mecánica de pujas."}
              </span>
            </div>

            <h3 className={styles.subSectionTitle}>
              {lang === "en" ? "Do I need to register an account?" : "¿Necesito registrar una cuenta?"}
            </h3>
            <p className={styles.paragraph}>
              {lang === "en"
                ? "No registration is required! You can open Auction Draft and jump directly into a local match or generate a room code for online multiplayer without entering emails or creating passwords."
                : "¡No se requiere ningún registro! Puedes abrir Auction Draft y jugar inmediatamente en local o crear una sala en línea compartiendo un código, sin necesidad de ingresar correos ni contraseñas."}
            </p>
          </section>

          {/* 2. Gameplay */}
          <section id="gameplay" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "2. How to Play & Game Rules" : "2. Cómo Jugar y Mecánicas de Juego"}
            </h2>

            <p className={styles.paragraph}>
              {lang === "en"
                ? "Auction Draft mixes strategic budget management with draft building. Here is a step-by-step breakdown of how a match works:"
                : "Auction Draft combina la gestión estratégica del presupuesto con la construcción de equipos o drafts. Así funciona una partida paso a paso:"}
            </p>

            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>{lang === "en" ? "1. Select Category & Mode:" : "1. Elige Categoría y Modo:"}</strong>{" "}
                {lang === "en"
                  ? "Choose between Local Pass & Play or Online 1v1 Room, and pick your favorite category (e.g. Football Legends, Superheroes, Anime, Cinema)."
                  : "Elige entre Pase y Juega Local o Sala Multijugador 1vs1 En Línea, y selecciona tu categoría favorita (ej. Leyendas del Fútbol, Superhéroes, Anime, Cine)."}
              </li>
              <li className={styles.listItem}>
                <strong>{lang === "en" ? "2. Starting Budget ($20):" : "2. Presupuesto Inicial ($20):"}</strong>{" "}
                {lang === "en"
                  ? "Both players begin with $20 in virtual cash."
                  : "Ambos jugadores comienzan con $20 virtuales."}
              </li>
              <li className={styles.listItem}>
                <strong>{lang === "en" ? "3. Bidding Rounds:" : "3. Rondas de Puja:"}</strong>{" "}
                {lang === "en"
                  ? "An item card is drawn. Players place secret or turn-based bids. The highest bidder claims the item and pays their bid amount from their $20 budget."
                  : "Se presenta una carta de elemento. Los jugadores realizan sus pujas. El mejor postor se queda con el elemento y se le descuenta el importe de su presupuesto."}
              </li>
              <li className={styles.listItem}>
                <strong>{lang === "en" ? "4. Revealing & Victory:" : "4. Revelación y Victoria:"}</strong>{" "}
                {lang === "en"
                  ? "Once drafts are completed, each item reveals its hidden rating score. The player with the highest total score sum wins the battle!"
                  : "Una vez completado el draft, cada elemento revela su puntuación ocultación. ¡El jugador con la suma total de puntos más alta gana la batalla!"}
              </li>
            </ul>
          </section>

          {/* 3. Multiplayer */}
          <section id="multiplayer" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "3. Online Multiplayer & Room Codes" : "3. Multijugador En Línea y Códigos de Sala"}
            </h2>

            <h3 className={styles.subSectionTitle}>
              {lang === "en" ? "How do Online Rooms work?" : "¿Cómo funcionan las Salas En Línea?"}
            </h3>
            <p className={styles.paragraph}>
              {lang === "en"
                ? "Online multiplayer allows two players to battle remotely in real time using 6-digit room codes."
                : "El modo multijugador en línea permite a dos jugadores competir a distancia en tiempo real utilizando códigos de sala de 6 dígitos."}
            </p>

            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>{lang === "en" ? "Host (Creator):" : "Anfitrión (Creador):"}</strong>{" "}
                {lang === "en"
                  ? "Tap 'Online 1v1' → 'Create Room'. A 6-digit code will appear on your screen. Share this code with your friend."
                  : "Pulsa 'Multijugador 1vs1' → 'Crear Sala'. Aparecerá un código de 6 dígitos en tu pantalla. Comparte este código con tu amigo."}
              </li>
              <li className={styles.listItem}>
                <strong>{lang === "en" ? "Guest (Joiner):" : "Invitado (Unirse):"}</strong>{" "}
                {lang === "en"
                  ? "Tap 'Online 1v1' → 'Join Room', type in the 6-digit code provided by the host, and tap Connect."
                  : "Pulsa 'Multijugador 1vs1' → 'Unirse a Sala', introduce el código de 6 dígitos que te facilitó el anfitrión y pulsa Conectar."}
              </li>
            </ul>

            <h3 className={styles.subSectionTitle}>
              {lang === "en" ? "Connection or Room Code Errors" : "Errores de Conexión o Código de Sala"}
            </h3>
            {lang === "en" ? (
              <ul className={styles.list}>
                <li className={styles.listItem}><strong>Invalid Code:</strong> Double-check the 6-digit room code with the host. Codes are case-insensitive.</li>
                <li className={styles.listItem}><strong>Room Full:</strong> Rooms support exactly 2 players. If someone else joined first, create a new room.</li>
                <li className={styles.listItem}><strong>Connection Drop:</strong> Ensure both devices have an active Wi-Fi or cellular data connection. Temporary network glitches can be resolved by host creating a fresh room code.</li>
              </ul>
            ) : (
              <ul className={styles.list}>
                <li className={styles.listItem}><strong>Código no válido:</strong> Verifica detenidamente el código de 6 dígitos con el anfitrión. No diferencia entre mayúsculas y minúsculas.</li>
                <li className={styles.listItem}><strong>Sala Llena:</strong> Las salas admiten exactamente 2 jugadores. Si alguien más se ha unido antes, crea una sala nueva.</li>
                <li className={styles.listItem}><strong>Caída de Conexión:</strong> Comprueba que ambos dispositivos tengan conexión a Internet (Wi-Fi o datos). Si se interrumpe, el anfitrión puede generar un nuevo código.</li>
              </ul>
            )}
          </section>

          {/* 4. Purchases */}
          <section id="purchases" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "4. In-App Purchases & Restoring Unlocks" : "4. Compras Integradas y Restaurar Contenido"}
            </h2>

            <p className={styles.paragraph}>
              {lang === "en"
                ? "Auction Draft offers optional digital purchases (such as Premium Category Unlocks or Ad Removal). All billing is handled securely through Google Play Billing (Android) or Apple App Store (iOS)."
                : "Auction Draft ofrece compras digitales opcionales (como desbloqueo de categorías Premium o eliminación de anuncios). La facturación se gestiona de forma segura a través de Google Play o Apple App Store."}
            </p>

            <h3 className={styles.subSectionTitle}>
              {lang === "en" ? "How to Restore Purchases on a New Device" : "Cómo Restaurar Compras en un Nuevo Dispositivo"}
            </h3>
            <p className={styles.paragraph}>
              {lang === "en"
                ? "If you reinstall the game or switch to a new phone logged into the same Google Play or Apple ID account:"
                : "Si reinstalas el juego o cambias de teléfono con la misma cuenta de Google Play o Apple ID:"}
            </p>

            <ul className={styles.list}>
              <li className={styles.listItem}>
                {lang === "en"
                  ? "Open Auction Draft → Go to Settings or Store → Tap 'Restore Purchases'."
                  : "Abre Auction Draft → Ve a Ajustes o Tienda → Pulsa 'Restaurar Compras'."}
              </li>
              <li className={styles.listItem}>
                {lang === "en"
                  ? "The store will verify your account's purchase history and grant your unlocked content instantly."
                  : "La tienda verificará el historial de compras de tu cuenta y desbloqueará el contenido al instante."}
              </li>
            </ul>

            <h3 className={styles.subSectionTitle}>
              {lang === "en" ? "Refund Requests" : "Solicitudes de Reembolso"}
            </h3>
            <p className={styles.paragraph}>
              {lang === "en"
                ? "As all store transactions are processed directly by platform operators, refunds are subject to Google Play or Apple App Store standard refund policies. You can request a refund directly through your store purchase receipt."
                : "Dado que las compras son procesadas por las plataformas oficiales, los reembolsos se rigen por las políticas de Google Play o Apple. Puedes solicitar un reembolso directamente a través del recibo de compra de la tienda."}
            </p>
          </section>

          {/* 5. Troubleshooting */}
          <section id="troubleshooting" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "5. Troubleshooting & Bug Reports" : "5. Solución de Problemas y Errores"}
            </h2>

            <h3 className={styles.subSectionTitle}>
              {lang === "en" ? "Game Freezing or Audio Issues" : "El Juego se Congela o Problemas de Audio"}
            </h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                {lang === "en"
                  ? "Force close the application and re-open it."
                  : "Cierra la aplicación por completo y vuelve a abrirla."}
              </li>
              <li className={styles.listItem}>
                {lang === "en"
                  ? "Check Google Play / App Store to verify you are running the latest app version."
                  : "Comprueba en la Google Play Store / App Store si hay alguna actualización disponible."}
              </li>
              <li className={styles.listItem}>
                {lang === "en"
                  ? "Clear the app cache in device settings if issues persist."
                  : "Borra la memoria caché de la app en los ajustes de tu dispositivo si el problema persiste."}
              </li>
            </ul>

            <h3 className={styles.subSectionTitle}>
              {lang === "en" ? "How to Report a Bug or Card Error" : "Cómo Informar de un Error o Fallo en Cartas"}
            </h3>
            <p className={styles.paragraph}>
              {lang === "en"
                ? "If you notice a typo in a card dataset, incorrect rating score balance, or a technical bug during online play, we appreciate your help in letting us know!"
                : "Si detectas algún error tipográfico en una carta, un desequilibrio en las puntuaciones o un fallo técnico durante el juego en línea, ¡agradecemos mucho tu colaboración!"}
            </p>
            <p className={styles.paragraph}>
              {lang === "en"
                ? "Please send an email to our support inbox with:"
                : "Por favor, envía un correo electrónico a nuestro buzón de soporte indicando:"}
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>{lang === "en" ? "Your device model and OS version (Android/iOS)" : "Tu modelo de dispositivo y versión de sistema (Android/iOS)"}</li>
              <li className={styles.listItem}>{lang === "en" ? "A short description of what happened" : "Una breve descripción de lo que sucedió"}</li>
              <li className={styles.listItem}>{lang === "en" ? "Screenshots or video recording (if applicable)" : "Capturas de pantalla o vídeo (si corresponde)"}</li>
            </ul>
          </section>

          {/* 6. Contact */}
          <section id="contact" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {lang === "en" ? "6. Direct Contact Support" : "6. Contacto Directo de Soporte"}
            </h2>
            <p className={styles.paragraph}>
              {lang === "en"
                ? "Have a question not answered here? Reach out to the developer directly:"
                : "¿Tienes alguna pregunta que no aparezca aquí? Ponte en contacto directamente con el desarrollador:"}
            </p>

            <div className={styles.highlightQuote}>
              <strong>Mikel Rivera Guerrero</strong>
              <br />
              <strong>{lang === "en" ? "Email:" : "Correo:"}</strong>{" "}
              <a href="mailto:mikelrg2003@gmail.com" className={styles.link}>
                mikelrg2003@gmail.com
              </a>
              <br />
              <strong>{lang === "en" ? "Website:" : "Sitio Web:"}</strong>{" "}
              <a href="https://mikelrivera.com" className={styles.link} target="_blank" rel="noopener noreferrer">
                https://mikelrivera.com
              </a>
            </div>

            <p className={styles.paragraph}>
              {lang === "en"
                ? "Support emails are typically responded to within 24 to 48 hours. Official developer links:"
                : "Los correos de soporte suelen ser respondidos en un plazo de 24 a 48 horas. Enlaces oficiales:"}
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
          <Link to="/auctiondraft/privacy" className={styles.footerLink}>
            {t.privacyLinkText}
          </Link>
          <Link to="/auctiondraft/terms" className={styles.footerLink}>
            {t.termsLinkText}
          </Link>
        </footer>

      </div>
    </div>
  );
}
