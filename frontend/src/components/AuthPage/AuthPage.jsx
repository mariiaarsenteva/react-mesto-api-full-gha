import { Link } from "react-router-dom";
import Form from "../Form/Form";
import React from "react";

export default function AuthPage({ name, children, isValid, onSubmit }) {

  return(
    <section className="login">
      <h2 className="login__title">{name === 'signup' ? 'Регистрация' : 'Вход'}</h2>
      <Form
        name={name}
        titleButton={name === 'signup' ? 'Зарегистрироваться' : 'Войти'}
        children={children}
        isValid={isValid}
        onSubmit={onSubmit}
      />
      {name === 'signup' && <p className="login__subtitle">Уже зарегистрированы? <Link to={'/sign-in'} className='login__subtitle-link'>Войти</Link></p>}
    </section>
  )
}