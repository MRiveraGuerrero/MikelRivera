import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AnimeHeader from "./components/AnimeHeader";
import AnimeFooter from "./components/AnimeFooter";
import styles from "./AnimePackOpeningLegal.module.css";

export default function AnimePackOpeningPrivacy() {
  useEffect(() => {
    document.title = "Política de Privacidad | Anime Pack Opening TCG";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.legalWrapper}>
      <AnimeHeader packsAvailable={0} essence={0} />

      <main className={styles.legalContainer}>
        <div className={styles.legalHeader}>
          <div className={styles.legalBadge}>DOCUMENTACIÓN LEGAL OFICIAL</div>
          <h1 className={styles.legalTitle}>Política de Privacidad</h1>
          <p className={styles.legalMeta}>
            Última actualización: 23 de septiembre de 2026 | Aplicable a Anime Pack Opening
          </p>
        </div>

        <div className={styles.legalCard}>
          <section className={styles.legalSection}>
            <h2>1. Identidad del Responsable del Tratamiento</h2>
            <p>
              El responsable del tratamiento de los datos personales recopilados a través del juego de cartas coleccionables y sitio web <strong>Anime Pack Opening (Sakura Eclipse)</strong> es:
            </p>
            <ul>
              <li><strong>Nombre Legal / Desarrollador:</strong> [AÑADIR NOMBRE LEGAL DEL DESARROLLADOR]</li>
              <li><strong>Correo de Soporte y Privacidad:</strong> [AÑADIR CORREO DE SOPORTE]</li>
              <li><strong>Dominio Oficial:</strong> [AÑADIR DOMINIO OFICIAL]</li>
              <li><strong>Ubicación / Jurisdicción:</strong> España / Unión Europea</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>2. Datos Personales que Recopilamos</h2>
            <p>
              En función de tu interacción con Anime Pack Opening (modo visitante o cuenta registrada), procesamos únicamente los datos necesarios para proporcionar la experiencia de juego:
            </p>
            <ul>
              <li><strong>Datos de Identificación y Cuenta:</strong> Dirección de correo electrónico, nombre de usuario público e identificador único de usuario (User ID UUID en Supabase).</li>
              <li><strong>Datos de Progreso y Colección:</strong> Cartas desveladas, inventario de sobres, balance de Esencia mística y registros de aperturas.</li>
              <li><strong>Datos Técnicos de Seguridad:</strong> Dirección IP anonimizada, registros de sesión (tokens JWT), versión del navegador o dispositivo e informes de errores.</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>3. Finalidad y Base Legal del Tratamiento</h2>
            <p>Tratamos tus datos con las siguientes finalidades legítimas:</p>
            <ul>
              <li><strong>Ejecución del Servicio (Contrato):</strong> Permitir la creación de cuenta, guardar tu mazo de cartas y sincronizar tu colección.</li>
              <li><strong>Interés Legítimo y Seguridad:</strong> Prevenir fraudes en las aperturas de sobres, proteger la infraestructura y gestionar solicitudes de soporte.</li>
              <li><strong>Consentimiento Explícito:</strong> Responder a mensajes enviados desde el formulario de contacto o gestionar solicitudes de eliminación de datos.</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>4. Proveedores de Infraestructura y Terceros</h2>
            <p>
              Para prestar el servicio utilizamos los siguientes proveedores de servicios certificados:
            </p>
            <ul>
              <li><strong>Supabase Inc. (Base de Datos y Autenticación):</strong> Aloja la infraestructura de autenticación de usuarios y almacenamiento de colecciones mediante políticas RLS (Row Level Security). URL del proyecto: [AÑADIR URL DE SUPABASE].</li>
            </ul>
            <p>
              <strong>No vendemos</strong> ni comercializamos datos personales con terceros para fines publicitarios o de telemarketing.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>5. Plazos de Conservación de los Datos</h2>
            <p>
              Los datos se conservan mientras la cuenta de usuario permanezca activa. Si solicitas la eliminación de tu cuenta, los datos personales asociados se suprimen de forma inmediata o en un plazo máximo de 30 días, conservando únicamente los registros mínimos legalmente exigibles para la prevención de fraudes.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>6. Derechos de los Usuarios (ARCO+)</h2>
            <p>
              Conforme al Reglamento General de Protección de Datos (RGPD) y la LOPDGDD, tienes derecho a solicitar en cualquier momento:
            </p>
            <ul>
              <li><strong>Acceso:</strong> Obtener confirmación sobre si estamos tratando tus datos.</li>
              <li><strong>Rectificación:</strong> Modificar datos inexactos o incompletos.</li>
              <li><strong>Supresión / Eliminación:</strong> Solicitar el borrado de tu cuenta y colección a través de la sección <Link to="/animepackopening/eliminar-cuenta" className={styles.legalLink}>Eliminación de Cuenta</Link>.</li>
              <li><strong>Oposición y Limitación:</strong> Solicitar la restricción del tratamiento.</li>
              <li><strong>Portabilidad:</strong> Recibir tus datos en un formato estructurado y de lectura mecánica.</li>
            </ul>
            <p>
              Para ejercitar cualquiera de estos derechos, envía un mensaje indicando tu ID o correo a: <strong>[AÑADIR CORREO DE SOPORTE]</strong>.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>7. Protección de Menores</h2>
            <p>
              Anime Pack Opening no está dirigido intencionadamente a menores de 14 años sin la supervisión o consentimiento de sus tutores legales. Si detectamos una cuenta creada por un menor sin autorización, procederemos a su cancelación.
            </p>
          </section>
        </div>
      </main>

      <AnimeFooter />
    </div>
  );
}
