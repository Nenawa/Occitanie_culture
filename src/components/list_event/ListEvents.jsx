import React, { useState, useContext } from "react";
import "./ListEvents.css";
import EventSelected from "../event_selected/EventSelected";
import EventContext from "../../context/EventContext";

export default function ListEvents() {
  const [itemSelected, setItemSelected] = useState(null);
  const [viewState, setViewState] = useState(true);

  const { items, increment, decrement, start } = useContext(EventContext);

  function handleClick(evnt) {
    setItemSelected(evnt);
    setViewState(false);
  }

  function handleSlide() {
    setViewState(!viewState);
    setItemSelected(null);
  }
  if (!items) {
    return <div>Chargement...</div>;
  }
  if (items) {
    return (
      <div className="listEvents">
        <ul
          className={viewState ? "listEvents__ul" : "listEvents__ul--reduced"}
        >
          {items?.map((item) => (
            <li
              key={item.recordid}
              onClick={() => handleClick(item)}
              className="listEvents__li"
            >
              <div className="listEvents__li--entete">
                <div>
                  <p>{item.fields.nom_de_la_manifestation}</p>
                </div>
                <div>
                  <p>
                    à partir du{" "}
                    {new Date(item.fields.date_debut).toLocaleDateString()}
                  </p>
                  <p>à {item.fields.commune}</p>
                </div>
              </div>
              <p
                className={
                  viewState ? "listEvents__ul--p" : "listEvents__ul--display"
                }
              >
                 {item.fields.descriptif_court.length > 150
                ? `${item.fields.descriptif_court.slice(0, 150)}...`
                : item.fields.descriptif_court} 
              </p>
            </li>
          ))}
          <div />

          <div className="listEvents__button">
            {
              start === 0
            ? null 
            : <button type="button" onClick={() => decrement()}>
              précédents
            </button>
            }
            {
              items.length === 4
                ? <button type="button" onClick={() => increment()}>
                  suivants
                </button>
                : null
            }

          </div>
        </ul>

        <button
          className={
            viewState ? "listEvents__ul--button" : "ListEvents__slide--button"
          }
          onClick={() => handleSlide()}
          type="button"
        >
          ...
        </button>

        <div>{itemSelected ? <EventSelected item={itemSelected} /> : null}</div>
      </div>
    );
  }
}
