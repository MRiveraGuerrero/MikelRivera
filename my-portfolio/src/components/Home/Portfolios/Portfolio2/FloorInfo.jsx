import React from 'react';

export default function FloorInfo({ currentFloorIndex }) {
  return (
    <>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 ml-4 frente">
        {currentFloorIndex === 0 && (
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="font-bold mb-2">Planta Baja</h2>
            <ul>
              <li>Recepción</li>
              <li>Sala de espera</li>
            </ul>
          </div>
        )}
        {currentFloorIndex === 1 && (
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="font-bold mb-2">Piso 1</h2>
            <ul>
              <li>Oficina A</li>
              <li>Oficina B</li>
            </ul>
          </div>
        )}
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-4">
        {currentFloorIndex === 0 && (
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="font-bold mb-2">Info</h2>
            <ul>
              <li>Horarios</li>
              <li>Contacto</li>
            </ul>
          </div>
        )}
        {currentFloorIndex === 1 && (
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="font-bold mb-2">Noticias</h2>
            <ul>
              <li>Reunión semanal</li>
              <li>Actualizaciones</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
