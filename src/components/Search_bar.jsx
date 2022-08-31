import React, { useState, useEffect } from 'react'

function Search_bar() {

    //TODO: replace fetch by props
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch("https://data.laregion.fr/api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie&q=&rows=0&facet=type&facet=commune")
            .then((rep) => rep.json())
            .then((rep) => {
                if (rep) setData(rep)
            })
    }, []);

    const types = data?.facet_groups.filter(elm => elm.name === "type")[0].facets
    const communes = data?.facet_groups.filter(elm => elm.name === "commune")[0].facets
    return (
        <div>
            <input type="text" placeholder="Rechercher ..."></input>
            <select>
                <option>Commune</option>
                {communes?.map((elm) => <option key={elm.name} title={elm.name}>{elm.name.length > 20 ? `${elm.name.slice(0, 20)}...` : elm.name}</option>)}
            </select>
            <select>
                <option>Type d'évènement</option>
                {types?.map((elm) => <option key={elm.name} title={elm.name}>{elm.name.length > 20 ? `${elm.name.slice(0, 20)}...` : elm.name}</option>)}
            </select>
            <input type="date"></input>
        </div>
    )
}

export default Search_bar