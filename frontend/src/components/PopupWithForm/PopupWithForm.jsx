// import Form from "../Form/Form";
// import Popup from "../Popup/Popup";
import React from "react";

export default function PopupWithForm ({
  name,
  title,
  titleButton,
  children,
  isOpen,
  onClose,
  onSubmit,
  isSend,
  isValid=true
}) {
  return (

    // <Popup name={name} isOpen={isOpen} onClose={onClose}>
    //   <Form 
    //   name={name} onSubmit={onSubmit} titleButton={titleButton} isSend={isSend} isVlid={isValid} children={children}>
    //   <h2 className={`popup__title ${name === 'delete-popup' ? 'popup__title_delete': ''}`}>{title}</h2>
    //   </Form>
    //   </Popup>

    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className='popup__container' onClick={(evt => evt.stopPropagation())}>
        <button
          className='popup__close-button button'
          type='button'
          id='close-profile'
          aria-label='Закрыть'
          onClick={onClose}
        />
        <form className='popup__form' name={name} onSubmit={onSubmit}>
          <h2 className={`popup__title ${name === 'delete-popup' ? 'popup__title_delete': ''}`}>{title}</h2>
          {children}
          <button
            className={`button popup__submit-button ${isSend ? 'popup__submit-button_loading' : '' } ${isValid ? '' : 'popup__submit-button_disabled'}`}
            type='submit'
            aria-label='Сохранить'
            disabled={isSend}

          >
            {isSend ? '' : titleButton || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
    
  )
}
