import React, { useState } from "react";

import './style.css';

import Map from "../map/Map";


function EventSelected(props) {
    const item = props.item
    const [state, setState] = useState(null);
    return (
        <>
            <div className="rect">
                <div className="mobilView">
                    <div className="title">
                        <h1>{(item.fields.titre).replace('&#8217;', "'")}</h1>
                    </div>
                    <div className="right">
                        <h3>{item.fields.adresse}</h3>
                        <hr />
                        <h3>{item.fields.date_debut}</h3>
                        <hr />
                        <h3>{item.fields.date_fin}</h3>
                    </div>
                    <div className="text">
                        <p className="colorText">{(item.fields.description).replace('&nbsp;', ' ')}</p>
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
