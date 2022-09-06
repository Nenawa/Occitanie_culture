import React, { useState } from 'react'
import { useForm } from "react-hook-form";

import "./register.css"

function Register() {

  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting, errors } = formState;
  const [signupError, setSignupError] = useState('');
  const formRef = useRef(null)

  const onSubmit = () => {
    const data = new FormData(formRef.current)
    let option = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(formData)
    }

    fetch(`http://localhost:8080/user/register`, option)
      .then((rep) => rep.json())
      .then((response) => {
        props.history.push(`/login`);
      })
      .catch((error) => {
        setSignupError(error.response.data.message);
      });
  }

  return (
    <div className="container">
      <div className="wrapper__form">
        <div className="logo">
          <img src="" alt="logo" />
        </div>
        <div className="span__group">
          <span className={signupError.length === 0 ? '' : 'alert__span'}>{signupError}</span>
        </div>
        <div className='title__group'>
          <h1>Nouveau ici </h1>
          <h2 className="">L'inscription est facile. Cela ne prend que quelques minutes.</h2>
        </div>
        <form ref={formRef} className="register__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__group">
            <input
              type="text"
              placeholder="Identifiant"
              size="lg"
              className="form__imput"
              {...register('username', { required: 'Veuillez saisir une identifant valide.' })} />
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
              className="form__imput"
              {...register('password', { required: 'Veuillez saisir votre mot de passe.' })} />
            {
              errors.password &&
              <div className="span__group">
                <span className="alert__span">{errors.password.message}</span>
              </div>
            }
          </div>
          <div className="form__group">
            <input type="password"
              className="form__imput"
              placeholder="Confirmer le mot de passe"
              {...register('confirmPassword', { required: 'Veuillez confirmer votre mot de passe.' })} />
            {
              errors.confirmPassword &&
              <div className="span__group">
                <span className="alert__span">{errors.confirmPassword.message}</span>
              </div>
            }
          </div>
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
export default Register