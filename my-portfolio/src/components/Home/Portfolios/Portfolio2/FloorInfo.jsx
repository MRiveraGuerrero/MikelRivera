import React from 'react';
import profileImage from '../../../../assets/me/me.png';
import reactLogo from '../../../../assets/logos/react.svg';
import nodeLogo from '../../../../assets/logos/nodejs.svg';
import javaLogo from '../../../../assets/logos/java.svg';
import htmlLogo from '../../../../assets/logos/html.svg';
import cssLogo from '../../../../assets/logos/css.svg';
import jsLogo from '../../../../assets/logos/javascript.svg';
import pythonLogo from '../../../../assets/logos/python.svg';
import stripeLogo from '../../../../assets/logos/stripe.svg';
import mysqlLogo from '../../../../assets/logos/mysql.svg';
import wordpressLogo from '../../../../assets/logos/wordpress.svg';
import railwayLogo from '../../../../assets/logos/railway.svg';
import githubLogo from '../../../../assets/logos/github.svg';

import './FloorInfo.css';

export default function FloorInfo({ currentFloorIndex }) {

  const techSkills = [
    { name: 'Java', logo: javaLogo },
    { name: 'HTML', logo: htmlLogo },
    { name: 'CSS', logo: cssLogo },
    { name: 'JavaScript', logo: jsLogo },
    { name: 'Python', logo: pythonLogo },
    { name: 'Stripe', logo: stripeLogo },
    { name: 'MySQL', logo: mysqlLogo },
    { name: 'WordPress', logo: wordpressLogo },
    { name: 'Railway', logo: railwayLogo },
    { name: 'Github', logo: githubLogo },
    { name: 'React', logo: reactLogo },
    { name: 'Node.js', logo: nodeLogo },
  ];

  const personalQualities = [
    { text: 'Creatividad', icon: '✨' },
    { text: 'Curiosidad', icon: '📚' },
    { text: 'Resiliencia', icon: '💪' },
    { text: 'Atención al detalle', icon: '🧐' },
    { text: 'Pensamiento crítico', icon: '💡' },
  ];
  
  const renderContent = () => {
    switch (currentFloorIndex) {
      case 3:
        return (
          <>
            <div className="info-box left pixel-bg">
              <h2>Portfolios</h2>
              <ul>
                <li>Web Design</li>
                <li>Aplicaciones Móviles</li>
                <li>Videojuegos</li>
              </ul>
            </div>
            <div className="info-box right pixel-bg">
              <h2>Explicaciones</h2>
              <ul>
                <li>Detalles de cada proyecto</li>
                <li>Stack Tecnológico</li>
                <li>Enlaces y demos</li>
              </ul>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="info-box left pixel-bg">
              <h2>Competencias Técnicas</h2>
              <div className="skills-grid">
                {techSkills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <img src={skill.logo} alt={skill.name} />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="info-box right pixel-bg">
              <h2>Competencias Personales</h2>
              <ul>
                {personalQualities.map((quality, index) => (
                  <li key={index}>
                    {quality.icon} {quality.text}
                  </li>
                ))}
              </ul>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="info-box left pixel-bg">
              <h2>Proyectos</h2>
              <ul>
                <li>Juego Web Multijugador</li>
                <li>Plataforma de Encuestas</li>
                <li>Motor de Clustering IA</li>
              </ul>
            </div>
            <div className="info-box right pixel-bg">
              <h2>Detalles</h2>
              <ul>
                <li>Descripción técnica</li>
                <li>Retos enfrentados</li>
                <li>Resultados obtenidos</li>
              </ul>
            </div>
          </>
        );
      case 0:
        return (
          <>
            <div className="info-box left pixel-bg">
              <h2>Contacto</h2>
              <ul>
                <li>Email: tuemail@example.com</li>
                <li>LinkedIn</li>
                <li>GitHub</li>
              </ul>
            </div>
            <div className="info-box right pixel-bg">
              <h2>Formulario / Mensaje</h2>
              <ul>
                <li>Formulario de contacto</li>
                <li>Redes sociales</li>
              </ul>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="floor-info-container">
      {renderContent()}
    </div>
  );
}
