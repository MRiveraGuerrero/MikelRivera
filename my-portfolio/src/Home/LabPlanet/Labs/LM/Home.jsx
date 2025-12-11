import React from 'react';
import styles from './Home.module.css';
import Header from './Header';
import Footer from './Footer';
import HeroSection from './components/HeroSection';
import ShopSection from './components/ShopSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

const Home = () => {
    // Mock video data - chaotic and funny content
    const videos = [
        { id: 1, title: 'Caos en el estudio', views: '50K', src: '/videos/caos-estudio.mp4' },
        { id: 2, title: 'Freestyle de madrugada', views: '120K', src: '/videos/freestyle-madrugada.mp4' },
        { id: 3, title: 'Detrás de cámaras', views: '85K', src: '/videos/detras-camaras.mp4' },
        { id: 4, title: 'Sesión improvisada', views: '200K', src: '/videos/sesion-improvisada.mp4' },
        { id: 5, title: 'Bromas épicas', views: '95K', src: '/videos/bromas-epicas.mp4' },
        { id: 6, title: 'Producción nocturna', views: '150K', src: '/videos/produccion-nocturna.mp4' },
        { id: 7, title: 'Momentos random', views: '75K', src: '/videos/momentos-random.mp4' },
        { id: 8, title: 'Jam session', views: '110K', src: '/videos/jam-session.mp4' },
        { id: 9, title: 'Locuras del grupo', views: '180K', src: '/videos/locuras-grupo.mp4' },
    ];

    // Mock clothing items
    const clothingItems = [
        { id: 1, name: 'LM Hoodie', price: '€45', type: 'Hoodie' },
        { id: 2, name: 'Death Legacy Tee', price: '€25', type: 'T-Shirt' },
        { id: 3, name: 'Chaos Cap', price: '€20', type: 'Cap' },
        { id: 4, name: 'Underground Jacket', price: '€80', type: 'Jacket' },
    ];

    // Mock crew members
    const crewMembers = [
        { id: 1, name: 'Rivera', role: 'RSS & Tech', caption: 'Yo he creado esta web' },
        { id: 2, name: 'Sascha', role: 'Lyrics & Vibes', caption: 'Maestro de las rimas' },
        { id: 3, name: 'Limon', role: 'Producer', caption: 'El científico del sonido' },
        { id: 4, name: 'Evander', role: 'Lyrics & Vibes', caption: 'El hiperactivo undeground' },
        { id: 5, name: 'Igor', role: 'Lyrics & Organization', caption: 'Motor ausente' },
        { id: 6, name: 'Delga', role: 'Vibes', caption: 'Esfinterman' },
        { id: 7, name: 'Xabi', role: 'Drinker', caption: 'La amenaza' },
        { id: 8, name: 'Matu', role: 'Manuel', caption: 'El afortunaoo' },
        { id: 9, name: 'Ivanlord', role: 'Nerd', caption: 'Jefe de la hermandad' },
        { id: 10, name: 'Oskitar', role: 'Madero', caption: 'El capataz' },
        { id: 11, name: 'Asier', role: 'Ausente', caption: 'Lleva AFK 3 años' },
    ];

    return (
        <div className={styles.container}>
            <Header />
            <HeroSection videos={videos} />
            <ShopSection clothingItems={clothingItems} />
            <AboutSection crewMembers={crewMembers} />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default Home;
