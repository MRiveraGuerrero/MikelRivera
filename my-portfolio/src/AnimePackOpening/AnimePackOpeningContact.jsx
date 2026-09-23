import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimeHeader from "./components/AnimeHeader";
import AnimeFooter from "./components/AnimeFooter";
import styles from "./AnimePackOpeningLegal.module.css";

export default function AnimePackOpeningContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Soporte Técnico");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    document.title = "Contacto Legal y Soporte | Anime Pack Opening TCG";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!consent) {
      setErrorMsg("Debes aceptar expresamente la Política de Privacidad antes de enviar tu mensaje.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setStatusMsg("¡Mensaje enviado con éxito! Nos pondremos en contacto contigo a través de " + email + " en un plazo de 24-48h.");
      setName("");
      setEmail("");
      setMessage("");
      setConsent(false);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.legalWrapper}>
      <AnimeHeader packsAvailable={0} essence={0} />

      <main className={styles.legalContainer}>
        <div className={styles.legalHeader}>
          <div className={styles.legalBadge}>ATENCIÓN AL USUARIO</div>
          <h1 className={styles.legalTitle}>Contacto Legal y Soporte Técnico</h1>
          <p className={styles.legalMeta}>
            Ponte en contacto con el equipo de desarrollo de Anime Pack Opening
          </p>
        </div>

        <div className={styles.legalCard}>
          <section className={styles.legalSection}>
            <h2>Formulario de Contacto Directo</h2>
            <p>
              Completa los campos a continuación para consultas legales, soporte sobre cartas, problemas con la cuenta o derechos de privacidad:
            </p>

            {statusMsg && (
              <div style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "1rem", borderRadius: "10px", marginBottom: "1.25rem" }}>
                {statusMsg}
              </div>
            )}

            {errorMsg && (
              <div style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", padding: "1rem", borderRadius: "10px", marginBottom: "1.25rem" }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "#cbd5e1" }}>Nombre Completo / Apodo:</label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Tu nombre"
                  style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", color: "#fff" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "#cbd5e1" }}>Correo Electrónico:</label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="tu.correo@ejemplo.com"
                  style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", color: "#fff" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "#cbd5e1" }}>Asunto de la Consulta:</label>
                <select 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem", background: "#0a0718", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", color: "#fff" }}
                >
                  <option value="Soporte Técnico">Soporte Técnico o Error en Juego</option>
                  <option value="Privacidad y Datos">Privacidad, Datos y Derechos ARCO+</option>
                  <option value="Propiedad Intelectual">Consulta de Propiedad Intelectual</option>
                  <option value="Otra consulta">Otra consulta general</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "#cbd5e1" }}>Mensaje / Detalle:</label>
                <textarea 
                  rows="5" 
                  required 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Escribe aquí tu mensaje detallado..."
                  style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", color: "#fff" }}
                ></textarea>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <input 
                  type="checkbox" 
                  id="consentCheck"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{ width: "18px", height: "18px", marginTop: "2px", accentColor: "#ff2a75" }}
                />
                <label htmlFor="consentCheck" style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: "1.4" }}>
                  He leído y acepto expresamente la <Link to="/animepackopening/privacidad" style={{ color: "#ff2a75", textDecoration: "underline" }}>Política de Privacidad</Link> para el tratamiento de mis datos personales con la finalidad de responder a esta consulta.
                </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                style={{ background: "linear-gradient(135deg, #ff2a75, #a855f7)", color: "#fff", border: "none", padding: "0.9rem", borderRadius: "12px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
              >
                {loading ? "Enviando..." : "✉️ Enviar Mensaje de Contacto"}
              </button>
            </form>
          </section>

          <section className={styles.legalSection} style={{ marginTop: "2rem" }}>
            <h2>Datos del Desarrollador</h2>
            <ul>
              <li><strong>Desarrollador:</strong> [AÑADIR NOMBRE LEGAL DEL DESARROLLADOR]</li>
              <li><strong>Correo Electrónico Directo:</strong> [AÑADIR CORREO DE SOPORTE]</li>
              <li><strong>País:</strong> España / Unión Europea</li>
            </ul>
          </section>
        </div>
      </main>

      <AnimeFooter />
    </div>
  );
}
