import React, {useState} from 'react'
import {useForm} from "react-hook-form"

import "./login.css"

function Login() {

    const {register, handleSubmit, formState} = useForm();
    const {isSubmitting, errors} = formState;
    const [errorLogin, setErrorLogin] = useState('');

    const onSubmit = async formData => {
        Api.publicRequest()
            .post("/login", formData)
            .then((response) =>  {
                //props.history.push(`/home`);
            })
            .catch((error) => {
              setErrorLogin("Votre identifiant ou mot de passe est incorrect. ");
            });
      }

  return (
    <div className="container">
        <div className="auth-form">
            <div className="logo">
              <img src="" alt="logo" />
            </div>
            <div className="alert">
              <span className={errorLogin.length === 0 ? '' : 'alert'}>{errorLogin}</span>
            </div>
            <h4>Bienvenue</h4>
            <h6 className="f">Connectez vous pour continuer.</h6>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__groupe">
                <input
                    type="text"
                    placeholder="Identifiant"
                    size="lg"
                    className="form__imput"
                    {...register('username', { required: 'Veuillez saisir une identifant valide.'})} />
              </div>
              {
                errors.username &&
                  <div className="mb-3">
                    <span className="alert">{errors.username.message}</span>
                  </div>
              }
              <div className="form__groupe">
                <input
                    type="password"
                    placeholder="Mot de passe"
                    size="lg"
                    className="form__imput"
                    {...register('password', { required: 'Veuillez saisir votre mot de passe.' })} />
              </div>
              {
                errors.password &&
                  <div className="mb-3">
                    <FontAwesome name="info-circle"/>
                    <span className="alert">{errors.password.message}</span>
                  </div>
              }
              <div className="btn__groupe">
                <button
                    disabled={isSubmitting}
                    className="btn">
                  Se connecter
                </button>
              </div>
              <div className="">
                <div className='reset__groupe'>
                  <a href="/resetPassword" className="reset__link">Mot de passe oublié?</a>
                </div>
                  <div className="register__groupe">
                    Vous n'avez pas de compte ? <a href="/register" className="register__link">S'inscrir</a>
                  </div>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Login;
