export const initialCards = [
  {
    title: "Жираф",
    link: "https://images.unsplash.com/photo-1678475858196-d6d9dcb3df54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  },
  {
    title: "Котик",
    link: "https://images.unsplash.com/photo-1678827843845-d9d6d5b80f53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    title: "Рыжий кот",
    link: "https://images.unsplash.com/photo-1668174206552-cc53001e480b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  },
  {
    title: "Коровы",
    link: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
  },
  {
    title: "Два слона",
    link: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1477&q=80",
  },
  {
    title: "Гиены",
    link: "https://images.unsplash.com/photo-1499678481508-e9f03108304b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
];

export const profileElement = document.querySelector(".profile");
export const editAvatar = document.querySelector('.profile__avatar');

export const popupEditAvatarButtomElement = profileElement.querySelector('.profile__avatar-button');
export const popupEditButtonElement = profileElement.querySelector(".profile__edit-button");
export const popupAddButtonElement = profileElement.querySelector(".profile__add-button");

export const profilePopupElement = document.querySelector(".profile-popup");
export const cardPopupElement = document.querySelector(".card-popup");
export const editAvatarElement = document.querySelector(".avatar-popup");

export const formEditAvatarElement = editAvatarElement.querySelector('.popup__form')
export const formEditProfileElement = profilePopupElement.querySelector(".popup__form");
export const formAddCardElement = cardPopupElement.querySelector(".popup__form");

export const selectorTemplate = "#cardTemplate";
export const popupProfileSelector = ".profile-popup";
export const popupImageSelector = '.image-popup';
export const popupAvatarSelector = '.avatar-popup';
export const popupAddCardSelector = '.card-popup';
export const popupDeleteSelector = '.delete-popup';
export const cardContainerSelector = '.elements__container';

export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__job';
export const profileAvatarSelector = '.profile__avatar';

export const defaultDeleteText = "Дa";



// переменая с объектом для валидации
export const validationConfig = {
  formSelector: ".popup__form", // все формы в документе
  inputSelector: ".popup__input", // inputList
  errorSelectorTemplate: ".popup__error_", // шаблон для разных инпутов
  submitButtonSelector: ".popup__submit-button", //button

  disabledButtonClass: "popup__submit-button_disabled", // button disabled
  inputErrorClass: "popup__input_invalid", // input
  textErrorClass: "popup__error_visible", // span
};
