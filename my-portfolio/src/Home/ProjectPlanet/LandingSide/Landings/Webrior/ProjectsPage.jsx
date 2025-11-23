import React from 'react';
import Navbar from './Navbar';
import layoutStyles from './Webrior.module.css';
import styles from './ProjectsPage.module.css';

const ProjectsPage = () => {
    const projects = [
        { id: 1, title: "Neon Cyber", category: "Web Design", image: "/assets/projects/neon_cyber.png" },
        { id: 2, title: "Alpha Corp", category: "Development", image: "/assets/projects/alpha_corp.png" },
        { id: 3, title: "Zenith", category: "Branding", image: "/assets/projects/zenith.png" },
        { id: 4, title: "Flux", category: "App Design", image: "/assets/projects/flux.png" },
        { id: 5, title: "Orbit", category: "Webflow", image: "/assets/projects/orbit.png" },
        { id: 6, title: "Vertex", category: "Strategy", image: "/assets/projects/vertex.png" },
    ];

    return (
        <div className={layoutStyles.layout}>
            <Navbar />
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>Nuestros Proyectos</h1>
                <div className={styles.portfolioGrid}>
                    {projects.map((project) => (
                        <div key={project.id} className={styles.portfolioCard}>
                            <div
                                className={styles.portfolioImage}
                                style={{ backgroundImage: `url(${project.image})` }}
                            >
                            </div>
                            <div className={styles.portfolioInfo}>
                                <h3 className={styles.portfolioTitle}>{project.title}</h3>
                                <span className={styles.portfolioTags}>{project.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
