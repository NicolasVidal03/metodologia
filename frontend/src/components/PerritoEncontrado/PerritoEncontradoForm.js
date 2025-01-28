import React, { useContext, useState } from 'react';
import '../PerritoPerdido/PerritoPerdidoForm.css';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const PerritoEncontradoForm = () => {
  const [foto, setFoto] = useState(null);
  const [descripcion, setDescription] = useState('');
  const [raza, setRaza] = useState('');
  const [color, setColor] = useState('');
  const [genero, setGenero] = useState('');
  const [direccion, setDireccion] = useState('');
  const [date, setDate] = useState('');
  const { user } = useContext(AuthContext)
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
        console.log("Hubo un problema en la subida de la foto, comprueba tu conexión de internet");
        throw new Error('Error en la subida de la foto');
      }
      const data_foto = await response_foto.json()
      console.log("Imagen subida:", data_foto.file_id)
      const response_estado = await axios.post('http://localhost:8000/perro/estado', {
        descripcion: descripcion,
        direccion_visto: direccion,
        fecha: date,
        estado: 0,
      });
      console.log(response_estado.data[0]);

      const response = await axios.post('http://localhost:8000/perro/data', {
        raza: raza,
        color: color,
        genero: genero,
        nombre: 'Perro encontrado',
        usuario_id: user.id,
        estado_perro_id: response_estado.data[0].id
      });
      console.log("Datos perro:", response.data)

    
      const response_imagen_perrito = await axios.post('http://localhost:8000/foto/post', {
        direccion_foto: data_foto.file_id,
        perrito_id: response.data[0].id
      });
      console.log('imagen bd: ', response_imagen_perrito)

      alert("Se registró el perrito encontrado");
      navigate('/home');
    } catch (error) {
      console.error('Error en registro:', error);
    }
  };

 
  return (
    <div className="perrito-perdido-form-container">
      <h2>Reporta un Perrito Encontrado</h2>
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
          <option value="Golgen">Golden</option>
          <option value="Chapi">Chapi</option>
          <option value="Bulldog">Bulldog</option>
          <option value="Pastor Aleman">Pastor Alemán</option>
        </select>
        <select defaultValue="" onChange={(e) => setColor(e.target.value)}>
          <option  value="" disabled>Selecciona su color</option>
          <option value="Cafe">Cafe</option>
          <option value="Blanco">Blanco</option>
          <option value="Beige">Beige</option>
          <option value="Negro">Negro</option>
        </select>
        <button type="submit">Enviar Reporte</button>
      </form>
    </div>
  );
};

export default PerritoEncontradoForm;