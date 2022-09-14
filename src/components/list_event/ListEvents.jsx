import React, { useState, useEffect } from 'react'
import './ListEvents.css'
import EventSelected from "../event_selected/EventSelected";


export default function ListEvents() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const [item, setItem] = useState(null);
  const [state, setState] = useState(true);
  const [start, setStart] = useState(0);

  let URL = `https://data.laregion.fr//api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie&q=&rows=10&start=${start}&timezone=europe%2FBerlin`;

  function increment(start) {
    setStart(start + 10);

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
  }
  function decrement(start) {
    (start === 10) ? setStart(start) : setStart(start - 10);
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
  }

  function handleClick(evnt) {
    setItem(evnt);
    setState(false);
  }

  function handleSlide(state) {
    setState(!state);
    setItem(null);
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
      <div className='listEvents'>


        <ul className={state ? 'listEvents__ul' : 'listEvents__ul--reduced'}>

          {items?.map(item => (
            <li key={item.recordid} onClick={() => handleClick(item)} className='listEvents__li'>
              <div className='listEvents__li--entete'>
                <div>
                  <p>{(item.fields.titre).replace('&#8217;', "'")}</p>
                </div>
                <p>{item.fields.date}</p>
                <p>{item.fields.commune}</p>

              </div>
              <p className={state ? 'listEvents__ul--p' : 'listEvents__ul--display'}>{(item.fields.description).replace('&nbsp;', ' ')}</p>
            </li>
          ))}
          <div>
          </div>

          <div className='listEvents__button'>
            <button type='button' onClick={() => increment(start)}> suivants </button>
            <button type='button' onClick={() => decrement(start)}> précédents </button>
          </div>
        </ul>

        <button className={state ? 'listEvents__ul--button' : 'ListEvents__slide--button'} onClick={() => handleSlide(state)} type='button'> ... </button>

        <div >
          {item ? <EventSelected item={item} /> : null}
        </div>

      </div>
    );
  }
}


