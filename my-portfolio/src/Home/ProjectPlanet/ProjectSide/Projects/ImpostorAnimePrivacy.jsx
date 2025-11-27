import React from "react";
import styles from "./ImpostorAnimePrivacy.module.css";

const ImpostorAnimePrivacy = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Política de Privacidad de Impostor Anime</h1>
      <p className={styles.updated}>Última actualización: 27 de noviembre de 2025</p>

      <p>
        Esta Política de Privacidad describe cómo se recopilan, utilizan y protegen los
        datos de los usuarios de la aplicación móvil <strong>Impostor Anime</strong>
        (en adelante, “la App”), desarrollada por <strong>Mikel Rivera</strong>.
      </p>

      <h2 className={styles.sectionTitle}>1. Responsable del tratamiento</h2>
      <p><strong>Nombre:</strong> Mikel Rivera</p>
      <p>
        <strong>Correo de contacto:</strong>{" "}
        <a href="mailto:mikelrg2003@gmail.com" className={styles.link}>
          mikelrg2003@gmail.com
        </a>
      </p>

      <h2 className={styles.sectionTitle}>2. Datos que recopilamos</h2>
      <p>
        La App está diseñada para recopilar la menor cantidad posible de datos personales.
        No se solicita registro propio ni datos sensibles.
      </p>

      <h3 className={styles.subTitle}>2.1. Datos técnicos y de uso</h3>
      <p>Podemos recopilar datos anónimos como:</p>
      <ul className={styles.list}>
        <li>Modelo del dispositivo y sistema operativo.</li>
        <li>Idioma del dispositivo.</li>
        <li>País aproximado (según la configuración de Google Play).</li>
        <li>Eventos dentro de la App (inicio de partida, modo jugado, compras).</li>
      </ul>

      <h3 className={styles.subTitle}>2.2. Compras dentro de la App</h3>
      <p>
        Las compras integradas se gestionan exclusivamente a través de{" "}
        <strong>Google Play Billing</strong>. No almacenamos datos financieros.
      </p>

      <h2 className={styles.sectionTitle}>3. Finalidad del tratamiento</h2>
      <ul className={styles.list}>
        <li>Mejorar estabilidad y rendimiento.</li>
        <li>Corregir errores.</li>
        <li>Analizar qué modos se usan más.</li>
        <li>Gestionar compras y contenido desbloqueado.</li>
      </ul>

      <h2 className={styles.sectionTitle}>4. Servicios de terceros</h2>
      <p>La App puede usar servicios como:</p>
      <ul className={styles.list}>
        <li>Google Play Services</li>
        <li>Google Play Billing</li>
        <li>Firebase Analytics (si se activa)</li>
      </ul>

      <h2 className={styles.sectionTitle}>5. Menores de edad</h2>
      <p>
        La App no recoge datos sensibles. Aun así, se recomienda supervisión de un
        adulto en caso de compras integradas.
      </p>

      <h2 className={styles.sectionTitle}>6. Conservación de datos</h2>
      <p>
        Los datos anónimos se conservan mientras sean necesarios para los fines descritos
        o hasta que el usuario desinstale la App.
      </p>

      <h2 className={styles.sectionTitle}>7. Derechos del usuario</h2>
      <p>El usuario puede solicitar:</p>
      <ul className={styles.list}>
        <li>Acceso a los datos.</li>
        <li>Rectificación.</li>
        <li>Supresión.</li>
        <li>Limitación u oposición.</li>
      </ul>

      <h2 className={styles.sectionTitle}>8. Seguridad</h2>
      <p>
        Se aplican medidas razonables para proteger los datos, aunque ningún sistema es
        totalmente seguro.
      </p>

      <h2 className={styles.sectionTitle}>9. Cambios en esta Política</h2>
      <p>
        Podremos actualizar esta Política para reflejar cambios legales o mejoras en la
        App. La versión más reciente estará disponible en esta página.
      </p>

      <h2 className={styles.sectionTitle}>10. Contacto</h2>
      <p>
        <strong>Correo:</strong>{" "}
        <a href="mailto:mikelrg2003@gmail.com" className={styles.link}>
          mikelrg2003@gmail.com
        </a>
      </p>
    </main>
  );
};

export default ImpostorAnimePrivacy;
