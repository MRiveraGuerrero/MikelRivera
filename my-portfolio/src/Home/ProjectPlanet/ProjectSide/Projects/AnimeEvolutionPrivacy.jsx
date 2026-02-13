import React, { useMemo } from "react";

/**
 * PrivacyPolicy.jsx
 * - Página lista para meter en Next.js o React (SPA).
 * - Incluye índice, secciones, placeholders y contacto.
 *
 * Uso:
 * 1) Next.js App Router: /app/privacy/page.jsx -> export default function Page(){ return <PrivacyPolicy /> }
 * 2) Next.js Pages Router: /pages/privacy.jsx -> export default PrivacyPolicy
 * 3) React Router: route "/privacy" -> <PrivacyPolicy />
 */

const DEFAULTS = {
    siteName: "MikelRivera.com",
    ownerName: "Mikel Rivera",
    ownerEmail: "mikelrg2003@gmail.com", // <-- cambia esto
    country: "España",
    city: "Bilbao",
    updatedAt: "2026-02-13", // YYYY-MM-DD (hoy)
    // Si tienes negocio/empresa, completa:
    legalEntity: "", // e.g. "Mikel Rivera (Autónomo)" o "Webrior SL"
    address: "", // e.g. "C/ Ejemplo 123, 48000 Bilbao"
    // Si usas herramientas típicas, deja true y rellena IDs/links cuando toque:
    usesAnalytics: true,
    usesContactForms: true,
    usesEmailMarketing: false,
    usesPayments: false,
    usesAds: false,
    // Si tienes apps/juegos, puedes activar esto para mencionar Play Console / Firebase etc.
    hasMobileApps: true,
};

const Section = ({ id, title, children }) => (
    <section id={id} style={{ scrollMarginTop: 90 }}>
        <h2 style={styles.h2}>{title}</h2>
        <div style={styles.sectionBody}>{children}</div>
    </section>
);

const Badge = ({ children }) => (
    <span style={styles.badge}>{children}</span>
);

const List = ({ children }) => (
    <ul style={styles.ul}>
        {children}
    </ul>
);

const A = ({ href, children }) => (
    <a href={href} style={styles.link}>
        {children}
    </a>
);

