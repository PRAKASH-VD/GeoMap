import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapView = ({ data, selectedId, onSelect }) => {
  const baseIcon = L.divIcon({
    className: "marker-dot",
    html: '<span class="marker-dot__core"></span>',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  const activeIcon = L.divIcon({
    className: "marker-dot marker-dot--active",
    html: '<span class="marker-dot__core marker-dot__core--active"></span>',
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });

  return (
    <div className="h-[70vh] rounded-xl overflow-hidden shadow-lg">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker Clustering */}
        <MarkerClusterGroup chunkedLoading>
          {data.map(project => {
            const isActive = project.id === selectedId;
            return (
              <Marker
                key={project.id}
                position={[project.latitude, project.longitude]}
                icon={isActive ? activeIcon : baseIcon}
                zIndexOffset={isActive ? 1000 : 0}
                eventHandlers={{
                  click: () => onSelect(project.id),
                }}
              />
            );
          })}
        </MarkerClusterGroup>

      </MapContainer>
    </div>
  );
};

export default MapView;
