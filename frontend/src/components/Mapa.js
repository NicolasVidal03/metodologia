import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Mapa = ({ lat, lng }) => {
  if (!lat || !lng) return <p>Cargando mapa...</p>;

  return (
    <MapContainer center={[lat, lng]} zoom={13} style={{ height: "250px", width: "250px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]}>
        <Popup>Ubicación guardada</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Mapa;