export default function PrivacyPolicy(props) {
    const cfg = useMemo(() => ({ ...DEFAULTS, ...(props?.config || {}) }), [props]);

    const toc = useMemo(
        () => [
            { id: "intro", label: "1. Quién es el responsable" },
            { id: "data", label: "2. Qué datos recogemos" },
            { id: "purposes", label: "3. Para qué los usamos" },
            { id: "legal-basis", label: "4. Base legal" },
            { id: "sharing", label: "5. Con quién compartimos datos" },
            { id: "international", label: "6. Transferencias internacionales" },
            { id: "retention", label: "7. Conservación" },
            { id: "rights", label: "8. Derechos" },
            { id: "cookies", label: "9. Cookies" },
            { id: "security", label: "10. Seguridad" },
            { id: "minors", label: "11. Menores" },
            { id: "changes", label: "12. Cambios en la política" },
            { id: "contact", label: "13. Contacto" },
        ],
        []
    );

    const flags = [
        cfg.usesAnalytics && { key: "analytics", label: "Analítica", hint: "Ej: Google Analytics, Plausible" },
        cfg.usesContactForms && { key: "forms", label: "Formularios", hint: "Contacto / presupuesto" },
        cfg.usesEmailMarketing && { key: "email", label: "Email marketing", hint: "Newsletter / campañas" },
        cfg.usesPayments && { key: "payments", label: "Pagos", hint: "Stripe / PayPal" },
        cfg.usesAds && { key: "ads", label: "Publicidad", hint: "AdSense / afiliación" },
        cfg.hasMobileApps && { key: "apps", label: "Apps/Juegos", hint: "Si enlazas a Google Play / Firebase" },
    ].filter(Boolean);

    const prettyDate = (iso) => {
        // Simple: YYYY-MM-DD -> DD/MM/YYYY
        if (!iso || typeof iso !== "string" || iso.length < 10) return iso || "";
        const [y, m, d] = iso.split("-");
        if (!y || !m || !d) return iso;
        return `${d}/${m}/${y}`;
    };

    return (
        <main style={styles.page}>
            <header style={styles.header}>
                <div style={styles.headerTop}>
                    <h1 style={styles.h1}>Política de Privacidad</h1>
                    <div style={styles.meta}>
                        <span style={styles.metaItem}>
                            Última actualización: <strong>{prettyDate(cfg.updatedAt)}</strong>
                        </span>
                        <span style={styles.metaItem}>
                            Sitio: <strong>{cfg.siteName}</strong>
                        </span>
                    </div>
                </div>

                <p style={styles.lead}>
                    Aquí va lo importante: en <strong>{cfg.siteName}</strong> solo recogemos datos cuando hace falta (por ejemplo,
                    si nos escribes). No vendemos tu info. No hacemos “cosas raras” con tus datos. Fin del drama.
                </p>

                {flags.length > 0 && (
                    <div style={styles.badgesWrap}>
                        {flags.map((f) => (
                            <Badge key={f.key}>
                                {f.label}
                                <span style={styles.badgeHint}> · {f.hint}</span>
                            </Badge>
                        ))}
                    </div>
                )}
            </header>

            <nav aria-label="Tabla de contenidos" style={styles.toc}>
                <h2 style={styles.tocTitle}>Índice</h2>
                <ol style={styles.ol}>
                    {toc.map((t) => (
                        <li key={t.id} style={styles.li}>
                            <a href={`#${t.id}`} style={styles.tocLink}>{t.label}</a>
                        </li>
                    ))}
                </ol>
            </nav>

            <div style={styles.content}>
                <Section id="intro" title="1) Quién es el responsable del tratamiento">
                    <p style={styles.p}>
                        Responsable: <strong>{cfg.ownerName}</strong>
                        {cfg.legalEntity ? <> · <strong>{cfg.legalEntity}</strong></> : null}
                    </p>
                    <p style={styles.p}>
                        Contacto: <A href={`mailto:${cfg.ownerEmail}`}>{cfg.ownerEmail}</A>
                    </p>
                    <p style={styles.p}>
                        Ubicación: <strong>{cfg.city}</strong>, <strong>{cfg.country}</strong>
                        {cfg.address ? <> · Dirección: <strong>{cfg.address}</strong></> : null}
                    </p>
                    <p style={styles.p}>
                        Esta política explica cómo tratamos tus datos cuando navegas por la web o te pones en contacto.
                    </p>
                </Section>

                <Section id="data" title="2) Qué datos recogemos">
                    <p style={styles.p}>Dependiendo de lo que hagas en la web, podemos tratar:</p>
                    <List>
                        <li style={styles.p}>
                            <strong>Datos de contacto</strong>: nombre, email y el mensaje que nos envías (si usas un formulario o correo).
                        </li>
                        <li style={styles.p}>
                            <strong>Datos técnicos</strong>: IP (a veces), dispositivo, navegador, páginas vistas, y eventos de uso
                            (solo si hay analítica).
                        </li>
                        <li style={styles.p}>
                            <strong>Cookies</strong> (si aplican): identificadores para recordar preferencias o medir uso.
                        </li>
                    </List>

                    <div style={styles.note}>
                        <strong>Nota:</strong> si este sitio no tiene formularios, analítica ni cookies, entonces esto se reduce a
                        “datos mínimos para que internet funcione” (logs del servidor/CDN).
                    </div>
                </Section>

                <Section id="purposes" title="3) Para qué usamos tus datos">
                    <List>
                        <li style={styles.p}>
                            <strong>Responder a tu consulta</strong> si nos escribes (soporte, presupuestos, colaboración, etc.).
                        </li>
                        {cfg.usesAnalytics && (
                            <li style={styles.p}>
                                <strong>Analítica</strong> para entender qué secciones funcionan y mejorar la web (datos agregados cuando sea posible).
                            </li>
                        )}
                        {cfg.usesEmailMarketing && (
                            <li style={styles.p}>
                                <strong>Enviar comunicaciones</strong> si te suscribes a una newsletter (y solo si te has apuntado tú).
                            </li>
                        )}
                        {cfg.usesPayments && (
                            <li style={styles.p}>
                                <strong>Gestionar pagos</strong> y facturación (si vendes servicios/productos desde la web).
                            </li>
                        )}
                        <li style={styles.p}>
                            <strong>Seguridad</strong>: prevenir abuso, fraude y ataques (logs, rate limiting, etc.).
                        </li>
                    </List>
                </Section>

                <Section id="legal-basis" title="4) Base legal del tratamiento">
                    <List>
                        <li style={styles.p}>
                            <strong>Consentimiento</strong>: cuando aceptas cookies no esenciales, o te suscribes a comunicaciones.
                        </li>
                        <li style={styles.p}>
                            <strong>Ejecución de medidas precontractuales/contractuales</strong>: si pides presupuesto o contratas un servicio.
                        </li>
                        <li style={styles.p}>
                            <strong>Interés legítimo</strong>: seguridad del sitio, prevención de abuso y métricas básicas (si procede).
                        </li>
                        <li style={styles.p}>
                            <strong>Obligación legal</strong>: si alguna norma exige conservar ciertos datos (p. ej., facturación).
                        </li>
                    </List>
                </Section>

                <Section id="sharing" title="5) Con quién compartimos tus datos">
                    <p style={styles.p}>
                        No vendemos tus datos. Podemos compartirlos con proveedores necesarios para operar la web, por ejemplo:
                    </p>
                    <List>
                        <li style={styles.p}>
                            <strong>Hosting/CDN</strong> (ej. Vercel/Cloudflare): sirven la web y pueden procesar logs técnicos.
                        </li>
                        {cfg.usesAnalytics && (
                            <li style={styles.p}>
                                <strong>Analítica</strong> (ej. Google Analytics/Plausible): medición de uso, preferiblemente con IP anonimizada si aplica.
                            </li>
                        )}
                        {cfg.usesEmailMarketing && (
                            <li style={styles.p}>
                                <strong>Plataformas de email</strong> (ej. Mailchimp/Resend): envío de newsletters.
                            </li>
                        )}
                        {cfg.usesPayments && (
                            <li style={styles.p}>
                                <strong>Pasarelas de pago</strong> (ej. Stripe/PayPal): procesan pagos. Nosotros no guardamos datos completos de tarjeta.
                            </li>
                        )}
                    </List>
                    <p style={styles.p}>
                        Estos proveedores actúan como encargados del tratamiento y solo usan los datos para prestar el servicio.
                    </p>
                </Section>

                <Section id="international" title="6) Transferencias internacionales">
                    <p style={styles.p}>
                        Algunos proveedores pueden estar fuera del EEE (o usar infraestructura global). En esos casos, se aplican
                        garantías legales como Cláusulas Contractuales Tipo u otros mecanismos válidos bajo RGPD.
                    </p>
                </Section>

                <Section id="retention" title="7) Cuánto tiempo conservamos los datos">
                    <List>
                        <li style={styles.p}>
                            <strong>Mensajes de contacto</strong>: el tiempo necesario para responder y mantener histórico razonable (o hasta que pidas borrado, salvo obligación legal).
                        </li>
                        {cfg.usesAnalytics && (
                            <li style={styles.p}>
                                <strong>Analítica</strong>: según configuración del proveedor (típicamente meses).
                            </li>
                        )}
                        {cfg.usesPayments && (
                            <li style={styles.p}>
                                <strong>Facturación</strong>: lo que marque la normativa fiscal aplicable.
                            </li>
                        )}
                        <li style={styles.p}>
                            <strong>Logs de seguridad</strong>: el mínimo necesario para detectar abuso y mantener estabilidad.
                        </li>
                    </List>
                </Section>

                <Section id="rights" title="8) Tus derechos (RGPD)">
                    <p style={styles.p}>Puedes ejercer estos derechos:</p>
                    <List>
                        <li style={styles.p}>Acceso: saber qué datos tenemos sobre ti.</li>
                        <li style={styles.p}>Rectificación: corregir datos inexactos.</li>
                        <li style={styles.p}>Supresión: pedir borrado cuando proceda.</li>
                        <li style={styles.p}>Oposición: oponerte a ciertos tratamientos.</li>
                        <li style={styles.p}>Limitación: pedir que restrinjamos el uso de tus datos.</li>
                        <li style={styles.p}>Portabilidad: recibir tus datos en formato estructurado cuando aplique.</li>
                    </List>

                    <p style={styles.p}>
                        Para ejercerlos, escribe a <A href={`mailto:${cfg.ownerEmail}`}>{cfg.ownerEmail}</A> indicando tu solicitud
                        y, si hace falta, información mínima para verificar identidad (sin pasarnos de intensos).
                    </p>

                    <div style={styles.note}>
                        También puedes reclamar ante la autoridad de control (en España, la AEPD) si crees que no estamos cumpliendo.
                    </div>
                </Section>

                <Section id="cookies" title="9) Cookies">
                    <p style={styles.p}>
                        Las cookies son pequeños archivos que el navegador guarda para recordar cosas.
                    </p>

                    <List>
                        <li style={styles.p}>
                            <strong>Necesarias</strong>: para que el sitio funcione (a veces ni siquiera se usan, depende del stack).
                        </li>
                        <li style={styles.p}>
                            <strong>Preferencias</strong>: recuerdan opciones (tema, idioma, etc.).
                        </li>
                        <li style={styles.p}>
                            <strong>Analítica</strong>: miden uso para mejorar (si {cfg.usesAnalytics ? "usas" : "usas en el futuro"} analítica).
                        </li>
                    </List>

                    <p style={styles.p}>
                        Si tienes banner de cookies, ahí puedes aceptar o rechazar. Si no hay banner, normalmente es porque solo se usan
                        cookies necesarias o ninguna.
                    </p>
                </Section>

                <Section id="security" title="10) Seguridad">
                    <p style={styles.p}>
                        Aplicamos medidas razonables de seguridad para evitar acceso no autorizado, pérdida o modificación de datos.
                        Aun así: internet no viene con garantía extendida. Si detectamos un incidente relevante, actuaremos conforme a RGPD.
                    </p>
                </Section>

                <Section id="minors" title="11) Menores de edad">
                    <p style={styles.p}>
                        Este sitio no está pensado para recopilar datos de menores. Si eres menor, no envíes datos personales sin permiso
                        de tu madre/padre/tutor legal.
                    </p>
                </Section>

                <Section id="changes" title="12) Cambios en la política">
                    <p style={styles.p}>
                        Podemos actualizar esta política si cambia el sitio o la normativa. La fecha de “Última actualización” arriba manda.
                    </p>
                </Section>

                <Section id="contact" title="13) Contacto">
                    <p style={styles.p}>
                        Para cualquier tema de privacidad: <A href={`mailto:${cfg.ownerEmail}`}>{cfg.ownerEmail}</A>
                    </p>
                </Section>
            </div>
        </main>
    );
}

