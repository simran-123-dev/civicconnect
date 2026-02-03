import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { getComplaints } from "../utils/complaints";

// 🔴🟡🟢 Icons
const icons = {
  Pending: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
  }),
  "In Progress": new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    iconSize: [32, 32],
  }),
  Resolved: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [32, 32],
  }),
};

const MapDashboard = () => {
  const complaints = getComplaints();

  return (
    <div className="h-[calc(100vh-96px)]">
      <MapContainer
        center={[28.6139, 77.209]} // Delhi default
        zoom={12}
        className="h-full w-full"
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {complaints.map((c) => (
          <Marker
            key={c.id}
            position={c.location || [28.6139, 77.209]}
            icon={icons[c.status]}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{c.title}</p>
                <p>Category: {c.category}</p>
                <p>Status: {c.status}</p>
                <p>Date: {c.date}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapDashboard;
