import React, {useState} from 'react'
import {useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom";

import "./register.css"

import Logo from '../../assets/img/logo-region-occitanie.png'


function Register() {

  const {register, handleSubmit, formState} = useForm();
  const {isSubmitting, errors} = formState;
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState('');

  const onSubmit = formData => {

    if(formData.password !== formData.confirmPassword) {
      setSignupError("Les mots de passe ne sont pas identique");
    } else {
      let option = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://192.168.1.2:8080/register'
        },
        method: "POST",
        body: JSON.stringify(formData),
      }

      fetch(`http://localhost:8080/api/user/register`, option)
      .then((response) => response.json())
      .then((response) => {
        const data = response;
        if(data.success) {
          navigate("/login");
        } else {
          setSignupError(data.message);
        }
      })
      .catch((error) => {
        setSignupError(error);
      });
    }
  }

  return (
    <div className="container">
      <div className="wrapper__form">
          <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="logo">
              <img className='logo_img' src={Logo} alt="logo" />
            </div>
            <div className="alert__group">
              <span className={signupError.length === 0 ? '' : 'alert__span'}>{signupError}</span>
            </div>
            <div className='title__group'>
              <h1>Nouveau ici </h1>
              <h2 className="">L'inscription est facile. Cela ne prend que quelques minutes.</h2>
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
            <div className="form__group">
              <input type="password"
                className="form__imput"
                placeholder="Confirmer le mot de passe"
                {...register('confirmPassword', { required: 'Veuillez confirmer votre mot de passe.'})}/>
            </div>
            {
              errors.confirmPassword &&
                <div className="error__group">
                  <span className="error__span">{errors.confirmPassword.message}</span>
              </div>
            }
            <div className="button__group">
              <button
                  disabled={isSubmitting}
                  className="submit__button">
                S'inscrire
              </button>
            </div>
            <div className="">
                <div className="login__group">
                  Vous avez déjà un compte ? <a href="/login" className="login__link">Se connecter</a>
                </div>
            </div>
          </form>
      </div>
  </div>
  )
}
export default  Register