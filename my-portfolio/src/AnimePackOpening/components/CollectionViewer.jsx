import React, { useState } from "react";
import styles from "./CollectionViewer.module.css";
import SVGCardGraphic from "./SVGCardGraphic";
import { RARITIES, ELEMENTS, SAKURA_CARDS } from "../lib/animeCardsData";

export default function CollectionViewer({ collection = [] }) {
  const [selectedRarity, setSelectedRarity] = useState("ALL");
  const [selectedElement, setSelectedElement] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectedCard, setInspectedCard] = useState(null);

  const collectionCounts = collection.reduce((acc, card) => {
    acc[card.id] = (acc[card.id] || 0) + 1;
    return acc;
  }, {});

  const totalDistinct = Object.keys(collectionCounts).length;
  const totalCardsInGame = SAKURA_CARDS.length;

  const filteredCards = SAKURA_CARDS.filter((card) => {
    const matchesRarity = selectedRarity === "ALL" || card.rarity.id === selectedRarity;
    const matchesElement = selectedElement === "ALL" || card.element.id === selectedElement;
    const matchesSearch = searchQuery === "" || 
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      card.lore.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRarity && matchesElement && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Colección de Cartas Anime</h2>
          <p className={styles.subTitle}>
            Explora las guerreras, dragones y espíritus astrales desbloqueados en tu mazo.
          </p>
        </div>
        <div className={styles.statsBadge}>
          <span className={styles.statsIcon}>🎴</span>
          <div>
            <div className={styles.statsNum}>{totalDistinct} / {totalCardsInGame}</div>
            <div className={styles.statsLabel}>Cartas Únicas</div>
          </div>
        </div>
      </div>

      <div className={styles.controlsBar}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Buscar por nombre o historia..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <button 
            onClick={() => setSelectedRarity("ALL")} 
            className={`${styles.filterBtn} ${selectedRarity === "ALL" ? styles.active : ""}`}
          >
            Todas
          </button>
          {Object.values(RARITIES).map(r => (
            <button 
              key={r.id}
              onClick={() => setSelectedRarity(r.id)}
              className={`${styles.filterBtn} ${selectedRarity === r.id ? styles.active : ""}`}
            >
              {r.name}
            </button>
          ))}
        </div>

        <div className={styles.filterGroup}>
          <button 
            onClick={() => setSelectedElement("ALL")} 
            className={`${styles.filterBtn} ${selectedElement === "ALL" ? styles.active : ""}`}
          >
            Todos
          </button>
          {Object.values(ELEMENTS).map(el => (
            <button 
              key={el.id}
              onClick={() => setSelectedElement(el.id)}
              className={`${styles.filterBtn} ${selectedElement === el.id ? styles.active : ""}`}
            >
              {el.icon} {el.id}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.cardsGrid}>
        {filteredCards.map((card) => {
          const ownedCount = collectionCounts[card.id] || 0;
          const isOwned = ownedCount > 0;

          return (
            <div 
              key={card.id} 
              className={`${styles.cardTile} ${!isOwned ? styles.locked : ""}`}
              onClick={() => setInspectedCard(card)}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalle de ${card.name}. Obtenidas: ${ownedCount}`}
            >
              {isOwned && (
                <div className={styles.countBadge}>
                  x{ownedCount}
                </div>
              )}

              <div className={styles.cardTileHeader}>
                <span className={styles.elementIcon}>{card.element.icon}</span>
                <span className={styles.rarityBadge} style={{ background: card.rarity.color }}>
                  {card.rarity.id}
                </span>
              </div>

              <div className={styles.graphicBox}>
                <SVGCardGraphic theme={card.svgTheme} rarity={card.rarity.id} />
              </div>

              <div className={styles.cardTileBody}>
                <div className={styles.cardTileName}>{card.name}</div>
                <div className={styles.cardTileStats}>
                  <span>ATK {card.atk}</span> • <span>DEF {card.def}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {inspectedCard && (
        <div className={styles.inspectOverlay} onClick={() => setInspectedCard(null)}>
          <div className={styles.inspectModal} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setInspectedCard(null)} className={styles.inspectClose}>✕</button>
            
            <div className={styles.inspectBody}>
              <div className={styles.inspectLeft}>
                <div className={styles.inspectCardGraphic}>
                  <SVGCardGraphic theme={inspectedCard.svgTheme} rarity={inspectedCard.rarity.id} />
                </div>
              </div>

              <div className={styles.inspectRight}>
                <div className={styles.inspectRarityTag} style={{ background: inspectedCard.rarity.color }}>
                  {inspectedCard.rarity.name} ({inspectedCard.rarity.id})
                </div>

                <h3 className={styles.inspectTitle}>{inspectedCard.name}</h3>

                <div className={styles.inspectRow}>
                  <span>Elemento: <strong>{inspectedCard.element.icon} {inspectedCard.element.name}</strong></span>
                  <span>Expansión: <strong>{inspectedCard.expansion}</strong></span>
                </div>

                <div className={styles.inspectCombatStats}>
                  <div className={styles.combatBox}>
                    <span className={styles.combatLabel}>ATAQUE</span>
                    <span className={styles.combatVal}>{inspectedCard.atk}</span>
                  </div>
                  <div className={styles.combatBox}>
                    <span className={styles.combatLabel}>DEFENSA</span>
                    <span className={styles.combatVal}>{inspectedCard.def}</span>
                  </div>
                </div>

                <p className={styles.inspectLore}>{inspectedCard.lore}</p>
                <blockquote className={styles.inspectQuote}>"{inspectedCard.quote}"</blockquote>

                <div className={styles.inspectOwnedTag}>
                  {collectionCounts[inspectedCard.id] > 0 
                    ? `Tienes ${collectionCounts[inspectedCard.id]} copias en tu inventario.`
                    : "Aún no has descubierto esta carta. ¡Abre sobres para encontrarla!"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
