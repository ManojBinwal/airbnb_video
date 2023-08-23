'use client';

// Importing necessary dependencies
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Importing marker icons and shadow images from Leaflet's distribution
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Removing the default Icon prototype to customize marker icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
// Merging custom icon options with default options
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

// Defining the props that the Map component accepts
interface MapProps {
  center?: number[];
}

// OpenStreetMap URL and attribution
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// The actual Map component
const Map: React.FC<MapProps> = ({ center }) => {
  return (
      <MapContainer 
        center={center as L.LatLngExpression || [51, -0.09]}  // Setting the center of the map
        zoom={center ? 4 : 2}  // Setting the zoom level based on the center presence
        scrollWheelZoom={false}  // Disabling scroll wheel zoom
        className="h-[35vh] rounded-lg"  // Applying CSS classes for styling
      >
        <TileLayer
          url={url}  // Setting the tile layer URL
          attribution={attribution}  // Providing attribution for the map
        />
        {center && (
          // Placing a marker on the map at the specified center location
          <Marker position={center as L.LatLngExpression} />
        )}
      </MapContainer>
  )
}

export default Map;
