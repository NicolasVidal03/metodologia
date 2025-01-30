import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PerfilPerro.css';
import { FaArrowLeft } from 'react-icons/fa';

const PerfilPerro = () => {
  const location = useLocation();
  const { perro } = location.state || {};
  const navigate = useNavigate();

  if (!perro || !perro.id) {
    return (
      <div className="perfil-perro-page" style={{textAlign:"center"}}>
        <FaArrowLeft onClick={() => navigate(-1)}/>
        <p style={{color:"black", fontSize:"3rem"}}>Error 404</p>
      </div>
    )
  }


  return (
    <div className="perfil-perro-page">
      <FaArrowLeft onClick={() => navigate(-1)}/>

      {perro && (
      <div className="perfil-perro-container">
        <div className="perfil-perro">
          
          {perro.foto[0] ? (
            <img src={`http://localhost:8000/imagen/${perro.foto[0].direccion_foto}`} alt={`Foto de ${perro.nombre}`} className="perfil-perro-foto" />
          ) : (
            <img src="/path/to/placeholder-image.jpg" alt="Imagen no disponible" className="perfil-perro-foto" />
          )}

          <h2>{perro.nombre}</h2>
          <p> <strong>Raza:</strong> {perro.raza}</p>
          <p><strong>Última ubicación:</strong> {perro.estado.direccion_visto}</p>
          <p><strong>Fecha de pérdida:</strong> {perro.estado.fecha}</p>
          <p><strong>Descripción:</strong> {perro.estado.descripcion}</p>
          <p><strong>Contacto:</strong> {perro.usuario.num_celular}</p>
          <center><a
                href={`https://wa.me/${perro.usuario.num_celular}?text=Hola, soy un usuario que encontró un perro y me gustaría coordinar la devolución de ${perro.nombre}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-button"
            >
                Contactar por WhatsApp
            </a></center>
        </div>
      </div>
        )
      }
    </div>
  );
};

export default PerfilPerro;
