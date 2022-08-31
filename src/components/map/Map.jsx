import React from 'react'
import { 
    TileLayer,
    MapContainer, 
} from 'react-leaflet'

const Map = () => {

  return (
    <div className={{width: '20%'}}>
          <MapContainer center={[43.604652, 1.444209]} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
    </div>

  )
}

export default Map