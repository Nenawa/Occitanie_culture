import React, { useState, useEffect } from 'react'
import './ListEvents.css'
import EvenementSelected from "../event_selected/EvenementSelected";


const URL = 'https://data.laregion.fr/api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie&q=&timezone=Europe%2FBerlin';






export default function ListEvents() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const [item, setItem] = useState(null);

  function handleClick(evnt) {
   
    setItem(evnt);
  }

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(
        (result) => {
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
      <>
        <ul className='listEvents__ul'>
          {items?.map(item => (
            <li key={item.recordid} onClick={() => handleClick(item)} style={{ cursor: 'pointer' }} className='listEvents__li'>
              <div className='listEvents__li--entete'>
                <div>
                  <p>{(item.fields.titre).replace('&#8217;', "'")}</p>
                </div>
                <p>{item.fields.date}</p>
                <p>{item.fields.commune}</p>

              </div>
              <p>{(item.fields.description).replace('&nbsp;', ' ')}</p>
            </li>
          ))}
          {/* <button onClick={'affiche 10 résultats de plus'}> + </button> */}
        </ul>
        {item ? <EvenementSelected  item={item} /> : null}
        
      </>
    );
  }
}


