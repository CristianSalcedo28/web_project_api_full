import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, name, link, likes, handleCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `button-trash ${isOwn ? "button-trash_visible" : "button-trash_hidden"}`;
  const isLiked = card.likes.some((item) => item._id === currentUser._id);
  const cardLikeButtonClassName = `button-like ${
    isLiked ? "button-like-active" : ""
  }`;

  function handleCardLike() {
    onCardLike(card)
  }

  function handleCardDelete() {
    onCardDelete(card)
  }

  return (
    <div className="template__card">
      <div className="cards__item">
        <img 
          onClick={() => handleCardClick({name, link})}
          src={link}
          alt=""
          className="cards__image"
        />
        <button className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
        <div className="cards__text">
            <h4 className="cards__name">{name}</h4>
            <div className="cards__like">
              <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike}></button>
              <span className="likes__counter">{likes}</span>
            </div>
        </div>
      </div>
    </div>
)
}

export default Card;

