import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";

function SearchBar() {
  const divMoreFilterRef = useRef(null);
  const searchRef = useRef(null);
  const communeRef = useRef(null);
  const typeRef = useRef(null);
  const dateRef = useRef(null);

  const [data, setData] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    fetch(
      "https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=agenda-des-manifestations-culturelles-so-toulouse&q=test&rows=0&facet=date_debut&facet=date_fin&facet=categorie_de_la_manifestation&facet=theme_de_la_manifestation&facet=commune"
    )
      .then((rep) => rep.json())
      .then((rep) => {
        if (rep) setData(rep.facet_groups);
      });
  }, []);

  const handleChange = () => {
    const link = `https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=agenda-des-manifestations-culturelles-so-toulouse${
      searchRef.current.value ? `&q=${searchRef.current.value}` : ""
    }&rows=10&facet=date_debut&facet=date_fin&facet=categorie_de_la_manifestation&facet=theme_de_la_manifestation&facet=commune${
      communeRef.current.value
        ? `&refine.commune=${communeRef.current.value.replaceAll(" ", "%20")}`
        : ""
    }${
      typeRef.current.value
        ? `&refine.theme_de_la_manifestation=${typeRef.current.value.replaceAll(
            " ",
            "%20"
          )}`
        : ""
    }${
      dateRef.current.value ? `&refine.start_date=${dateRef.current.value}` : ""
    }`;
    fetch(link)
      .then((rep) => rep.json())
      .then((rep) => {
        console.log(rep);
      });
  };

  function handleClickShowFilter() {
    if (!filterVisible) {
      setFilterVisible(true);
    } else {
      setFilterVisible(false);
    }
  }

  let types;
  let communes;
  let date;

  if (data && data.error === undefined) {
    types = data.filter((elm) => elm.name === "theme_de_la_manifestation")[0]
      .facets;
    communes = data.filter((item) => item.name === "commune")[0].facets;
    date = data.filter((item) => item.name === "date_debut")[0].facets;
  }

  return (
    <>
      <div className="searchBar">
        <div>
          <input
            onChange={handleChange}
            className="searchBar__input"
            ref={searchRef}
            type="text"
            placeholder="Rechercher ..."
          />
        </div>
        <div
          ref={divMoreFilterRef}
          className={!filterVisible ? `searchBar__inputHide` : `showButton`}
        >
          <select
            className="searchBar__input searchBar__select"
            onChange={handleChange}
            ref={communeRef}
          >
            <option value="">Commune</option>
            {communes?.map((elm) => (
              <option key={elm.name} title={elm.name}>
                {elm.name.length > 20
                  ? `${elm.name.slice(0, 20)}...`
                  : elm.name}
              </option>
            ))}
          </select>
          <select
            className="searchBar__select searchBar__input"
            onChange={handleChange}
            ref={typeRef}
          >
            <option value="">Théme</option>
            {types?.map((elm) => (
              <option key={elm.name} title={elm.name} value={elm.name}>
                {elm.name.length > 20
                  ? `${elm.name.slice(0, 20)}...`
                  : elm.name}
              </option>
            ))}
          </select>
          <select
            className="searchBar__select searchBar__input"
            onChange={handleChange}
            ref={dateRef}
          >
            <option value="">Date</option>
            {date?.map((elm) => (
              <option key={elm.name} title={elm.name} value={elm.name}>
                {elm.name.length > 20
                  ? `${elm.name.slice(0, 20)}...`
                  : elm.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="button"
        onClick={handleClickShowFilter}
        className="searchBar__input searchBar__ShowFilterButton"
      >
        {!filterVisible ? "+" : "-"}
      </button>
    </>
  );
}

export default SearchBar;
