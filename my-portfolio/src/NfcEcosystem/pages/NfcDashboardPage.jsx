import React, { useState } from "react";
import NfcHeader from "../components/NfcHeader";
import NfcFooter from "../components/NfcFooter";
import { Settings, BarChart2, QrCode, CreditCard, Save, Check, ExternalLink, ArrowLeft, RefreshCw, Zap, ShieldCheck, Share2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./NfcDashboardPage.module.css";

export default function NfcDashboardPage({ cartCount }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    name: "Mikel Rivera",
    role: "Senior Full Stack Engineer & Tech Lead",
    company: "Rivera Digital Labs",
    phone: "+34 600 112 233",
    email: "mikel@riveragg.dev",
    website: "https://mikelrivera.dev",
    instagram: "@mikelrivera.dev",
    linkedin: "linkedin.com/in/mikelrivera",
    destinationType: "vcard", // vcard | instagram | google_reviews | whatsapp | custom_url
    customUrl: "https://mikelrivera.dev",
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className={styles.dashboardPage}>
      <NfcHeader cartCount={cartCount} />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Header Bar */}
          <div className={styles.topHeader}>
            <Link to="/nfc" className={styles.backLink}>
              <ArrowLeft size={16} />
              <span>Volver a la Home NFC</span>
            </Link>

            <div className={styles.titleRow}>
              <div>
                <h1 className={styles.title}>
                  Panel de Gestión <span className={styles.highlight}>NFC Pulse</span>
                </h1>
                <p className={styles.subtitle}>
                  Administra el comportamiento de tus tarjetas NFC en tiempo real sin cambiarlas físicamente.
                </p>
              </div>

              <div className={styles.cardStatusBadge}>
                <ShieldCheck size={16} className={styles.shieldIcon} />
                <div>
                  <strong>1 Tarjeta Activa</strong>
                  <span>ID: NFC-STEALTH-882</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className={styles.tabBar}>
            <button
              className={`${styles.tabBtn} ${activeTab === "profile" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <Settings size={18} />
              <span>Configuración de Perfil</span>
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "analytics" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              <BarChart2 size={18} />
              <span>Analítica de Toques</span>
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "qr" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("qr")}
            >
              <QrCode size={18} />
              <span>Código QR Backup</span>
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "cards" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("cards")}
            >
              <CreditCard size={18} />
              <span>Mis Dispositivos NFC</span>
            </button>
          </div>

          {/* TAB CONTENT: PROFILE EDITOR */}
          {activeTab === "profile" && (
            <div className={styles.tabGrid}>
              {/* Form */}
              <form className={styles.editorForm} onSubmit={handleSave}>
                <div className={styles.formSection}>
                  <h3>Modo de Acción NFC</h3>
                  <p>Define qué ocurre cuando alguien acerca su smartphone a tu tarjeta NFC</p>

                  <div className={styles.destinationOptions}>
                    <label className={`${styles.destCard} ${profileData.destinationType === "vcard" ? styles.selectedDest : ""}`}>
                      <input
                        type="radio"
                        name="destinationType"
                        value="vcard"
                        checked={profileData.destinationType === "vcard"}
                        onChange={(e) => setProfileData({ ...profileData, destinationType: e.target.value })}
                      />
                      <div>
                        <strong>vCard Inteligente (Recomendado)</strong>
                        <span>Abre la ficha de contacto con botón directo "Guardar en Agenda"</span>
                      </div>
                    </label>

                    <label className={`${styles.destCard} ${profileData.destinationType === "instagram" ? styles.selectedDest : ""}`}>
                      <input
                        type="radio"
                        name="destinationType"
                        value="instagram"
                        checked={profileData.destinationType === "instagram"}
                        onChange={(e) => setProfileData({ ...profileData, destinationType: e.target.value })}
                      />
                      <div>
                        <strong>Instagram Directo</strong>
                        <span>Abre tu perfil de Instagram directamente en la app</span>
                      </div>
                    </label>

                    <label className={`${styles.destCard} ${profileData.destinationType === "google_reviews" ? styles.selectedDest : ""}`}>
                      <input
                        type="radio"
                        name="destinationType"
                        value="google_reviews"
                        checked={profileData.destinationType === "google_reviews"}
                        onChange={(e) => setProfileData({ ...profileData, destinationType: e.target.value })}
                      />
                      <div>
                        <strong>Reseñas Google 5 Estrellas</strong>
                        <span>Redirige a la pantalla de dejar valoración en tu negocio</span>
                      </div>
                    </label>

                    <label className={`${styles.destCard} ${profileData.destinationType === "custom_url" ? styles.selectedDest : ""}`}>
                      <input
                        type="radio"
                        name="destinationType"
                        value="custom_url"
                        checked={profileData.destinationType === "custom_url"}
                        onChange={(e) => setProfileData({ ...profileData, destinationType: e.target.value })}
                      />
                      <div>
                        <strong>Enlace Personalizado / Web</strong>
                        <span>Redirige a cualquier URL externa de tu elección</span>
                      </div>
                    </label>
                  </div>
                </div>

                {profileData.destinationType === "custom_url" && (
                  <div className={styles.formSection}>
                    <h3>URL de Destino Personalizada</h3>
                    <input
                      type="url"
                      value={profileData.customUrl}
                      onChange={(e) => setProfileData({ ...profileData, customUrl: e.target.value })}
                      placeholder="https://tu-pagina-web.com"
                      className={styles.formInput}
                      required
                    />
                  </div>
                )}

                <div className={styles.formSection}>
                  <h3>Datos del Perfil vCard</h3>
                  <div className={styles.inputRow}>
                    <div>
                      <label>Nombre y Apellidos</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className={styles.formInput}
                      />
                    </div>
                    <div>
                      <label>Cargo / Especialidad</label>
                      <input
                        type="text"
                        value={profileData.role}
                        onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className={styles.inputRow}>
                    <div>
                      <label>Teléfono de Contacto</label>
                      <input
                        type="text"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className={styles.formInput}
                      />
                    </div>
                    <div>
                      <label>Correo Electrónico</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className={styles.inputRow}>
                    <div>
                      <label>Sitio Web</label>
                      <input
                        type="text"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        className={styles.formInput}
                      />
                    </div>
                    <div>
                      <label>Instagram / Red Principal</label>
                      <input
                        type="text"
                        value={profileData.instagram}
                        onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                        className={styles.formInput}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className={styles.saveBtn}>
                  {saved ? (
                    <>
                      <Check size={18} />
                      <span>¡Cambios Guardados en el Chip NFC!</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Guardar y Sincronizar Tarjeta</span>
                    </>
                  )}
                </button>
              </form>

              {/* Live Preview Column */}
              <div className={styles.previewBox}>
                <div className={styles.previewTitle}>
                  <Zap size={16} className={styles.zapIcon} />
                  <span>Vista Previa del Toque NFC</span>
                </div>

                <div className={styles.phoneSimFrame}>
                  <div className={styles.simHeader}>
                    <div className={styles.simAvatar}>MR</div>
                    <h4>{profileData.name}</h4>
                    <p>{profileData.role}</p>
                    <span className={styles.simBadge}>Modo: {profileData.destinationType.toUpperCase()}</span>
                  </div>

                  <div className={styles.simButtons}>
                    <button className={styles.simBtnPrimary}>Guardar Contacto vCard</button>
                    <button className={styles.simBtnSec}>Llamar: {profileData.phone}</button>
                    <button className={styles.simBtnSec}>Email: {profileData.email}</button>
                    <button className={styles.simBtnSec}>Web: {profileData.website}</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: ANALYTICS */}
          {activeTab === "analytics" && (
            <div className={styles.analyticsSection}>
              <div className={styles.statsSummaryGrid}>
                <div className={styles.analyticCard}>
                  <span>Total Toques NFC</span>
                  <strong>1,482</strong>
                  <span className={styles.growth}>+24% este mes</span>
                </div>
                <div className={styles.analyticCard}>
                  <span>Guardados en Agenda</span>
                  <strong>1,394</strong>
                  <span className={styles.growth}>94% de conversión</span>
                </div>
                <div className={styles.analyticCard}>
                  <span>Clics en Redes</span>
                  <strong>842</strong>
                  <span className={styles.growth}>Instagram #1</span>
                </div>
                <div className={styles.analyticCard}>
                  <span>Dispositivo habitual</span>
                  <strong>iPhone 82%</strong>
                  <span className={styles.growth}>Android 18%</span>
                </div>
              </div>

              <div className={styles.chartMockBox}>
                <h3>Evolución de Toques de la Tarjeta</h3>
                <div className={styles.mockBarChart}>
                  <div className={styles.barItem} style={{ height: "45%" }}><span>Lun</span></div>
                  <div className={styles.barItem} style={{ height: "65%" }}><span>Mar</span></div>
                  <div className={styles.barItem} style={{ height: "85%" }}><span>Mié</span></div>
                  <div className={styles.barItem} style={{ height: "70%" }}><span>Jue</span></div>
                  <div className={styles.barItem} style={{ height: "95%" }}><span>Vie</span></div>
                  <div className={styles.barItem} style={{ height: "60%" }}><span>Sáb</span></div>
                  <div className={styles.barItem} style={{ height: "40%" }}><span>Dom</span></div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: QR BACKUP */}
          {activeTab === "qr" && (
            <div className={styles.qrSection}>
              <div className={styles.qrCard}>
                <QrCode size={180} className={styles.qrGraphic} />
                <h3>Tu Código QR Respaldado</h3>
                <p>Si la otra persona tiene un teléfono muy antiguo sin NFC, muestra este código QR para abrir el mismo perfil.</p>
                <button className={styles.downloadQrBtn}>Descargar QR en Alta Resolución (PNG)</button>
              </div>
            </div>
          )}

          {/* TAB CONTENT: MY CARDS */}
          {activeTab === "cards" && (
            <div className={styles.cardsListSection}>
              <div className={styles.myCardItem}>
                <div className={styles.myCardVisual}>
                  <span>NFC PULSE</span>
                  <strong>ACERO STEALTH #882</strong>
                </div>
                <div className={styles.myCardInfo}>
                  <h4>Tarjeta NFC Acero Mate Stealth</h4>
                  <p>Chip NTAG216 • Estado: ACTIVA • Vinculada a Mikel Rivera</p>
                </div>
                <button className={styles.manageBtn}>Gestionar Enlace</button>
              </div>

              <button className={styles.addNewCardBtn}>
                <Plus size={18} />
                <span>Vincular Nueva Tarjeta o Llavero NFC</span>
              </button>
            </div>
          )}
        </div>
      </main>

      <NfcFooter />
    </div>
  );
}
