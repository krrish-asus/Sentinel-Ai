import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function WorldMap() {
  const positions = [
    { name: "India", coords: [20.5937, 78.9629] },
    { name: "USA", coords: [37.0902, -95.7129] },
    { name: "Brazil", coords: [-14.235, -51.9253] },
  ];

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "350px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {positions.map((pos, i) => (
        <Marker key={i} position={pos.coords}>
          <Popup>{pos.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}