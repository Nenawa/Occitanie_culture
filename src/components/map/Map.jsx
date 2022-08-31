import React, { useEffect, useState } from 'react';
import { 
    TileLayer,
    MapContainer,
    Marker,
    Popup
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const Map = () => {

  let url = "https://data.laregion.fr/api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie&q=&facet=type&facet=thematique&facet=date_debut&facet=commune";
  let options = { method : 'GET'};

  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(url, options)
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        setRecords(result.records);
      }).catch(function(error) {
        console.log(error);
      });
  });

  const position = [43.568452,1.463685 ];

  return (
    <>
      <MapContainer center={position} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          records.map((record) => 
            <Marker position={record.fields.geo_shape.coordinates}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          )
        }
      </MapContainer>
    </>
  )
}

export default Map