import React from 'react';
import Navbar from './Navbar';
import styles from './Webrior.module.css';
import homeStyles from './Home.module.css'; // Reusing card styles

const ProjectsPage = () => {
    const projects = [
        { id: 1, title: "Neon Cyber", category: "Web Design", image: "linear-gradient(45deg, #1A1A1A, #2a2a2a)" },
        { id: 2, title: "Alpha Corp", category: "Development", image: "linear-gradient(45deg, #0F0F0F, #1F1F1F)" },
        { id: 3, title: "Zenith", category: "Branding", image: "linear-gradient(45deg, #111, #222)" },
        { id: 4, title: "Flux", category: "App Design", image: "linear-gradient(45deg, #1A1A1A, #333)" },
        { id: 5, title: "Orbit", category: "Webflow", image: "linear-gradient(45deg, #0F0F0F, #1A1A1A)" },
        { id: 6, title: "Vertex", category: "Strategy", image: "linear-gradient(45deg, #111, #1F1F1F)" },
    ];

    return (
        <div className={styles.layout}>
            <Navbar />
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>Nuestros Proyectos</h1>
                <div className={homeStyles.portfolioGrid} style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                    {projects.map((project) => (
                        <div key={project.id} className={homeStyles.portfolioCard}>
                            <div className={homeStyles.portfolioImage} style={{ background: project.image }}>
                                {project.title} Preview
                            </div>
                            <div className={homeStyles.portfolioInfo}>
                                <h3 className={homeStyles.portfolioTitle}>{project.title}</h3>
                                <span className={homeStyles.portfolioTags}>{project.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
