import React, { useRef, useState } from 'react';
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
import screenshotSV2 from '../../../../assets/ProjectImages/SV2.png';
import screenshotBisky from '../../../../assets/ProjectImages/Bisky.png'
import './FloorInfo.css';
import emailjs from 'emailjs-com';

export default function FloorInfo({ currentFloorIndex }) {

  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    // Ajustado para Create React App (process.env)
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userId = process.env.REACT_APP_EMAILJS_USER_ID;
    console.log(currentFloorIndex);
    emailjs.sendForm(serviceId, templateId, form.current, userId)
      .then((result) => {
          console.log(result.text);
          setIsSent(true);
          setError(false);
          form.current.reset();
          // Opcional: ocultar el mensaje después de unos segundos
          setTimeout(() => setIsSent(false), 5000);
      }, (error) => {
          console.log(error.text);
          setError(true);
          setIsSent(false);
          // Opcional: ocultar el mensaje después de unos segundos
          setTimeout(() => setError(false), 5000);
      });
  };

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

  const proyectos = [
    {
      id: 1,
      title: "Survival Vacation 2",
      image: screenshotSV2,
      description: "Juego multijugador online de supervivencia.",
      link: "https://survivalvacation2.com",
    },
    {
      id: 2,
      title: "Bisky Team",
      image: screenshotBisky,
      description: "Plataforma de encuestas y análisis de datos.",
      link: "https://biskyteam.com",
    },
  ];
  
  const renderContent = () => {
    switch (currentFloorIndex) {
      case 3:
        return (
          <>
            <div className="info-box left pixel-bg">
              <h2>Portfolios</h2>
              <ul>
                <li>Spacecraft</li>
                <li>Elevator</li>
                <li>Elevator 2</li>
              </ul>
            </div>
            <div className="info-box right pixel-bg">
              <h2>Explicaciones</h2>
              <ul>
                ¡Hola! Soy Mikel Rivera Guerrero, un estudiante de Ingeniería Informática de Gestión y Sistemas de Información con un gran entusiasmo por el sector tecnológico y siempre en camino hacia la mejora continua.
              </ul>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="info-box left pixel-bg">
              <h2>Competencias Técnicas</h2>
              <div className="skills-grid2">
                {techSkills.map((skill, index) => (
                  <div key={index} className="skill-item2">
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
                {/* Usamos un grid similar al de las skills para mostrar los proyectos */}
                <div className="skills-grid2">
                  {proyectos.map((proyecto) => (
                    <article 
                      key={proyecto.id} 
                      className="skill-item2 project-card" // Añadida clase extra para estilos específicos si es necesario
                      onClick={() => window.open(proyecto.link, "_blank")}
                      style={{ cursor: 'pointer' }}
                    >
                      <img src={proyecto.image} alt={proyecto.title} className="project-image" />
                      <div className="project-content">
                          <h3 className="project-title">{proyecto.title}</h3>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="info-box right pixel-bg">
                <h2>Detalles</h2>
                <ul>
                </ul>
              </div>
            </>
          );
      case 0:
        return (
          <>
            <div className="info-box left pixel-bg">
              <h2>Contacto</h2>
              <ul className="contact-links">
                <li><a href="mailto:mikelrg2003@gmail.com">mikelrg2003@gmail.com</a></li>
                {/* Puedes añadir tus enlaces reales aquí */}
                <li><a href="https://www.linkedin.com/in/mikel-rivera-guerrero-801248295" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://github.com/MRiveraGuerrero" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </div>
            <div className="info-box right pixel-bg">
              <form ref={form} onSubmit={sendEmail} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input type="text" id="name" name="user_name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="user_email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Asunto</label>
                  <input type="text" id="subject" name="subject" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mensaje</label>
                  <textarea id="message" name="message" rows="4" required></textarea>
                </div>
                <button type="submit" className="submit-button">Enviar</button>

                {isSent && <p className="success-message">¡Mensaje enviado con éxito!</p>}
                {error && <p className="error-message">Error al enviar. Inténtalo de nuevo.</p>}
              </form>
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
