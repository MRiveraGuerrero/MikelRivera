import React, { useState } from "react";
import styles from "./PackOpeningModal.module.css";
import SVGCardGraphic from "./SVGCardGraphic";

export function PackOpeningModal({ pack, openedCardsData, onClose, onFinish }) {
  const cards = openedCardsData?.cards || [];
  const addedEssence = openedCardsData?.addedEssence || 0;

  const [stage, setStage] = useState("tear");
  const [flippedIndices, setFlippedIndices] = useState([]);

  const handleTearPack = () => {
    setStage("reveal");
  };

  const handleFlipCard = (index) => {
    if (!flippedIndices.includes(index)) {
      setFlippedIndices(prev => [...prev, index]);
    }
  };

  const handleRevealAll = () => {
    setFlippedIndices(cards.map((_, i) => i));
  };

  const isAllFlipped = flippedIndices.length === cards.length;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="modal-pack-title">
      <div className={styles.modalCard}>
        <button onClick={onClose} className={styles.closeBtn} aria-label="Cerrar modal de apertura">
          ✕
        </button>

        {stage === "tear" && (
          <div className={styles.tearStage}>
            <div className={styles.badgeTop}>SOBRE SELLADO DE CARTAS ANIME</div>
            <h2 id="modal-pack-title" className={styles.packTitle}>{pack.name}</h2>
            <p className={styles.packDesc}>{pack.description}</p>

            <div className={styles.packFoilWrapper} onClick={handleTearPack}>
              <div className={styles.packFoil} style={{ background: pack.coverColor }}>
                <div className={styles.packShine}></div>
                <div className={styles.packIcon}>{pack.icon}</div>
                <div className={styles.packSeries}>{pack.series}</div>
                <div className={styles.packLogo}>SAKURA ECLIPSE</div>
                <div className={styles.packSeal}>TIRA PARA ABRIR ✂️</div>
              </div>
            </div>

            <button onClick={handleTearPack} className={styles.btnActionPrimary}>
              ✨ Rasgar y Abrir Sobre
            </button>
          </div>
        )}

        {stage === "reveal" && (
          <div className={styles.revealStage}>
            <div className={styles.stageHeader}>
              <h2 className={styles.revealTitle}>¡Cartas Obtenidas!</h2>
              <p className={styles.revealSub}>Haz clic en cada carta para revelar su rareza</p>
            </div>

            <div className={styles.cardsGrid}>
              {cards.map((card, index) => {
                const isFlipped = flippedIndices.includes(index);
                return (
                  <div 
                    key={card.instanceId} 
                    className={`${styles.cardSlot} ${isFlipped ? styles.flipped : ""}`}
                    onClick={() => handleFlipCard(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Carta ${index + 1}: ${isFlipped ? card.name : "Oculta"}`}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleFlipCard(index)}
                  >
                    <div className={styles.cardInner}>
                      <div className={styles.cardBack}>
                        <div className={styles.cardBackPattern}>
                          <span className={styles.cardBackEmblem}>🌸</span>
                          <span className={styles.cardBackLogo}>ECLIPSE</span>
                        </div>
                      </div>

                      <div 
                        className={`${styles.cardFront} ${styles[card.rarity.badgeClass]}`}
                        style={{ borderColor: card.rarity.color }}
                      >
                        <div className={styles.cardTopBar}>
                          <span className={styles.cardElement}>{card.element.icon}</span>
                          <span className={styles.cardRarityBadge} style={{ background: card.rarity.color }}>
                            {card.rarity.id}
                          </span>
                        </div>

                        <div className={styles.cardGraphicArea}>
                          <SVGCardGraphic theme={card.svgTheme} rarity={card.rarity.id} />
                        </div>

                        <div className={styles.cardBody}>
                          <div className={styles.cardName}>{card.name}</div>
                          <div className={styles.cardStats}>
                            <span>ATK: {card.atk}</span>
                            <span>DEF: {card.def}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.revealControls}>
              {!isAllFlipped ? (
                <button onClick={handleRevealAll} className={styles.btnSecondary}>
                  👁️ Revelar Todas
                </button>
              ) : (
                <button onClick={() => setStage("summary")} className={styles.btnActionPrimary}>
                  🎉 Ver Resumen del Sobre
                </button>
              )}
            </div>
          </div>
        )}

        {stage === "summary" && (
          <div className={styles.summaryStage}>
            <div className={styles.summaryBadge}>¡SOBRE ABIERTO CON ÉXITO!</div>
            <h2 className={styles.summaryTitle}>Nuevas Cartas Añadidas</h2>

            {addedEssence > 0 && (
              <div className={styles.essenceBanner}>
                ✨ <strong>+{addedEssence} Esencia</strong> concedida por cartas duplicadas recabadas.
              </div>
            )}

            <div className={styles.summaryList}>
              {cards.map((card) => (
                <div key={card.instanceId} className={styles.summaryItem}>
                  <div className={styles.summaryItemRarity} style={{ background: card.rarity.color }}>
                    {card.rarity.id}
                  </div>
                  <div className={styles.summaryItemInfo}>
                    <div className={styles.summaryItemName}>{card.name}</div>
                    <div className={styles.summaryItemExp}>{card.expansion} • {card.element.name}</div>
                  </div>
                  <div className={styles.summaryItemStats}>
                    ⚔️ {card.atk} / 🛡️ {card.def}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summaryActions}>
              <button onClick={onFinish} className={styles.btnActionPrimary}>
                🎴 Guardar en Mi Colección
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PackOpeningModal;
