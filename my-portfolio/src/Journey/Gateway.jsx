import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../Home/context/LanguageContext';
import DistantSystem from './DistantSystem';
import styles from './Journey.module.css';

export default function Gateway() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const es = language === 'es';

  const [showInfo, setShowInfo] = useState(false);
  const [hoveredMode, setHoveredMode] = useState(null); // null when not hovering anything

  // Physical keyboard listeners for [E], [Space], and [I]
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (e.code === 'KeyE') {
        e.preventDefault();
        navigate('/universe');
      } else if (e.code === 'Space') {
        e.preventDefault();
        navigate('/portfolio');
      } else if (e.code === 'KeyI') {
        e.preventDefault();
        setShowInfo((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <main className={styles.gateway}>
      {/* Top Language Selector */}
      <div className={styles.topLangBar}>
        <div className={styles.langSelector} role="group" aria-label={es ? 'Selector de idioma' : 'Language selector'}>
          <button
            type="button"
            className={`${styles.langBtn} ${es ? styles.langBtnActive : ''}`}
            onClick={() => setLanguage('es')}
            aria-pressed={es}
          >
            ES
          </button>
          <span className={styles.langDivider}>/</span>
          <button
            type="button"
            className={`${styles.langBtn} ${!es ? styles.langBtnActive : ''}`}
            onClick={() => setLanguage('en')}
            aria-pressed={!es}
          >
            EN
          </button>
        </div>
      </div>

      <section className={styles.entrance} aria-labelledby="name">
        {/* Subtle background stars */}
        <div className={styles.stars} aria-hidden="true">
          {Array.from({ length: 85 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `${(i * 61.803) % 100}%`,
                top: `${(i * 37.71) % 100}%`,
                opacity: 0.12 + (i % 5) * 0.08,
                width: i % 12 === 0 ? 3 : i % 6 === 0 ? 2 : 1,
                height: i % 12 === 0 ? 3 : i % 6 === 0 ? 2 : 1,
                boxShadow: i % 12 === 0 ? '0 0 6px rgba(0, 240, 255, 0.5)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Left Zone: Game Menu & Side Info Cloud */}
        <div className={styles.intro}>
          <div className={styles.heroTitles}>
            <h1 id="name" className={styles.gameTitle}>MIKEL RIVERA</h1>
            <p className={styles.gameSubtitle}>
              Software Engineer · Builder · Creative Technologist
            </p>
          </div>

          {/* Menu & Side Info Cloud Container */}
          <div
            className={styles.menuWithCloudWrapper}
            onMouseLeave={() => setHoveredMode(null)}
          >
            {/* 1. Menu Options on the Left */}
            <div className={styles.gameMenu} role="navigation" aria-label={es ? 'Experiencias principales' : 'Main experiences'}>
              {/* Option 1: Explorar Universo [E] -> AZUL / CIAN */}
              <Link
                to="/universe"
                className={`${styles.menuItem} ${hoveredMode === 'universe' ? styles.menuItemActiveUniverse : ''}`}
                onMouseEnter={() => setHoveredMode('universe')}
                onFocus={() => setHoveredMode('universe')}
              >
                <kbd className={styles.keyCapCyan} title={es ? 'Tecla E' : 'Key E'}>E</kbd>
                <span className={styles.menuText}>{es ? 'EXPLORAR UNIVERSO' : 'EXPLORE UNIVERSE'}</span>
              </Link>

              {/* Option 2: Ver Portfolio [ESPACIO / ␣] -> NARANJA */}
              <Link
                to="/portfolio"
                className={`${styles.menuItem} ${hoveredMode === 'portfolio' ? styles.menuItemActivePortfolio : ''}`}
                onMouseEnter={() => setHoveredMode('portfolio')}
                onFocus={() => setHoveredMode('portfolio')}
              >
                <kbd className={styles.keyCapOrange} title={es ? 'Tecla Espacio' : 'Spacebar key'}>␣</kbd>
                <span className={styles.menuText}>{es ? 'VER PORTFOLIO' : 'VIEW PORTFOLIO'}</span>
              </Link>

              {/* Option 3: Ayuda [I] */}
              <button
                type="button"
                className={`${styles.menuItem} ${styles.menuItemSecondary} ${hoveredMode === 'help' ? styles.menuItemActiveHelp : ''}`}
                onClick={() => setShowInfo(true)}
                onMouseEnter={() => setHoveredMode('help')}
                onFocus={() => setHoveredMode('help')}
              >
                <kbd className={styles.keyCap} title={es ? 'Tecla I' : 'Key I'}>I</kbd>
                <span className={styles.menuText}>{es ? 'AYUDA' : 'MISSION BRIEFING'}</span>
              </button>
            </div>

            {/* 2. Floating Info Cloud to the Right — ONLY visible when hovering an option */}
            {hoveredMode && (
              <aside
                className={`${styles.cloudBox} ${
                  hoveredMode === 'universe'
                    ? styles.cloudPosUniverse
                    : hoveredMode === 'portfolio'
                    ? styles.cloudPosPortfolio
                    : styles.cloudPosHelp
                }`}
                aria-live="polite"
              >
                <div className={styles.cloudArrow} aria-hidden="true" />
                <div className={styles.cloudHeader}>
                  <span className={styles.cloudIcon}>
                    {hoveredMode === 'universe' ? '🚀' : hoveredMode === 'portfolio' ? '◈' : 'ℹ'}
                  </span>
                  <strong className={styles.cloudTitle}>
                    {hoveredMode === 'universe'
                      ? (es ? 'RUTA ESCÉNICA · 3D' : 'SCENIC ROUTE · 3D')
                      : hoveredMode === 'portfolio'
                      ? (es ? 'RUTA RÁPIDA · PROFESIONAL' : 'RAPID PATH · DIRECT')
                      : (es ? 'GUÍA DEL SISTEMA' : 'SYSTEM GUIDE')}
                  </strong>
                </div>
                <p className={styles.cloudDescription}>
                  {hoveredMode === 'universe'
                    ? (es
                      ? 'Pilota una nave por el sistema solar interactivo. Acércate a planetas, estaciones y asteroides, y aterriza para explorar a pie.'
                      : 'Pilot a ship across the interactive solar system. Approach celestial bodies, lock navigation waypoints, and land to explore on foot.')
                    : hoveredMode === 'portfolio'
                    ? (es
                      ? 'Resumen completo y rápido de proyectos, experiencia, stack técnico y contacto. Ideal para reclutadores y lectura directa.'
                      : 'Full overview of featured SaaS products, game systems, career history, tech stack and contact channels. Built for rapid review.')
                    : (es
                      ? 'Dos formas de conocer mi trabajo según tu ritmo. Pulsa [ I ] o haz clic para abrir el informe de misión.'
                      : 'Two perspectives of the same work. Choose your pace. Press [ I ] or click to open the briefing modal.')}
                </p>
                <div className={styles.cloudKeyHint}>
                  <span>{es ? 'PULSA' : 'PRESS'}</span>
                  <kbd>
                    {hoveredMode === 'universe' ? 'E' : hoveredMode === 'portfolio' ? (es ? 'ESPACIO' : 'SPACE') : 'I'}
                  </kbd>
                  <span>{es ? 'PARA ENTRAR' : 'TO ENTER'}</span>
                </div>
              </aside>
            )}
          </div>
        </div>

        {/* Right Zone: Distant Solar System */}
        <div className={styles.distant}>
          <DistantSystem />
        </div>
      </section>

      {/* "Ayuda" Modal Dialog */}
      {showInfo && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setShowInfo(false)}
        >
          <div
            className={styles.modalCard}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTag}>
                <span>{es ? 'INFORME DE MISIÓN' : 'MISSION BRIEFING'}</span>
              </div>
              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setShowInfo(false)}
                aria-label={es ? 'Cerrar' : 'Close'}
              >
                ✕
              </button>
            </div>

            <h2 id="modal-title">{es ? 'Misma persona. Dos perspectivas.' : 'Same Person. Two Perspectives.'}</h2>
            <p className={styles.modalLead}>
              {es
                ? 'Dos formas distintas de descubrir mi trabajo, pensadas según lo que busques en este momento:'
                : 'Two different ways to discover my work, engineered to fit what you need right now:'}
            </p>

            <div className={styles.modalGrid}>
              <div className={styles.modalOption}>
                <div className={styles.modalOptionHeader}>
                  <span className={styles.modalOptionIconCyan}>🚀</span>
                  <strong>{es ? 'El Universo 3D' : 'The 3D Universe'}</strong>
                </div>
                <p>
                  {es
                    ? 'Una experiencia interactiva espacial con estilo estilizado. Pilota la nave por el sistema, bloquea destinos y aterriza para explorar los proyectos a pie con un personaje.'
                    : 'A stylized 3D interactive space adventure. Pilot your spaceship through planetary systems, lock destinations, and land on worlds to explore on foot.'}
                </p>
                <Link
                  to="/universe"
                  className={styles.modalBtnCyan}
                  onClick={() => setShowInfo(false)}
                >
                  {es ? 'Entrar al Universo [E] →' : 'Enter the Universe [E] →'}
                </Link>
              </div>

              <div className={styles.modalOption}>
                <div className={styles.modalOptionHeader}>
                  <span className={styles.modalOptionIconOrange}>◈</span>
                  <strong>{es ? 'El Portfolio' : 'The Portfolio'}</strong>
                </div>
                <p>
                  {es
                    ? 'Un portfolio convencional, rápido y claro. Proyectos, tecnologías, experiencia laboral y datos de contacto organizados para una evaluación directa.'
                    : 'A conventional, fast and clear portfolio. Projects, tech stack, career background, and contact details organized for rapid evaluation.'}
                </p>
                <Link
                  to="/portfolio"
                  className={styles.modalBtnOrange}
                  onClick={() => setShowInfo(false)}
                >
                  {es ? 'Ver Portfolio [ESPACIO] ↗' : 'View Portfolio [SPACE] ↗'}
                </Link>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <small>{es ? 'PULSA ESC O HAZ CLIC FUERA PARA CERRAR' : 'PRESS ESC OR CLICK OUTSIDE TO CLOSE'}</small>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
