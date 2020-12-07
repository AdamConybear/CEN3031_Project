import React, { useState } from "react";
// import "./LeafletMap.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
const LeafletMap = (props) => {
  const position = [29.6425, -82.3693];
  return (
    <MapContainer
      className="map"
      center={position}
      zoom={9}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <Marker position={[29.6425, -82.3693]}>
        <Popup>UF Counseling and Wellness Center @ Radio Road</Popup>
      </Marker>
      <Marker position={[29.63835, -82.33962]}>
        <Popup>UF Health Fitness and Wellness Center</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
