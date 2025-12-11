import React from 'react';
import styles from '../Home.module.css';

const ShopSection = ({ clothingItems }) => {
    return (
        <section id="shop" className={styles.shopSection}>
            <div className={styles.shopBackground}>
                <div className={styles.urbanTexture}></div>
                <div className={styles.neonGlow}></div>
            </div>

            <div className={styles.sectionHeader}>
                <div className={styles.sectionBadge}>
                    <span className={styles.badgeIcon}>🔥</span>
                    STREETWEAR
                </div>
                <h2 className={styles.sectionTitle}>UNDERGROUND MERCH</h2>
                <p className={styles.sectionDescription}>
                    Saca el ñip con la ropa oficial de LM
                </p>
            </div>

            <div className={styles.clothingGrid}>
                {clothingItems.map((item, index) => (
                    <div key={item.id} className={styles.clothingCard} style={{ animationDelay: `${index * 0.15}s` }}>
                        <div className={styles.clothing3D}>
                            <div className={styles.clothingMockup}>
                                <div className={styles.mockupGlow}></div>
                                <div className={styles.mockupLabel}>{item.type}</div>
                            </div>
                            <div className={styles.hologramPrice}>{item.price}</div>
                        </div>
                        <div className={styles.clothingInfo}>
                            <h3 className={styles.clothingName}>{item.name}</h3>
                            <button className={styles.btnBuy}>
                                COMPRAR
                                <span className={styles.buyGlow}></span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ShopSection;
