import useFormValidation from "../../utils/useFormValidation/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React from "react";


export default function AddPlacePopup({isOpen, onClose, onAddPlace, isSend}){


    const {values, errors, isValid, isInputValid, reset, handleChange } = useFormValidation()

    function resetClose(){
        onClose()
        reset()
    }
    
    function handleSubmit(evt){
      evt.preventDefault()
      onAddPlace({title: values.title, link: values.link}, reset )
  }

    return(
        <PopupWithForm
          name="card-popup"
          title="Новое место"
          titleButton="Создать"
          isOpen={isOpen}
          isSend={isSend}
          onClose={resetClose}
          isValid={isValid}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="title"
            placeholder="Название"
            name="title"
            className={`popup__input popup__input_title ${isInputValid.title === undefined || isInputValid.title ? '' : 'popup__input_invalid'}`}
            minLength={2}
            maxLength={30}
            required
            value={values.title ? values.title: ''}
            disabled={isSend}
            onChange={handleChange}
          />
          <span className="popup__error popup__error_title">{errors.title}</span> 
          <input
            type="url"
            id="link"
            placeholder="Ссылка на картинку"
            name="link"
            className={`popup__input popup__input_link ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_invalid'}`}
            required
            value={values.link ? values.link: ''}
            disabled={isSend}
            onChange={handleChange}
          />
          <span className="popup__error popup__error_link">{errors.link}</span>
        </PopupWithForm>

    )
}