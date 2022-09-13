import React, { useState, useEffect } from "react";

import './style.css';

import Map from "../map/Map";


function EventSelected(props) {
    const myID = "e79f5d5dbea59bdf4b322f93e5caa86d91ad1ba1";
    const object = props.item
    const [state, setState] = useState(null);
    /* useEffect(() => {
    fetch(`https://data.https://data.laregion.fr/api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie&q=&lang=fr&facet=type&facet=thematique&facet=date_debut&facet=commune&refine.recordid=${myID}.fr/api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie&q=&lang=fr&facet=type&facet=thematique&facet=date_debut&facet=commune`)
    .then((res) => res.json(res))
    .then((res) => {
    if (res) setState(res)
    })
    .then((res) => console.log(setState));
    }, []); */
    return (
        <>
            <div className="rect">
                <div className="mobilView">
                    <div className="title">
                        <h1>{object.fields.titre}</h1>
                    </div>
                    <div className="right">
                        <h3>{object.fields.adresse}</h3>
                        <hr />
                        <h3>{object.fields.date_debut}</h3>
                        <hr />
                        <h3>{object.fields.date_fin}</h3>
                    </div>
                    <div className="text">
                        <p className="colorText">{object.fields.description}</p>
                    </div>
                </div>
            </div>

            <div>
                <Map coordinates={props.item.geometry.coordinates} />
            </div>
        </>
    );
}

export default EventSelected;
