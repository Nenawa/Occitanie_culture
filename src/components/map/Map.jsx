import React from 'react';
import { 
    TileLayer,
    MapContainer,
    Marker,
    Popup
} from 'react-leaflet';

import "leaflet/dist/leaflet.css";
import "./map.css";

const Map = () => {

  const position = [43.604652, 1.444209 ];

  return (
    <>
      <div className='map__container'>
        <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
              <a id='full' href='https://fakeupdate.net/win10ue/'>click hear</a>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>

  )
}

export default Map