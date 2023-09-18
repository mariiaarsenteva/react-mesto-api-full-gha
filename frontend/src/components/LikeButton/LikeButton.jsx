import { useState, useEffect } from "react"
import api from "../../utils/api"
import React from "react";

export default function LikeButton({likes, cardid, myid} ){
 const [isLike, setIsLike] = useState(false)
 const [count, setCount] = useState(likes.length)

 useEffect(()=>{
    setIsLike(likes.some(item => myid === item))
 }, [likes, myid])

 function handleCardLike(){

    
    if (isLike){
        api.removeLike(cardid)
        .then(res=>{
            setIsLike(false)
            setCount(res.likes.length)
        })
        .catch((error => console.error(`Ошибка редактирования ${error}`)))
    } else {
        api.addLike(cardid)
        .then(res => {
            setIsLike(true)
            setCount(res.likes.length)
        })
        .catch((error => console.error(`Ошибка редактирования ${error}`)))
    }
 }
    return(
        <>
        <button
            className={`button elements__like-button ${isLike ? 'elements__like-button_active' : '' }`}
            aria-label='Нравится'
            onClick = {handleCardLike}
          ></button>
          <p className='elements__like-counter'>{count}</p>
        </>
    )
}