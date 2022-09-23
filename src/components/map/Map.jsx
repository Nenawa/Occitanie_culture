import React, { useState } from "react";
import { TileLayer, MapContainer, Marker, Popup, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./map.css";
import LoadingPage from "../loadingPage/LoadingPage";

function Map(props) {
  const [showLoadingPage, setShowLoadingPage] = useState(false);

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
  }

  function fullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setShowLoadingPage(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  function MapView() {
    return (
      <div className="map__container">
        <MapContainer
          center={[props.coordinates[1], props.coordinates[0]]}
          zoom={20}
          scrollWheelZoom
        >
          <ChangeView
            center={[props.coordinates[1], props.coordinates[0]]}
            zoom={20}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[props.coordinates[1], props.coordinates[0]]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
              <a onClick={fullScreen}>click ici</a>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
  return !showLoadingPage ? <MapView /> : <LoadingPage />;
}

export default Map;
