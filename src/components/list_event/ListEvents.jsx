import React, { useState, useEffect } from 'react'
import './ListEvents.css'
import EventSelected from "../event_selected/EventSelected";


// const URL = 'https://data.laregion.fr/api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie&q=&timezone=Europe%2FBerlin';



export default function ListEvents() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const [item, setItem] = useState(null);
  const [state, setState] = useState(true);
  const [rows, setRows] = useState(10);
  
  let URL = `https://data.laregion.fr/api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie&q=&rows=${rows}&start=10&sort=date_debut&timezone=europe%2FBerlin`

  function increment(rows, URL){
    setRows(rows + 10);
    URL = `https://data.laregion.fr/api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie&q=&rows=${rows}&start=10&sort=date_debut&timezone=europe%2FBerlin`
  }
  function decrement(rows){
   (rows === 10) ? setRows(rows) : setRows(rows - 10);
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
          console.log(result.records);
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
           {/* afficher les 10 evenements suivants qui s'incrémente de 10 en 10*/}
           <div className='listEvents__button'>
          <button type='button' onClick={() => increment(rows)}> suivants </button>
          <button type='button' onClick={() => decrement(rows)}> précédents </button>
         { console.log(rows)}
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


