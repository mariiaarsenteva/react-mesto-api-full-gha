import { useContext } from "react";
import useFormValidation from "../../utils/useFormValidation/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useEffect } from "react";
import React from "react";


export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isSend}){
    const currentUser = useContext(CurrentUserContext);
    const {values, errors, isValid, isInputValid, reset, setValue, handleChange } = useFormValidation()

useEffect(()=>{
    setValue('name', currentUser.name)
    setValue('job', currentUser.about)
},[currentUser,isOpen])


function resetClose(){
    onClose()
    reset({name: currentUser.name, job: currentUser.about})
}


function handleSubmit(evt){
    evt.preventDefault()
    onUpdateUser({name: values.name, job: values.job}, reset )
}


return (
    <PopupWithForm
          name="profile-popup"
          title="Редактировать профиль"
          isOpen={isOpen}
          onClose={resetClose}
          isValid={isValid}
          onSubmit={handleSubmit}
          isSend={isSend}
          
        
        >
          <input
            type="text"
            id="name"
            placeholder="Имя"
            name="name"
            className= {`popup__input popup__input_name ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__input_invalid'}`}
            minLength={2}
            maxLength={40}
            required
            value={values.name ? values.name: ''}
            disabled={isSend}
            onChange={handleChange}
          />
          <span className="popup__error popup__error_name">{errors.name}</span>
          <input
            type="text"
            id="job"
            placeholder="Описание"
            name="job" 
            className= {`popup__input popup__input_job ${isInputValid.job === undefined || isInputValid.job ? '' : 'popup__input_invalid'}`}
            minLength={2}
            maxLength={200}
            required
            value={values.job ? values.job: ''}
            disabled={isSend}
            onChange={handleChange}
          />
          <span className="popup__error popup__error_job">{errors.job}</span>
        </PopupWithForm>
)
}