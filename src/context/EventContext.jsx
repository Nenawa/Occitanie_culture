import { createContext, useEffect, useState } from "react";

const EventContext = createContext(null);

let firstFetch = false;
export function EventContextProvider(props) {
  const [items, setItems] = useState(null);
  const [start, setStart] = useState(0);

  const [search, setSearch] = useState(null);
  const [commune, setCommune] = useState(null);
  const [type, setType] = useState(null);
  const [date, setDate] = useState(null);
  const [facets, setFacets] = useState(null);

  function increment() {
    setStart(start + 10);
  }

  function decrement() {
    if (start > 0) {
      setStart(start - 10);
    }
  }

  const fetchApi = () => {
    const URL = `https://data.toulouse-metropole.fr/api/records/1.0/search/?start=${start}&dataset=agenda-des-manifestations-culturelles-so-toulouse${
      search ? `&q=${search}` : ""
    }&rows=10&facet=date_debut&facet=date_fin&facet=categorie_de_la_manifestation&facet=theme_de_la_manifestation&facet=commune${
      commune ? `&refine.commune=${commune.replaceAll(" ", "%20")}` : ""
    }${
      type
        ? `&refine.theme_de_la_manifestation=${type.replaceAll(" ", "%20")}`
        : ""
    }${date ? `&refine.start_date=${date}` : ""}`;
    fetch(URL)
      .then((res) => res.json())
      .then((result) => {
        setItems(result.records);
        if (!firstFetch) {
          firstFetch = true;
          setFacets(result.facet_groups);
        }
      });
  };

  useEffect(() => {
    fetchApi();
  }, [start]);

  useEffect(() => {
    setStart(0);
    fetchApi();
  }, [search, commune, type, date]);

  return (
    <EventContext.Provider
      value={{
        items,
        facets,
        increment,
        decrement,
        setSearch,
        setCommune,
        setType,
        setDate,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
}

export default EventContext;
