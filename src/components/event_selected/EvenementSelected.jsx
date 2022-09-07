import React, { useState, useEffect } from "react";
import Map from "../map/Map";


function EvenementSelected(props) {
    const myID = "e79f5d5dbea59bdf4b322f93e5caa86d91ad1ba1";
    const object = props.item;
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
                <div className="left">
                    <h1>{object.fields.titre}</h1>
                    <div className="text">
                        <p className="colorText">{object.fields.description}</p>
                    </div>
                </div>
                <div className="right">
                    <h2>{object.fields.adresse}</h2>
                    <h2>{object.fields.date_debut}</h2>
                    <h2>{object.fields.date_fin}</h2>
                </div>
            </div>


            <div>
                <Map />
            </div>
        </>
    );
}

export default EvenementSelected;
