import React, {useState} from 'react'
import {useForm} from "react-hook-form"

function Login() {

    const {register, handleSubmit, formState} = useForm();
    const {isSubmitting, errors} = formState;
    const [errorLogin, setErrorLogin] = useState('');

    const onSubmit = async formData => {
        Api.publicRequest()
            .post("/login", formData)
            .then((response) =>  {
                props.history.push(`/`);
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
            <div className="d-flex flex-row justify-content-center align-items-center">
              <span className={errorLogin.length === 0 ? '' : 'alert'}>{errorLogin}</span>
            </div>
            <h4>Bienvenue</h4>
            <h6 className="font-weight-light">Connectez vous pour continuer.</h6>
            <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                    type="text"
                    placeholder="Identifiant"
                    size="lg"
                    className="form-control"
                    {...register('username', { required: 'Veuillez saisir une identifant valide.'})} />
              </div>
              {
                errors.username &&
                  <div className="mb-3">
                    <span className="alert">{errors.username.message}</span>
                  </div>
              }
              <div className="form-group">
                <input
                    type="password"
                    placeholder="Mot de passe"
                    size="lg"
                    className="form-control"
                    {...register('password', { required: 'Veuillez saisir votre mot de passe.' })} />
              </div>
              {
                errors.password &&
                  <div className="mb-3">
                    <FontAwesome name="info-circle"/>
                    <span className="alert">{errors.password.message}</span>
                  </div>
              }
              <div className="">
                <button
                    disabled={isSubmitting}
                    className="btn">
                  Se connecter
                </button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Login;
