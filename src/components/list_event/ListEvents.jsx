import React, { useState, useEffect } from 'react'
import './ListEvents.css'
import EventSelected from "../event_selected/EventSelected";


const URL = 'https://data.laregion.fr/api/records/1.0/search/?dataset=agendas-participatif-des-sorties-en-occitanie&q=&timezone=Europe%2FBerlin';


export default function ListEvents() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const [item, setItem] = useState(null);
  const [state, setState] = useState(true);


  function handleClick(evnt) {
    setItem(evnt);
    setState(false);

    console.log('evnt', evnt);
    console.log('item', item);
  }

  function handleSlide(state){
    
    setState(!state);
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
            <li key={item.recordid} onClick={() => handleClick(item)}  className='listEvents__li'>
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
          <button > + </button>
        </ul>
        
          <button  className={state ?'listEvents__ul--reduced' :'ListEvents__slide'} onClick={() => handleSlide(state)} type='button'> ... </button>
          
        <div >
          {item ? <EventSelected item={item} /> : null}

        </div>
        
      </div>
    );
  }
}


