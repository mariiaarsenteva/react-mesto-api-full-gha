import { memo, useContext } from "react";
import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Loader from "../Loader/Loader.jsx";

import React from "react";

 const Main = memo(({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDelete,
  cards,
  isLoading,
  onCardLike
}) => {
  
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      
      <section className="profile">
        <div className="profile__container">
          <button
            className="profile__avatar-button button"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar ? currentUser.avatar : "#"}
              alt="Аватар пользователя"
            />
          </button>
          <div className="profile__info">
            <div className="profile__personal-info">
              <h1 className="profile__name">
                {currentUser.name ? currentUser.name : ""}{" "}
              </h1>
              <button
                className="profile__edit-button button"
                type="button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__job">
              {currentUser.about ? currentUser.about : ""}
            </p>
          </div>
        </div>
        <button
          className="profile__add-button button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__container">
          {isLoading ? (
            <Loader />
          ) : (
            cards.map((data) => {
              return (
                <li className="elements__card-container" key={data._id}>
                  <Card
                    card={data}
                    onCardClick={onCardClick}
                    onDelete={onDelete}
                    onCardLike={onCardLike}
                  />
                </li>
              );
            })
          )}
        </ul>
      </section>
      
  
    </main>
  )})

  export default Main;