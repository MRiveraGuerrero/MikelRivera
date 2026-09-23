import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AnimeHeader from "./components/AnimeHeader";
import AnimeFooter from "./components/AnimeFooter";
import styles from "./AnimePackOpeningLegal.module.css";

export default function AnimePackOpeningAccountDeletion() {
  useEffect(() => {
    document.title = "Eliminar Cuenta y Datos | Anime Pack Opening TCG";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.legalWrapper}>
      <AnimeHeader />

      <main className={styles.legalContainer}>
        <div className={styles.legalHeader}>
          <div className={styles.legalBadge}>CUMPLIMIENTO DE PRIVACIDAD GOOGLE PLAY</div>
          <h1 className={styles.legalTitle}>Eliminación de Cuenta y Datos</h1>
          <p className={styles.legalMeta}>
            Página oficial pública de información sobre el borrado de datos de usuario para Anime Pack Opening (Sakura Eclipse)
          </p>
        </div>

        <div className={styles.legalCard}>
          {/* MAIN INSTRUCTION: APP BUTTON DELETION */}
          <section className={styles.legalSection}>
            <h2>1. Cómo eliminar tu cuenta desde la Aplicación Móvil</h2>
            <div style={{ background: "rgba(255,42,117,0.08)", border: "1px solid rgba(255,42,117,0.25)", padding: "1.75rem", borderRadius: "16px", marginBottom: "1.5rem" }}>
              <h3 style={{ color: "#ffd700", fontFamily: "Oxanium", fontSize: "1.3rem", margin: "0 0 0.75rem 0" }}>
                📱 Eliminación directa desde el menú de la App
              </h3>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#f1f5f9", margin: "0 0 1rem 0" }}>
                La eliminación de la cuenta se realiza <strong>única y exclusivamente desde la propia aplicación móvil</strong> de Sakura Eclipse (Anime Pack Opening).
              </p>
              <ol style={{ paddingLeft: "1.25rem", color: "#cbd5e1", fontSize: "0.9rem", lineHeight: "1.7", margin: 0 }}>
                <li>Abre la aplicación móvil en tu dispositivo.</li>
                <li>Accede al menú de <strong>Ajustes / Perfil</strong>.</li>
                <li>Pulsa el botón **"Eliminar Cuenta"** y confirma la acción por escrito.</li>
              </ol>
            </div>
          </section>

          <section className={styles.legalSection}>
            <h2>2. ¿Qué datos se ELIMINAN permanentemente?</h2>
            <p>Al confirmar la eliminación desde el botón de la app, se suprimen de forma irreversible:</p>
            <ul>
              <li><strong>Datos de Cuenta:</strong> Registro de usuario en la base de datos y correo electrónico asociado.</li>
              <li><strong>Perfil de Jugador:</strong> Nombre de usuario público, avatar y fecha de registro.</li>
              <li><strong>Colección de Cartas:</strong> Mazo acumulado y cartas desveladas.</li>
              <li><strong>Recursos y Progreso:</strong> Balance de Esencia mística e historial de aperturas.</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>3. Datos conservados temporalmente por imperativo legal</h2>
            <p>
              Por razones estrictas de seguridad, auditoría y prevención de fraudes:
            </p>
            <ul>
              <li><strong>Registros Técnicos de Seguridad:</strong> Se podrán conservar logs de auditoría anónimos para la protección de la infraestructura.</li>
              <li><strong>Período de Conservación Adicional:</strong> [AÑADIR PERÍODO DE CONSERVACIÓN ADICIONAL - P. EJ. 30 DÍAS]. Tras este plazo, los registros se purgan definitivamente.</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>4. Soporte e Incidencias por Correo</h2>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", padding: "1.5rem", borderRadius: "16px" }}>
              <p style={{ fontSize: "0.9rem", color: "#cbd5e1", lineHeight: "1.6", margin: "0 0 1rem 0" }}>
                Si has perdido el acceso a tu dispositivo o necesitas soporte sobre la eliminación, puedes ponerte en contacto con el equipo de desarrollo a través del <Link to="/animepackopening/contacto" style={{ color: "#ff2a75", textDecoration: "underline" }}>Formulario de Contacto</Link> o escribiendo directamente a <strong>[AÑADIR CORREO DE SOPORTE]</strong>.
              </p>
              <p style={{ fontSize: "0.85rem", color: "#ffd700", margin: 0, fontStyle: "italic" }}>
                📌 Nota de Seguridad: Para proteger las cuentas de nuestros usuarios y evitar eliminaciones no autorizadas, se requerirá un proceso estricto de verificación previa de identidad y titularidad de la cuenta antes de gestionar cualquier solicitud por correo.
              </p>
            </div>
          </section>
        </div>
      </main>

      <AnimeFooter />
    </div>
  );
}
