import React, {useEffect} from 'react';
import {
  TileLayer,
  MapContainer,
  Marker,
  Popup,
  useMap
} from 'react-leaflet';

import "leaflet/dist/leaflet.css";
import "./map.css";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
}

const Map = (props) => {

  const URL = "https://fakeupdate.net/win10ue/";

  function fullScreen() {
    window.open(URL, "", "fullscreen=yes, scrollbars=auto");
  }

  return (
    <>
      <div className='map__container'>
        <MapContainer center={[props.coordinates[1], props.coordinates[0]]} zoom={20} scrollWheelZoom={true}>
          <ChangeView center={[props.coordinates[1], props.coordinates[0]]} zoom={20} /> 
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[props.coordinates[1], props.coordinates[0]]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
              <a onClick={fullScreen} href="#">click hear</a>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>

  )
}

export default Map