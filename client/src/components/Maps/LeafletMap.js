import React, { useState } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
//import "./LeafletMap.css";
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
  const position = [29.644900, -82.355410];

  let greenIcon = L.icon({
    iconUrl: require('../../assets/BlackStar.png'),
    iconRetinaUrl: require('../../assets/BlackStar.png'),
    popupAnchor: [0, -10],
    iconSize: [25, 25],
    className: 'leaflet-marker-icon'
});
let redIcon = L.icon({
  iconUrl: require('../../assets/SolidSquare.png'),
  iconRetinaUrl: require('../../assets/SolidSquare.png'),
  iconSize: [15, 15],
  popupAnchor: [0, -10],
  className: 'leaflet-marker-icon'
});
let purpleIcon = L.icon({
  iconUrl: require('../../assets/Triangle.png'),
  iconRetinaUrl: require('../../assets/Triangle.png'),
  iconSize: [20, 20],
  popupAnchor: [0, -10],
  className: 'leaflet-marker-icon'
});

let circleIcon = L.icon({
  iconUrl: require('../../assets/Circle.png'),
  iconRetinaUrl: require('../../assets/Circle.png'),
  iconSize: [20, 20],
  popupAnchor: [0, -10],
  className: 'leaflet-marker-icon'
});

  return (
    <div>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossorigin=""/>
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
          crossorigin="">
          </script>
    </head>
    <MapContainer
      className="map"
      center={position}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <Marker position={[29.6425, -82.3693]} icon={circleIcon}>
        <Popup>UF Counseling and Wellness Center @ Radio Road</Popup>
      </Marker>
      <Marker position={[29.63835, -82.33962]} icon={circleIcon}>
        <Popup>UF Health Fitness and Wellness Center</Popup>
      </Marker>
      <Marker position={[29.639985,-82.343442]} icon={circleIcon}>
        <Popup>UF Shands Hospital</Popup>
      </Marker>
      <Marker position={[29.638060, -82.368553]} icon={greenIcon}>
        <Popup>Southwest Recreation Center</Popup>
      </Marker>
      <Marker position={[29.650111, -82.346739]} icon={greenIcon}>
        <Popup>Student Recreation Center </Popup>
      </Marker>
      <Marker position={[29.650012, -82.364873]} icon={greenIcon}>
        <Popup> UF Golf Course </Popup>
      </Marker>
      <Marker position={[29.650350,-82.342926]} icon={redIcon}>
        <Popup> Plaza of the Americas </Popup>
      </Marker>
      <Marker position={[29.643472,-82.362429]} icon={redIcon}>
        <Popup> Lake Alice </Popup>
      </Marker>
      <Marker position={[29.647984,-82.350104]} icon={purpleIcon}>
        <Popup> Gator Corner Dining </Popup>
      </Marker>
      <Marker position={[29.646964,-82.341283]} icon={purpleIcon}>
        <Popup> Broward Dining </Popup>
      </Marker>
    </MapContainer>
    </div>
  );
};

export default LeafletMap;