const styles = {
    page: {
        maxWidth: 980,
        margin: "0 auto",
        padding: "32px 20px 80px",
        fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        color: "#111827",
        lineHeight: 1.65,
    },
    header: {
        padding: "24px",
        border: "1px solid rgba(17,24,39,0.10)",
        borderRadius: 18,
        background: "#ffffff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
        marginBottom: 18,
    },
    headerTop: {
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        alignItems: "flex-start",
        flexWrap: "wrap",
    },
    h1: { fontSize: 34, margin: 0, letterSpacing: -0.6 },
    meta: { display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13, color: "#6b7280" },
    metaItem: {
        padding: "6px 10px",
        background: "#f5f6fa",
        borderRadius: 999,
        border: "1px solid rgba(17,24,39,0.08)",
    },
    lead: { marginTop: 12, marginBottom: 0, color: "#374151", fontSize: 16 },
    badgesWrap: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 },
    badge: {
        fontSize: 12,
        padding: "8px 10px",
        borderRadius: 999,
        border: "1px solid rgba(17,24,39,0.10)",
        background: "#ffffff",
    },
    badgeHint: { color: "#6b7280" },

    toc: {
        padding: "18px 20px",
        border: "1px solid rgba(17,24,39,0.10)",
        borderRadius: 18,
        background: "#ffffff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
        marginBottom: 18,
    },
    tocTitle: { margin: 0, fontSize: 16 },
    ol: { margin: "10px 0 0", paddingLeft: 18 },
    li: { margin: "6px 0" },
    tocLink: { color: "#2337d1", textDecoration: "none" },

    content: {
        padding: "22px",
        border: "1px solid rgba(17,24,39,0.10)",
        borderRadius: 18,
        background: "#ffffff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    },
    h2: {
        marginTop: 22,
        marginBottom: 8,
        fontSize: 20,
        letterSpacing: -0.2,
    },
    sectionBody: { paddingBottom: 6 },
    p: { margin: "10px 0", color: "#374151" },
    ul: { margin: "10px 0", paddingLeft: 18 },
    link: { color: "#2337d1", textDecoration: "underline" },
    note: {
        marginTop: 12,
        padding: "12px 14px",
        borderRadius: 14,
        background: "#f5f6fa",
        border: "1px solid rgba(17,24,39,0.08)",
        color: "#374151",
    },
    footerBox: {
        marginTop: 14,
        padding: "14px 14px",
        borderRadius: 14,
        background: "#ffffff",
        border: "1px dashed rgba(17,24,39,0.18)",
    },
};
