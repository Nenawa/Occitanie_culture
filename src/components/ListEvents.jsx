import React, { useState, useEffect } from 'react'


const URL = 'https://data.laregion.fr/api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie&q=&lang=fr&start=0&facet=date_debut&facet=commune&facet=description&facet=date_fin&facet=titre&facet=code_insee';


export default function ListEvents() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.records);
          setIsLoaded(true);
          setItems(result.records);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      )
  }, [])

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <ul>
        {items?.map(item => (
          <li key={item.fields.recordid}>
            <p>{(item.fields.titre).replace('&#8217;', "'")}</p>
            <p>{(item.fields.description).replace('&nbsp;', ' ')}</p>
            <p>{item.fields.commune}</p>
            <p>{item.fields.date}</p>
          </li>
        ))}
      </ul>
    );
  }
}


