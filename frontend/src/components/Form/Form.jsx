import { useContext } from "react";
import SendContext from '../../contexts/SendContext.js'
import React from "react";


export default function Form({ name, children, titleButton, isValid, onSubmit }) {

  const isSend = useContext(SendContext)

  return (
    <form name={name} onSubmit={onSubmit}>
      {children}

      {name === 'signin' || name === 'signup' ?
        <button className={`login__submit-button ${isSend ? 'login__submitbutton_loading' : ''} ${isValid ? '' : ''}`}>
          {isSend ? '' : titleButton || 'Сохранить'}
        </button>
        :
        <button className={`popup__submit-button ${isSend ? 'popup__submit-button_loading' : ''} ${isValid ? '' : 'popup__submit-button_disabled'}`}>
          {isSend ? '' : titleButton || 'Сохранить'}
        </button>
      }


    </form>
  )
}
