import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form"

import "./login.css"

function Login() {

  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting, errors } = formState;
  const [errorLogin, setErrorLogin] = useState('');
  const formRef = useRef(null)


  const onSubmit = () => {
    const data = new FormData(formRef.current)

    let option = {
      method: "POST",
      body: data,
    }

    fetch("http://localhost:8080/user/connect", option)
      .then((rep) => rep.json())
      .then((response) => {
        console.log(response)
        if (response.success === false) {
          setErrorLogin("Identifiant ou mot de passe incorrect")
        } else {
          console.log("props", props)
          localStorage.setItem("auth", response.data.token);
          props.history.push("/");
        }
      })
      .catch((error) => {
        setErrorLogin("Votre identifiant ou mot de passe est incorrect. ");
      });
  }

  return (
    <div className="container">
      <div className="wrapper__form">
        <div className="logo">
          <img src="" alt="logo" />
        </div>
        <div className="span__group">
          <span className={errorLogin.length === 0 ? '' : 'alert'}>{errorLogin}</span>
        </div>
        <div className="title__group">
          <h1>Bienvenue</h1>
          <h2>Connectez vous pour continuer.</h2>
        </div>
        <form ref={formRef} className="login__form" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__group">
            <input
              type="text"
              placeholder="Identifiant"
              size="lg"
              name='nameAccount'
              className="form__imput"
              {...register('nameAccount', { required: 'Veuillez saisir une identifant valide.' })} />
            {
              errors.username &&
              <div className="span__group">
                <span className="alert__span">{errors.username.message}</span>
              </div>
            }
          </div>
          <div className="form__group">
            <input
              type="password"
              placeholder="Mot de passe"
              size="lg"
              name='password'
              className="form__imput"
              {...register('password', { required: 'Veuillez saisir votre mot de passe.' })} />
            {
              errors.password &&
              <div className="span__group">
                <span className="alert__span">{errors.password.message}</span>
              </div>
            }
          </div>
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