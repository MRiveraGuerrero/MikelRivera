import React, { useEffect } from "react";
import AnimeHeader from "./components/AnimeHeader";
import AnimeFooter from "./components/AnimeFooter";
import styles from "./AnimePackOpeningLegal.module.css";

export default function AnimePackOpeningCookies() {
  useEffect(() => {
    document.title = "Política de Cookies | Anime Pack Opening TCG";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.legalWrapper}>
      <AnimeHeader packsAvailable={0} essence={0} />

      <main className={styles.legalContainer}>
        <div className={styles.legalHeader}>
          <div className={styles.legalBadge}>INFORMACIÓN SOBRE NAVEGACIÓN</div>
          <h1 className={styles.legalTitle}>Política de Cookies y Almacenamiento</h1>
          <p className={styles.legalMeta}>
            Transparencia técnica en el uso de cookies y LocalStorage en Anime Pack Opening
          </p>
        </div>

        <div className={styles.legalCard}>
          <section className={styles.legalSection}>
            <h2>1. ¿Qué son las cookies y el almacenamiento local?</h2>
            <p>
              Una cookie o elemento de almacenamiento local (LocalStorage) es un pequeño archivo de texto guardado en tu dispositivo para recordar tus preferencias de navegación, mantener activa tu sesión y almacenar temporalmente tus sobres de cartas.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>2. Cookies y Tecnologías utilizadas en Anime Pack Opening</h2>
            <p>En este sitio web utilizamos exclusivamente las siguientes categorías de cookies:</p>
            <ul>
              <li>
                <strong>Cookies Técnicas Esenciales (Supabase Auth):</strong> 
                Almacenan el token de acceso seguro (JWT) de tu sesión en Supabase para que no tengas que iniciar sesión cada vez que abres un sobre. No se pueden desactivar ya que son imprescindibles para el funcionamiento.
              </li>
              <li>
                <strong>Almacenamiento Local de Preferencias (LocalStorage):</strong> 
                Guarda el número de sobres disponibles (<code>anime_pack_opening_user_packs</code>), el balance de Esencia (<code>anime_pack_opening_user_essence</code>) y tu mazo local (<code>anime_pack_opening_user_collection</code>) cuando juegas en modo visitante.
              </li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>3. Ausencia de Cookies Publicitarias de Terceros</h2>
            <p>
              <strong>No utilizamos cookies de rastreo de redes publicitarias</strong> ni compartimos tus patrones de navegación con terceros para perfiles comerciales.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>4. Cómo gestionar o borrar cookies en tu navegador</h2>
            <p>
              Puedes borrar o bloquear las cookies en cualquier momento desde la configuración de tu navegador (Chrome, Firefox, Safari, Edge). Ten en cuenta que si borras las cookies del almacenamiento local en modo visitante, tu progreso no guardado en la nube se reiniciará.
            </p>
          </section>
        </div>
      </main>

      <AnimeFooter />
    </div>
  );
}
