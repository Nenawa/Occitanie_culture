import React, { useState, useEffect, useRef } from 'react'

function Search_bar() {
    const searchRef = useRef(null);
    const communeRef = useRef(null);
    const typeRef = useRef(null);
    const dateRef = useRef(null);

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

    function handleChange() {
        const link = `https://data.laregion.fr/api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie${searchRef.current.value ? `&q=${searchRef.current.value.replaceAll(" ", "%20")}` : ""}&lang=fr&facet=type&facet=thematique&facet=date_debut&facet=commune${communeRef.current.value ? `&refine.commune=${communeRef.current.value.replaceAll(" ", "%20")}` : ""}${typeRef.current.value ? `&refine.type=${typeRef.current.value.replaceAll(" ", "%20")}` : ""}${dateRef.current.value ? `&refine.start_date=${dateRef.current.value}` : ""}`

        fetch(link)
            .then((rep) => rep.json())
            .then(rep => {
                console.log(rep)
            })

    }

    return (
        <div>
            <input onChange={handleChange} ref={searchRef} type="text" placeholder="Rechercher ..."></input>
            <select onChange={handleChange} ref={communeRef}>
                <option value="">Commune</option>
                {communes?.map((elm) => <option key={elm.name} title={elm.name}>{elm.name.length > 20 ? `${elm.name.slice(0, 20)}...` : elm.name}</option>)}
            </select>
            <select onChange={handleChange} ref={typeRef}>
                <option value="">Type d'évènement</option>
                {types?.map((elm) => <option key={elm.name} title={elm.name} value={elm.name}>{elm.name.length > 20 ? `${elm.name.slice(0, 20)}...` : elm.name}</option>)}
            </select>
            <input onChange={handleChange} ref={dateRef} type="date"></input>
        </div>
    )
}

export default Search_bar