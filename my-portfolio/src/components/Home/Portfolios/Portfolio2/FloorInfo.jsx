import React from 'react';
import './FloorInfo.css';

export default function FloorInfo({ currentFloorIndex }) {
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
              <ul>
                <li>JavaScript / React</li>
                <li>Node.js / Express</li>
                <li>MySQL / MongoDB</li>
                <li>Docker / Kubernetes</li>
              </ul>
            </div>
            <div className="info-box right pixel-bg">
              <h2>Competencias Personales</h2>
              <ul>
                <li>Trabajo en equipo</li>
                <li>Resolución de problemas</li>
                <li>Creatividad</li>
                <li>Adaptabilidad</li>
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
