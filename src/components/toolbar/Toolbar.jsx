import React, { useState } from 'react'

import "./toolbar.css"

import Logo from "../../assets/img/logo-region-occitanie.png"
function Toolbar() {

  const [login, setLogin] = useState(false);

  function toggleLogin() {
    if(!login) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

  return (
    <div className='wrapper__toolbar'>
        <div>
            <img className='logo__img' src={Logo} alt='Logo'></img>
        </div>
        <div className='btn__groupr'>
          {!login ? 
            <button onClick={toggleLogin} className='login__button'>Connexion</button> :
            <button onClick={toggleLogin} className='logout__button'>Deconnexion</button>
          }
        </div>
    </div>
  )
}
export default Toolbar