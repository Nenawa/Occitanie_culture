import React, { useState, useEffect, useRef } from 'react'
import './SearchBar.css'

function SearchBar() {
    const divMoreFilterRef = useRef(null)
    const searchRef = useRef(null)
    const communeRef = useRef(null)
    const typeRef = useRef(null)
    const dateRef = useRef(null)

    //TODO: replace fetch by props
    const [data, setData] = useState(null);
    const [filterVisible, setFilterVisible] = useState(false);
    useEffect(() => {
        fetch("https://data.laregion.fr/api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie&q=&rows=0&facet=type&facet=commune")
            .then((rep) => rep.json())
            .then((rep) => {
                if (rep) setData(rep)
            })
    }, []);

    const handleChange = () => {
        const link = `https://data.laregion.fr/api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie${searchRef.current.value ? `&q=${searchRef.current.value.replaceAll(" ", "%20")}` : ""}&lang=fr&facet=type&facet=thematique&facet=date_debut&facet=commune${communeRef.current.value ? `&refine.commune=${communeRef.current.value.replaceAll(" ", "%20")}` : ""}${typeRef.current.value ? `&refine.type=${typeRef.current.value.replaceAll(" ", "%20")}` : ""}${dateRef.current.value ? `&refine.start_date=${dateRef.current.value}` : ""}`
        fetch(link)
            .then((rep) => rep.json())
            .then(rep => {
                console.log(rep)
            })
    }

    function handleClick__ShowFilter() {
        console.log(divMoreFilterRef.current.className)
        if (divMoreFilterRef.current.className.indexOf("showButton") == -1) {
            setFilterVisible(true)
        } else {
            setFilterVisible(false)
        }
    }

    const types = data?.facet_groups.filter(elm => elm.name === "type")[0].facets
    const communes = data?.facet_groups.filter(elm => elm.name === "commune")[0].facets

    return (
        <div className='searchBar'>
            <div>
                <input onChange={handleChange} className='searchBar__input' ref={searchRef} type="text" placeholder="Rechercher ..."></input>
                <div ref={divMoreFilterRef} className={`searchBar__inputHide ${filterVisible ? "showButton" : ""}`}>
                    <select className='searchBar__input searchBar__select' onChange={handleChange} ref={communeRef}>
                        <option value="">Commune</option>
                        {communes?.map((elm) => <option key={elm.name} title={elm.name}>{elm.name.length > 20 ? `${elm.name.slice(0, 20)}...` : elm.name}</option>)}
                    </select>
                    <select className='searchBar__select searchBar__input' onChange={handleChange} ref={typeRef}>
                        <option value="">Type d'évènement</option>
                        {types?.map((elm) => <option key={elm.name} title={elm.name} value={elm.name}>{elm.name.length > 20 ? `${elm.name.slice(0, 20)}...` : elm.name}</option>)}
                    </select>
                    <input className='searchBar__input' onChange={handleChange} ref={dateRef} type="date"></input>
                </div>
            </div>
            <button onClick={handleClick__ShowFilter} className='searchBar__input searchBar__ShowFilterButton'>{!filterVisible ? "+" : "-"}</button>

        </div>
    )
}

export default SearchBar