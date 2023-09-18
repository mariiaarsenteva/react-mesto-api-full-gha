import { useRef } from "react"
import useFormValidation from "../../utils/useFormValidation/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import React from "react";


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSend }) {
  const input = useRef()
  const { values, errors, isValid, isInputValid, reset, handleChange } = useFormValidation()

  function resetClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({ avatar: input.current.value }, reset)
  }

  return (
    <PopupWithForm
      name="avatar-popup"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={resetClose}
      onSubmit={handleSubmit}
      isSend={isSend}
      isValid={isValid}
    >
      <input
        type="url"
        id="avatar"
        placeholder="Ссылка на картинку"
        name="avatar"
        className={`popup__input popup__input_avatar ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_invalid'}`}
        required
        ref={input}
        value={values.avatar ? values.avatar : ''}
        disabled={isSend}
        onChange={handleChange}
      />
      <span className="popup__error popup__error_avatar">{errors.avatar}</span>
    </PopupWithForm>
  )
}