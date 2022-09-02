import React, { useState, useEffect } from "react";
import Map from "../map/Map";


function EvenementSelected() {
    const myID = "e79f5d5dbea59bdf4b322f93e5caa86d91ad1ba1";
    const object = {
        "datasetid": "agendas-participatif-des-sorties-en-occitanie",
        "recordid": "1cdf085c467ebe88ff9a572dcf66a17e8ec02b9b",
        "fields": {
            "thematique": "Culture",
            "type": "Agenda / Mes sorties",
            "code_insee": "34172",
            "geo_shape": {
                "coordinates": [
                    3.86926442936,
                    43.6133538787
                ]
                ,
                "type": "Point"
            }
            ,
            "url": "https://www.laregion.fr/CONCERT-DE-LABESS-ET-KAMEL-EL-HARRACHI",
            "date": "Dimanche 18 septembre",
            "adresse": "Amphi d'Ô, Domaine d'Ô, 34090 Montpellier - Hérault",
            "titre": "CONCERT DE LABESS ET KAMEL EL HARRACHI",
            "date_fin": "2022-09-19",
            "date_debut": "2022-09-18",
            "commune": "Montpellier",
            "geo_point_2d": [
                43.6133538787,
                3.86926442936
            ]
            ,
            "description": "KAMEL EL HARRACHI Héritier d’une lignée familiale, fils de l’immense Damane El Harrachi et de la tradition algérienne de la chanson à textes, Kamel El Harrachi, auteur, compositeur et joueur de mandole, interprète ses propres compositions et celles de son père. LABESS Puissant (...)"
        }
        ,
        "geometry": {
            "type": "Point",
            "coordinates": [
                3.86926442936,
                43.6133538787
            ]
        }
        ,
        "record_timestamp": "2022-09-01T08:46:02.066Z"
    }
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


            <section>
                <Map />
            </section>
        </>
    );
}

export default EvenementSelected;
