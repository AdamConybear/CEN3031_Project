import React from "react";
// import "./LeafletMap.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const LeafletMap = (props) => {
  const mapPositions = [11.1271, 78.6569];
  return (
    <MapContainer
      className="map"
      center={[mapPositions[0], mapPositions[1]]}
      zoom={5}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default LeafletMap;
