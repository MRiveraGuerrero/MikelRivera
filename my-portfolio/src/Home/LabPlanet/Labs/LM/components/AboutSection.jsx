import React from 'react';
import styles from '../Home.module.css';

const AboutSection = ({ crewMembers }) => {
    return (
        <section id="about" className={styles.aboutSection}>
            <div className={styles.aboutBackground}>
                <div className={styles.vhsOverlay}></div>
                <div className={styles.comicDoodles}>
                    <span className={styles.doodle1}>★</span>
                    <span className={styles.doodle2}>💀</span>
                    <span className={styles.doodle3}>⚡</span>
                    <span className={styles.doodle4}>🎵</span>
                </div>
            </div>

            <div className={styles.sectionHeader}>
                <div className={styles.sectionBadge}>
                    <span className={styles.badgeIcon}>👥</span>
                    LA CREW
                </div>
                <h2 className={styles.sectionTitle}>LEGADO MITOLÓGICO</h2>
                <p className={styles.sectionDescription}>
                    Los pibardos detrás del caos y la música
                </p>
            </div>

            <div className={styles.crewGrid}>
                {crewMembers.map((member, index) => (
                    <div key={member.id} className={styles.crewCard} style={{ animationDelay: `${index * 0.2}s` }}>
                        <div className={styles.comicFrame}>
                            <div className={styles.comicBorder}></div>
                            <div className={styles.memberPortrait}>
                                {member.image && (
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className={styles.memberImage}
                                    />
                                )}
                                <div className={styles.portraitGlitch}></div>
                                <div className={styles.portraitSticker}>LM</div>
                            </div>
                            <div className={styles.comicBubble}>
                                "{member.caption}"
                            </div>
                        </div>
                        <div className={styles.memberInfo}>
                            <h3 className={styles.memberName}>{member.name}</h3>
                            <p className={styles.memberRole}>{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.loreSection}>
                <div className={styles.loreBox}>
                    <h3 className={styles.loreTitle}>LA LEYENDA</h3>
                    <p className={styles.loreText}>
                        En las calles nocturnas de la ciudad, un grupo de pibes se unió
                        bajo un mismo legado: crear música, grabar locuras
                        y dejar una marca imborrable en el underground. Esto es LM —
                        Legado de la Muerte. Caos, risas y beats.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
