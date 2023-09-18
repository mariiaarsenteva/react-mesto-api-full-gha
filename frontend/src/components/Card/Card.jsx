import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import { useContext } from "react"
import LikeButton from "../LikeButton/LikeButton.jsx";
import React from "react";


export default function Card({ card, onCardClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner === currentUser._id;

  return (
    
      <div> {isOwn &&
        <button
          className='elements__delete-button button'
          type='button'
          aria-label='Удалить'
          onClick={()=> onDelete(card._id)} />
      }
        <img
          className='elements__photo'
          src={card.link}
          alt={card.name}
          onClick={() => onCardClick({ link: card.link, name: card.name })}
        />
        <div className='elements__info'>
          <h2 className='elements__title'>{card.name}</h2>
          <div className='elements__like-container'>
            <LikeButton likes={card.likes} myid={currentUser._id} cardid={card._id} />
          </div>
        </div>
      </div>
    
  )
}
