import React, {useContext, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import AuthContext from '../../context/AuthContext';



import "./login.css"

import Logo from '../../assets/img/logo-region-occitanie.png'

function Login(props) {
  const auth = useContext(AuthContext)

  const {register, handleSubmit, formState} = useForm();
  const {isSubmitting, errors} = formState;

  const onSubmit = formData => {
    auth.login( formData );
  }

  return (
    <div className="container">
        <div className="wrapper__form">
            <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
              <div className="logo">
                <img className='logo_img' src={Logo} alt="logo" />
              </div>
              <div className="alert__group">
                <span className={auth.errorLogin.length === 0 ? '' : 'alert__span'}>{auth.errorLogin}</span>
              </div>
              <div className="title__group">
                <h1>Bienvenue</h1>
                <h2>Connectez vous pour continuer.</h2>
              </div>
              <div className="form__group">
                <input
                    type="text"
                    placeholder="Identifiant"
                    size="lg"
                    className="form__imput"
                    {...register('username', { required: 'Veuillez saisir une identifant valide.'})} />
              </div>
              {
                errors.username &&
                  <div className="error__group">
                    <span className="error__span">{errors.username.message}</span>
                  </div>
              }
              <div className="form__group">
                <input
                    type="password"
                    placeholder="Mot de passe"
                    size="lg"
                    className="form__imput"
                    {...register('password', { required: 'Veuillez saisir votre mot de passe.' })} />
              </div>
              {
                errors.password &&
                  <div className="error__group">
                    <span className="error__span">{errors.password.message}</span>
                  </div>
              }
              <div className="button__group">
                <button
                    className="submit__button">
                  Se connecter
                </button>
              </div>
              <div className="">
                <div className='reset__group'>
                  <a href="/resetPassword" className="reset__link">Mot de passe oublié?</a>
                </div>
                  <div className="register__group">
                     Vous n'avez pas de compte ? <a href="/register" className="register__link">S'inscrire</a>
                  </div>
              </div>
            </form>
        </div>
    </div>
  )
}
export default Login;