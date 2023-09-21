import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
// import Main from "./Main/Main.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import { useCallback, useState, useEffect } from "react";
import CurrentUserContext from "../../src/contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SendContext from "../contexts/SendContext.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import ProtectedPage from "./ProtectedPage/ProtectedPage.jsx";
import { authorization, registration, getUserData } from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import DeletePopup from "./DeletePopup/DeletePopup.jsx";
import React from "react";
import Register from './Register/Register.jsx'
import Login from './Login/Login.jsx'

export default function App() {
  const navigate = useNavigate();

  //стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isSending, setIsSending] = useState(false);
  // стейт контекста
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");

  //стейты карточки
  const [cards, setCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [deleteCard, setDeleteCard] = useState("");

  //стейт логина
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCheckToken, setIsCheckToken] = useState(true)

  //Переменная состояния попапов
  const isOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isDeletePopupOpen ||
    isImagePopup ||
    isSuccessful ||
    isError;

  const closePopup = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopup(false);
    setIsDeletePopupOpen(false);
    setIsSuccessful(false);
    setIsError(false);
  }, []);

  useEffect(() => {
    function closePopupByEsc(evt) {
      if (evt.key === "Escape") {
        closePopup();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closePopupByEsc);
      return () => {
        document.removeEventListener("keydown", closePopupByEsc);
      };
    }
  }, [isOpen, closePopup]);

  const handleEditProfileClick = useCallback(() => {
    setIsEditProfilePopupOpen(true);
  }, []);

  const handleAddPlaceClick = useCallback(() => {
    setIsAddPlacePopupOpen(true);
  }, []);

  const handleDeletePopupClick = useCallback((cardId) => {
    setDeleteCard(cardId);
    setIsDeletePopupOpen(true);
  }, []);

  const handleEditAvatarClick = useCallback((card) => {
    setIsEditAvatarPopupOpen(true)
  }, []);

  const handleCardClick = useCallback((cardId) => {
    setSelectedCard(cardId)
    setIsImagePopup(true)
  }, [])

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then((res) => {
          setUserEmail(res.email);
          setLoggedIn(true);
          setIsCheckToken(false)
          navigate("/");
        })
        .catch((err) =>
          console.log(`Ошибка авторизации при повторном входе ${err}`)
        );
    } else {
      setIsCheckToken(false)
      setLoggedIn(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) {
      setIsLoadingCards(true);
      Promise.all([api.getInfo(localStorage.jwt), api.getCards(localStorage.jwt)])
        .then(([userEmail, dataCard]) => {
          setCurrentUser(userEmail);
          setCards(dataCard);
          setIsLoadingCards(false);
        })
        .catch((error) => console.error(`Ошибка редактирования ${error}`));
    }
  }, [loggedIn]);

  const handleSubmit = useCallback(
    (request, textError) => {
      setIsSending(true);
      request()
        .then(closePopup)
        .catch((err) => console.error(`${textError} ${err}`))
        .finally(() => setIsSending(false));
    },
    [closePopup]
  );

  const handleSubmitDeletion = useCallback((evt) => {
    evt.preventDefault()
    function makeRequest() {
      return api.removeCard(deleteCard, localStorage.jwt).then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCard;
          })
        );
      });
    }
    handleSubmit(makeRequest, "Ошибка при удалении карточки");
  }, [cards, deleteCard, handleSubmit]);

  const handleUpdateUser = useCallback(
    (userEmail) => {
      function makeRequest() {
        return api.setUserInfo(userEmail, localStorage.jwt).then((res) => {
          setCurrentUser(res);
        });
      }
      handleSubmit(makeRequest, "Ошибка при редактировании профиля");
    },
    [handleSubmit]
  );

  const handleUpdateAvatar = useCallback(
    (userEmail) => {
      function makeRequest() {
        return api.setNewAvatar(userEmail, localStorage.jwt).then((res) => {
          setCurrentUser(res);
        });
      }
      handleSubmit(makeRequest, "Ошибка при редактировании аватара");
    },
    [handleSubmit]
  );

  const handleAddCard = useCallback(
    (dataCard) => {
      function makeRequest() {
        return api.addCard(dataCard, localStorage.jwt).then((res) => {
          setCards([res, ...cards])//добавление карточки в начало массива
        });
      }
      handleSubmit(makeRequest, "Ошибка при добавлении карточки");
    },
    [cards, handleSubmit]
  );

  const handleLike = useCallback(
    (card) => {
      const isLike = card.likes.some(
        (element) => currentUser._id === element
      );
      if (isLike) {
        api
          .removeLike(card._id)
          .then((res) => {
            setCards((cards) =>
              cards.map((item) => (item._id === card._id ? res : item))
            );
          })
          .catch((error) => console.error(`Ошибка при снятии лайка ${error}`));
      } else {
        api
          .addLike(card._id)
          .then((res) => {
            setCards((cards) =>
              cards.map((item) => (item._id === card._id ? res : item))
            );
          })
          .catch((error) =>
            console.error(`Ошибка при установке лайка ${error}`)
          );
      }
    },
    [currentUser._id]
  );

  // function handleLike(card) {
  //   const isLiked = card.likes.some((user) => user === currentUser._id);
  //   (isLiked ? api.removeLike(card._id) : api.addLike(card._id, true))
  //     .then((newCard) => {
  //       setCards((state) =>
  //         state.map((c) => (c._id === newCard._id ? newCard : c))
  //       )
  //     })
  //     .catch((err) => console.log(err))
  // }

  function handleLogin(password, email) {
    setIsSending(true);
    authorization(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        window.scrollTo(0, 0);
        navigate("/");
      })
      .catch((error) => {
        setIsError(true);
        console.error(`Ошибка при авторизации ${error}`);
      })
      .finally(() => setIsSending(false));
  }

  function handleRegister(password, email) {
    setIsSending(true);
    registration(password, email)
      .then(() => {
        setIsSuccessful(true);
        window.scrollTo(0, 0);
        navigate("/signin");
      })
      .catch((error) => {
        setIsError(true);
        console.error(`Ошибка при регистрации ${error}`);
      })
      .finally(() => setIsSending(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <SendContext.Provider value={isSending}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={ProtectedPage}
                  userEmail={userEmail}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onDelete={handleDeletePopupClick}
                  cards={cards}
                  isLoading={isLoadingCards}
                  onCardLike={handleLike}
                  loggedIn={loggedIn}
                  isCheckToken={isCheckToken}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Header name="signup" />
                  <Register name="signup"  isCheckToken={isCheckToken} handleRegister={handleRegister} />
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <Header name="signin" />
                  <Login  name="signin"  isCheckToken={isCheckToken} handleLogin={handleLogin} />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SendContext.Provider>

        <Footer />

        <SendContext.Provider value={isSending}>
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closePopup}
            isSend={isSending}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closePopup}
            isSend={isSending}
            onAddPlace={handleAddCard}
          />

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closePopup}
            isSend={isSending}
          />

          <DeletePopup
            onClose={closePopup}
            isOpen={isDeletePopupOpen}
            onSubmit={handleSubmitDeletion}
          />
        </SendContext.Provider>

        <PopupWithForm
          name="delete-popup"
          title="Вы уверены?"
          titleButton="Да "
          onClose={closePopup}
          isOpen={isDeletePopupOpen}
          onSubmit={handleSubmitDeletion}
          isSend={isSending}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closePopup}
        />

        <InfoTooltip
          name="successful"
          titleText={"Вы успешно зарегистрировались!"}
          isOpen={isSuccessful}
          onClose={closePopup}
        />

        <InfoTooltip
          name="error"
          titleText={"Что-то пошло не так! Попробуйте ещё раз."}
          isOpen={isError}
          onClose={closePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
