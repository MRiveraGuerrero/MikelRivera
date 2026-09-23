import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AnimeHeader from "./components/AnimeHeader";
import AnimeFooter from "./components/AnimeFooter";
import styles from "./AnimePackOpeningLegal.module.css";

export default function AnimePackOpeningTerms() {
  useEffect(() => {
    document.title = "Términos y Condiciones | Anime Pack Opening TCG";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.legalWrapper}>
      <AnimeHeader packsAvailable={0} essence={0} />

      <main className={styles.legalContainer}>
        <div className={styles.legalHeader}>
          <div className={styles.legalBadge}>DOCUMENTACIÓN LEGAL OFICIAL</div>
          <h1 className={styles.legalTitle}>Términos y Condiciones de Uso</h1>
          <p className={styles.legalMeta}>
            Fecha de entrada en vigor: 23 de septiembre de 2026 | Desarrollado por [AÑADIR NOMBRE LEGAL DEL DESARROLLADOR]
          </p>
        </div>

        <div className={styles.legalCard}>
          <section className={styles.legalSection}>
            <h2>1. Identificación del Desarrollador y Aceptación</h2>
            <p>
              Los presentes Términos regulan el acceso y uso del sitio web y juego <strong>Anime Pack Opening (Sakura Eclipse)</strong>, gestionado por [AÑADIR NOMBRE LEGAL DEL DESARROLLADOR] (en adelante, "el Desarrollador").
            </p>
            <p>
              Al acceder al sitio, abrir sobres de cartas o registrar una cuenta, aceptas quedar vinculado expresamente por estas condiciones. Si no estás de acuerdo con alguno de los términos, debes abstenerte de utilizar el servicio.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>2. Descripción del Servicio y Mecánica de Sobres</h2>
            <p>
              Anime Pack Opening es una plataforma digital de entretenimiento y juego de cartas coleccionables (TCG). Ofrece la experiencia de desvelar sobres digitales, acumular cartas virtuales en una colección personal y obtener Esencia mística por duplicados.
            </p>
            <p>
              <strong>Aclaración Importante:</strong> Las cartas, sobres y puntos de Esencia son bienes digitales virtuales sin valor monetario real. <strong>No constituyen apuestas, juegos de azar con dinero real ni otorgan premios canjeables por dinero en efectivo.</strong>
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>3. Requisitos de Edad y Registro de Cuenta</h2>
            <p>
              Para crear una cuenta en Anime Pack Opening debes tener al menos 14 años de edad. El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso creadas mediante el sistema Supabase Auth.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>4. Conductas Prohibidas</h2>
            <p>Queda estrictamente prohibido:</p>
            <ul>
              <li>Utilizar bots, scripts automatizados o hacks para alterar las probabilidades de apertura de sobres.</li>
              <li>Intentar vulnerar la seguridad de la base de datos Supabase o acceder a cuentas ajenas.</li>
              <li>Vender, subastar o comerciar con cuentas o cartas digitales fuera de los mecanismos autorizados por el juego.</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>5. Propiedad Intelectual</h2>
            <p>
              El nombre Anime Pack Opening, Sakura Eclipse, el logotipo, el diseño de la interfaz, el código fuente, las ilustraciones SVG originales y las descripciones de las cartas son propiedad exclusiva del Desarrollador. No se otorga ninguna licencia salvo el uso personal no comercial.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>6. Disponibilidad y Suspensión del Servicio</h2>
            <p>
              El Desarrollador se reserva el derecho de realizar mantenimientos, actualizar las cartas disponibles o suspender el servicio temporalmente sin previo aviso para garantizar la seguridad.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>7. Cancelación y Eliminación de Datos</h2>
            <p>
              Puedes solicitar la baja de tu cuenta y el borrado de tus datos en cualquier momento accediendo a <Link to="/animepackopening/eliminar-cuenta" className={styles.legalLink}>Eliminación de Cuenta</Link>.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>8. Legislación Aplicable y Jurisdicción</h2>
            <p>
              Estos Términos se rigen por la legislación aplicable en [AÑADIR CIUDAD / PAÍS DE JURISDICCIÓN]. Para cualquier controversia, las partes se someten a los juzgados del domicilio del consumidor conforme a la normativa vigente.
            </p>
          </section>
        </div>
      </main>

      <AnimeFooter />
    </div>
  );
}
