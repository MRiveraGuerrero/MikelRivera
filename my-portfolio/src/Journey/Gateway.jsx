import { Link } from 'react-router-dom';
import DistantSystem from './DistantSystem';
import styles from './Journey.module.css';

export default function Gateway() {
  return <main className={styles.gateway}>
    <section className={styles.entrance} aria-labelledby="name">
      <div className={styles.stars} aria-hidden="true">{Array.from({ length: 95 }, (_, i) => <i key={i} style={{ left: `${(i * 61.803) % 100}%`, top: `${(i * 37.71) % 100}%`, opacity: 0.12 + i % 5 * 0.09, width: i % 9 === 0 ? 2 : 1, height: i % 9 === 0 ? 2 : 1 }} />)}</div>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>A SMALL CORNER OF THE UNIVERSE</p>
        <h1 id="name">MIKEL RIVERA</h1>
        <p className={styles.tagline}>Software Engineer · Building products, games &amp; experiments.</p>
        <div className={styles.choices}>
          <div><Link className={styles.primary} to="/portfolio">View Portfolio <span>↗</span></Link><p>A straight path through my work.</p></div>
          <div><Link className={styles.secondary} to="/universe">Enter the Universe <span>→</span></Link><p>Take the scenic route.</p></div>
        </div>
        <a className={styles.what} href="#what-is-this">↓ <span>What is this?</span></a>
      </div>
      <div className={styles.distant}><DistantSystem /></div>
      <div className={styles.coordinates} aria-hidden="true">01 / CHOOSE YOUR JOURNEY</div>
    </section>
    <section id="what-is-this" className={styles.explanation}><span className={styles.eyebrow}>SAME PERSON. TWO PERSPECTIVES.</span><h2>Two ways to explore my work.</h2><p>The portfolio brings the projects, experience and details together in one place. The universe lets you discover them from the pilot’s seat. Choose your own pace.</p><Link to="/portfolio">View Portfolio ↗</Link><Link to="/universe">Enter the Universe →</Link></section>
  </main>;
}
