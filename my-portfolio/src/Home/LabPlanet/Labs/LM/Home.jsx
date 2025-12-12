import React from 'react';
import styles from './Home.module.css';
import Header from './Header';
import Footer from './Footer';
import HeroSection from './components/HeroSection';
import ShopSection from './components/ShopSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

const Home = () => {
    // Real video data from public folder
    const videos = [
        { id: 1, title: 'Caos en el estudio', views: '50K', src: '/assets/videos/1000060906.mp4' },
        { id: 2, title: 'Freestyle de madrugada', views: '120K', src: '/assets/videos/1000060907.mp4' },
        { id: 3, title: 'Detrás de cámaras', views: '85K', src: '/assets/videos/1000060912.mp4' },
        { id: 4, title: 'Sesión improvisada', views: '200K', src: '/assets/videos/1000060913.mp4' },
        { id: 5, title: 'Bromas épicas', views: '95K', src: '/assets/videos/1000060914.mp4' },
        { id: 6, title: 'Producción nocturna', views: '150K', src: '/assets/videos/1000060916.mp4' },
        { id: 7, title: 'Momentos random', views: '75K', src: '/assets/videos/1000060919.mp4' },
        { id: 8, title: 'Jam session', views: '110K', src: '/assets/videos/1000060920.mp4' },
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
        { id: 1, name: 'Rivera', role: 'RSS & Tech', caption: 'Yo he creado esta web', image: '/assets/lm_gang/rivera.jpg' },
        { id: 2, name: 'Sascha', role: 'Lyrics & Vibes', caption: 'Maestro de las rimas', image: '/assets/lm_gang/sascha.jpg' },
        { id: 3, name: 'Limon', role: 'Producer', caption: 'El científico del sonido', image: '/assets/lm_gang/limon.jpg' },
        { id: 4, name: 'Evander', role: 'Lyrics & Vibes', caption: 'El hiperactivo undeground', image: '/assets/lm_gang/evander.jpg' },
        { id: 5, name: 'Igor', role: 'Lyrics & Organization', caption: 'Motor ausente', image: '/assets/lm_gang/igor.jpg' },
        { id: 6, name: 'Delga', role: 'Vibes', caption: 'Esfinterman', image: '/assets/lm_gang/delgado.jpg' },
        { id: 7, name: 'Xabi', role: 'Drinker', caption: 'La amenaza' },
        { id: 8, name: 'Matu', role: 'Manuel', caption: 'El afortunaoo', image: '/assets/lm_gang/manu.jpg' },
        { id: 9, name: 'Ivanlord', role: 'Nerd', caption: 'Jefe de la hermandad', image: '/assets/lm_gang/ivanlo.JPG' },
        { id: 10, name: 'Oskitar', role: 'Madero', caption: 'El capataz', image: '/assets/lm_gang/oskitar.jpg' },
        { id: 11, name: 'Asier', role: 'Ausente', caption: 'Lleva AFK 3 años', image: '/assets/lm_gang/asier.jpg' },
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
