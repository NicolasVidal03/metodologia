import React, { useState, useEffect } from "react";
import "./PaginaPerroEncontrado.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaginaPerrosEncontrados = () => {
  const [loading, setLoading] = useState(true);
  const [perritos, setPerritos] = useState(null);
  const [perrosPerdidos, setPerrosPerdidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const perritosData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/perritos');
        setPerritos(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    perritosData();
  }, []);

  useEffect(() => {
    if (perritos) {
      let perritos_perdidos = perritos.filter((perro) => perro.estado.estado === 0);
      setPerrosPerdidos(perritos_perdidos);
    }
  }, [perritos]);

  return (
    <div id="pagina-perros-perdidos" className="pagina-perros-perdidos">
      <h1 id="titulo-perros-perdidos" className="titulo">Perros Encontrados</h1>
      <button
        className="dog-button"
        onClick={() => navigate("/perritoencontradoform")}
      >
        <span className="shadow-button"></span>
        <span className="edge-button"></span>
        <span className="front-button text-button">Encontré un perrito</span>
      </button>

      <div id="perros-container" className="perros-container">
        {perrosPerdidos.map((perro, index) => (
          <div
            className="perro-card"
            key={index}
            onClick={() => navigate(`/perfil-perro/${perro.id}`, { state: { perro } })}>
            <h3 className="perro-nombre">{perro.nombre}</h3>

            <div className="perro-info">
              <p className="perro-fecha">{perro.estado.fecha}</p>
              <strong>Fecha de pérdida</strong>
            </div>
            <div className="perro-info">
              <p className="perro-ubicacion">{perro.estado.direccion_visto}</p>
              <strong>Última ubicación</strong>
            </div>
            <div className="perro-info">
              <p className="perro-contacto">{perro.usuario.num_celular}</p>
              <strong>Contacto</strong>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div id="loading-message" className="loading-message">
          <span>Cargando imágenes...</span>
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default PaginaPerrosEncontrados;
