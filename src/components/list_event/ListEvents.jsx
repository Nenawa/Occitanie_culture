import React, { useState, useEffect } from 'react'
import './ListEvents.css'
import EventSelected from "../event_selected/EventSelected";


export default function ListEvents() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const [item, setItem] = useState(null);
  const [viewState, setViewState] = useState(true);
  const [start, setStart] = useState(0);

  let URL = `https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=agenda-des-manifestations-culturelles-so-toulouse&q=&rows=10&start=${start}&timezone=europe%2FBerlin`;



  function getUrl() {
    fetch(URL)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.records);

          console.log(result.records);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      )
  }

  function increment(start) {
    setStart(start + 10);
    getUrl();
  }

  function decrement(start) {
    (start === 10) ? setStart(start) : setStart(start - 10);
    getUrl();
  }

  function handleClick(evnt) {
    setItem(evnt);
    setViewState(false);
  }

  function handleSlide(state) {
    setViewState(!viewState);
    setItem(null);
  }

  useEffect(() => {
    getUrl();
  }, [])

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div className='listEvents'>


        <ul className={viewState ? 'listEvents__ul' : 'listEvents__ul--reduced'}>

          {items?.map(item => (
            <li key={item.recordid} onClick={() => handleClick(item)} className='listEvents__li'>
              <div className='listEvents__li--entete'>
                <div>
                  <p>{(item.fields.nom_de_la_manifestation)}</p>
                </div>
                <div>
                  <p>à partir du {new Date(item.fields.date_debut).toLocaleDateString()}</p>
                  <p>à {item.fields.commune}</p>
                </div>
              </div>
              <p className={viewState ? 'listEvents__ul--p' : 'listEvents__ul--display'}>{(item.fields.descriptif_court)} (...)</p>
            </li>
          ))}
          <div>
          </div>

          <div className='listEvents__button'>
            <button type='button' onClick={() => decrement(start)}> précédents </button>
            <button type='button' onClick={() => increment(start)}> suivants </button>
          </div>
        </ul>

        <button className={viewState ? 'listEvents__ul--button' : 'ListEvents__slide--button'} onClick={() => handleSlide(viewState)} type='button'> ... </button>

        <div >
          {item ? <EventSelected item={item} /> : null}
        </div>

      </div>
    );
  }
}


