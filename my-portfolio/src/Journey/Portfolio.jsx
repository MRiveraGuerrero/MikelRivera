import { Link } from 'react-router-dom';
import OrbitSection from '../Home/OrbitSection';
import { getWorkItems } from '../Home/data/workItems';
import { useLanguage } from '../Home/context/LanguageContext';
import { projects } from './content';
import styles from './Journey.module.css';
import cv from '../Home/assets/Mikel_Rivera_OnePage_CV.docx (2).pdf';

export default function Portfolio() {
  const { t } = useLanguage();
  return <main className={styles.portfolio}>
    <header className={styles.nav}><Link to="/" className={styles.wordmark}>MR<span> / PORTFOLIO</span></Link><nav aria-label="Portfolio"><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#contact">Contact</a><Link to="/universe">Universe ↗</Link></nav></header>
    <div className={styles.content}>
      <section className={styles.portfolioHero}><p className={styles.eyebrow}>MIKEL RIVERA / SOFTWARE ENGINEER</p><h1>Ideas into products.<br /><span>Curiosity into worlds.</span></h1><p>I build products, games and digital experiences — from useful everyday tools to places worth exploring.</p><a className={styles.primary} href="#projects">Explore my work ↓</a><a className={styles.textLink} href={cv} download>Download CV ↗</a></section>
      <section className={styles.section} id="about"><p className={styles.eyebrow}>01 / ABOUT</p><div><h2>An engineer with a builder’s mindset.</h2><p>My work sits between software engineering, product and interactive design. I enjoy connecting the technical details with the experience someone actually has — whether that’s booking a service, playing a game or flying through this website.</p><Link to="/sun">More about me ↗</Link></div></section>
      <section className={styles.section} id="projects"><p className={styles.eyebrow}>02 / FEATURED PROJECTS</p><div><h2>Built to be used. And played.</h2>{projects.map((project, i) => <article className={styles.project} key={project.id}><span className={styles.projectNumber}>0{i + 1}</span><div><small>{project.category}</small><h3><a href={project.path}>{project.name} <span>↗</span></a></h3><p>{project.description}</p><div className={styles.tags}>{project.technologies.map(tag => <span key={tag}>{tag}</span>)}</div></div><div className={styles.projectOrb} style={{ '--orb': project.color }} aria-hidden="true" /></article>)}</div></section>
      <section className={styles.section} id="experience"><p className={styles.eyebrow}>03 / EXPERIENCE</p><div><h2>Learning by building.</h2>{getWorkItems(t).slice().reverse().map(work => <article className={styles.work} key={work.id}><small>{work.year}</small><h3>{work.company}</h3><p>{work.role}</p><p>{work.description}</p></article>)}</div></section>
      <section className={styles.section}><p className={styles.eyebrow}>04 / SKILLS</p><div><h2>The tools behind the work.</h2><div className={styles.skillGroups}><div><h3>Interfaces</h3><p>React · Next.js · JavaScript<br />HTML · CSS · Tailwind</p></div><div><h3>Systems</h3><p>Java · Python · Node.js<br />MySQL · Stripe</p></div><div><h3>Experiences</h3><p>Three.js · WebGL<br />UI/UX · Game design</p></div></div></div></section>
      <section className={styles.section} id="experiments"><p className={styles.eyebrow}>05 / EXPERIMENTS</p><div><h2>Room for the unexpected.</h2><p>Interactive worlds, visual explorations and ideas that start with “what if?”. This website is one of them.</p><Link to="/lab-planet">Explore Mikel Labs ↗</Link><br /><Link to="/portfolio-planet">Visit the portfolio archive ↗</Link></div></section>
      <section className={styles.section} id="contact"><p className={styles.eyebrow}>06 / CONTACT</p><div><h2>Let’s build something.</h2><a className={styles.email} href="mailto:mikelrg2003@gmail.com">mikelrg2003@gmail.com ↗</a><div className={styles.socials}><a href="https://www.linkedin.com/in/mikelrivera/">LinkedIn ↗</a><a href="https://github.com/MRiveraGuerrero">GitHub ↗</a><a href={cv} download>Download CV ↓</a></div></div></section>
    </div>
    <section className={styles.epilogue}><p className={styles.eyebrow}>THERE’S ANOTHER WAY TO SEE IT.</p><h2>Want to see all of this differently?</h2><Link to="/universe">Enter the universe →</Link><OrbitSection /></section>
    <footer className={styles.end}><Link to="/">Mikel Rivera</Link><span>Products, games &amp; experiments.</span><a href="#">Back to top ↑</a></footer>
  </main>;
}
