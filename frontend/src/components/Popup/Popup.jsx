import React from "react";
export default function Popup ({ name, children, isOpen, onClose }) {
    return (
      
      <div className={`popup ${name}-popup ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
        <div className={`${name==='image' ? 'popup__image-container' : 'popup__container'}
        ${name==='successful' || 'error' ? 'popup__container_registration-login' : ''}`}
        onClick={(evt => evt.stopPropagation())}>
          <button
            className='popup__close-button button'
            type='button'
            aria-label='Закрыть'
            onClick={onClose}
          />
          {children}
        </div>
      </div>
    )
  }