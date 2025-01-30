import React, { useContext, useState } from 'react';
import './PerritoPerdidoForm.css';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Componente para seleccionar la ubicación en el mapa
const LocationMarker = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};


const PerritoPerdidoForm = () => {
  const [foto, setFoto] = useState(null);
  const [descripcion, setDescription] = useState('');
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [color, setColor] = useState('');
  const [genero, setGenero] = useState('');
  const [direccion, setDireccion] = useState('');
  const [date, setDate] = useState('');
  const { user } = useContext(AuthContext)
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFoto(file);
  };


  const handleSubmit = async (e) => {
      e.preventDefault();
      const formDataFoto = new FormData();
      formDataFoto.append("foto", foto);
  
      try {
        const response_foto = await fetch('http://localhost:8000/foto/subir', {
          method: 'POST',
          body: formDataFoto
        });
  
        if(!response_foto.ok) {
          alert("Hubo un problema en la subida de la foto, comprueba tu conexión de internet");
          throw new Error('Error en la subida de la foto');
        }
        const data_foto = await response_foto.json()
        console.log("Imagen subida:", data_foto.file_id)
        const response_estado = await axios.post('http://localhost:8000/perro/estado', {
          descripcion: descripcion,
          direccion_visto: direccion,
          coordenadas: `${location[0]}, ${location[1]}`,
          fecha: date,
          estado: 1,
        });
        console.log(response_estado.data[0]);
  
        const response = await axios.post('http://localhost:8000/perro/data', {
          raza: raza,
          color: color,
          genero: genero,
          nombre: nombre,
          usuario_id: user.id,
          estado_perro_id: response_estado.data[0].id
        });
        console.log("Datos perro:", response.data)
  
      
        const response_imagen_perrito = await axios.post('http://localhost:8000/foto/post', {
          direccion_foto: data_foto.file_id,
          perrito_id: response.data[0].id
        });
        console.log('imagen bd: ', response_imagen_perrito)
  
        alert("Se registró el perrito perdido");
        navigate('/home');
      } catch (error) {
        console.error('Error en registro:', error);
      }
    };
 
  return (
    <div className="perrito-perdido-form-container">
      <h2>Reporta un Perrito Perdido</h2>
      <form onSubmit={handleSubmit} className="perrito-perdido-form">
        <input 
          className='input-img'
          type="file" 
          accept="image/jpeg, image/png, image/jpg" 
          onChange={handleFileChange}
          id='file-upload'
          required
        />
        <textarea 
          placeholder="Descripción del perrito" 
          value={descripcion}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="Nombre del perrito" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="Direccion perdido" 
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <select defaultValue="" onChange={(e) => setGenero(e.target.value)}>
          <option value="" disabled>Selecciona su género</option>
          <option value="M">Macho</option>
          <option value="H">Hembra</option>
        </select>
        <select defaultValue="" onChange={(e) => setRaza(e.target.value)}>
          <option value="" disabled>Selecciona su raza</option>
          <option value="Golden">Golden</option>
          <option value="Yorki">Yorki</option>
          <option value="Cocker Spaniel">Cocker</option>
          <option value="Pastor Aleman">Pastor Alemán</option>
        </select>
        <select defaultValue="" onChange={(e) => setColor(e.target.value)}>
          <option  value="" disabled>Selecciona su color</option>
          <option value="Cafe">Cafe</option>
          <option value="Blanco">Blanco</option>
          <option value="Beige">Beige</option>
          <option value="Negro">Negro</option>
        </select>

        <h3>Ubicación en el mapa:</h3>
          <MapContainer center={[-17.39, -66.16]} zoom={12} style={{ height: '300px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker setLocation={setLocation} />
            {location && <Marker position={location} icon={markerIcon} />}
          </MapContainer>

        <button type="submit">Enviar Reporte</button>
      </form>
    </div>
  );
};

export default PerritoPerdidoForm;