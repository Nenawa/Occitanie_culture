import React, { useState, useRef, useContext } from "react";
import "./SearchBar.css";
import EventContext from "../../context/EventContext";

function SearchBar() {
  const divMoreFilterRef = useRef(null);
  const searchRef = useRef(null);
  const communeRef = useRef(null);
  const typeRef = useRef(null);
  const dateRef = useRef(null);

  // const [data, setData] = useState(null);s
  const [filterVisible, setFilterVisible] = useState(false);

  const { facets, setSearch, setCommune, setType, setDate } =
    useContext(EventContext);

  const handleChange = () => {
    setSearch(searchRef.current.value);
    setCommune(communeRef.current.value);
    setType(typeRef.current.value);
    setDate(dateRef.current.value);
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

  if (facets && facets.error === undefined) {
    types = facets.filter((elm) => elm.name === "theme_de_la_manifestation")[0]
      ?.facets;
    communes = facets.filter((item) => item.name === "commune")[0]?.facets;
    date = facets.filter((item) => item.name === "date_debut")[0]?.facets;
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
