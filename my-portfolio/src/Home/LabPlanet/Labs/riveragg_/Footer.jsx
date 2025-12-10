import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'Instagram',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            url: '#'
        },
        {
            name: 'TikTok',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
            ),
            url: '#'
        },
        {
            name: 'YouTube',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" strokeWidth="2" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
                </svg>
            ),
            url: '#'
        },
        {
            name: 'Twitter',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
            url: '#'
        },
        {
            name: 'LinkedIn',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" strokeWidth="2" />
                    <rect x="2" y="9" width="4" height="12" strokeWidth="2" />
                    <circle cx="4" cy="4" r="2" strokeWidth="2" />
                </svg>
            ),
            url: '#'
        }
    ];

    const footerLinks = [
        { label: 'Sobre mí', url: '#' },
        { label: 'Servicios', url: '#' },
        { label: 'Portfolio', url: '#' },
        { label: 'Blog', url: '#' },
        { label: 'Contacto', url: '#' }
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.footerBackground}>
                <div className={styles.gridPattern}></div>
                <div className={styles.floatingDots}>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                </div>
                <div className={styles.topGlow}></div>
            </div>

            <div className={styles.footerContent}>
                {/* Main Footer Content */}
                <div className={styles.footerMain}>
                    {/* Brand Section */}
                    <div className={styles.footerBrand}>
                        <div className={styles.brandLogo}>
                            <div className={styles.logoIcon}>
                                <span className={styles.logoGlow}></span>
                                <span className={styles.logoText}>RG</span>
                            </div>
                            <span className={styles.brandName}>riveragg_</span>
                        </div>
                        <p className={styles.brandTagline}>
                            Creando experiencias digitales únicas con estilo y creatividad
                        </p>

                        {/* Social Links */}
                        <div className={styles.socialLinks}>
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    className={styles.socialLink}
                                    aria-label={social.name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.footerLinks}>
                        <h3 className={styles.linksTitle}>Enlaces Rápidos</h3>
                        <nav className={styles.linksList}>
                            {footerLinks.map((link) => (
                                <a key={link.label} href={link.url} className={styles.footerLink}>
                                    <span className={styles.linkDot}></span>
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Newsletter */}
                    <div className={styles.footerNewsletter}>
                        <h3 className={styles.newsletterTitle}>Stay Updated</h3>
                        <p className={styles.newsletterText}>
                            Suscríbete para recibir las últimas novedades
                        </p>
                        <form className={styles.newsletterForm}>
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                className={styles.newsletterInput}
                                aria-label="Email para newsletter"
                            />
                            <button type="submit" className={styles.newsletterButton}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className={styles.footerBottom}>
                    <div className={styles.separator}></div>
                    <div className={styles.bottomContent}>
                        <p className={styles.copyright}>
                            © {currentYear} riveragg_. Todos los derechos reservados.
                        </p>
                        <div className={styles.legalLinks}>
                            <a href="#" className={styles.legalLink}>Privacidad</a>
                            <span className={styles.legalDivider}>·</span>
                            <a href="#" className={styles.legalLink}>Términos</a>
                            <span className={styles.legalDivider}>·</span>
                            <a href="#" className={styles.legalLink}>Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
