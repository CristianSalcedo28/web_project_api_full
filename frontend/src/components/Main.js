import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ImagePopup from "./ImagePopup";
import Card from "./Card";
import "../index.css";


function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleImagePopup(selectedCard) {
    setSelectedCard(selectedCard)
    if (isImagePopupOpen === false) {
      setIsImagePopupOpen(true)
    }
  }
  function handleClosePopup() {
    setSelectedCard({})
    if (isImagePopupOpen === true) {
      setIsImagePopupOpen(false)
    }
  }

    return (
      <div className="page">
        <main className="content">
          <section className="profile">
            <div className="profile__avatar">
              <img
                alt="Foto del Usuario"
                src={currentUser.avatar}
                className="profile__avatar-btn"
              />
              <div
                className="profile__avatar-edit"
                onClick={props.onEditAvatarClick}
              ></div>
            </div>
            <div className="profile__info">
              <p className="profile__name">{currentUser.name}</p>
              <p className="profile__profession">{currentUser.about}</p>
            </div>
            <button
              type="button"
              className="button-edit"
              onClick={props.onEditProfileClick}
            ></button>
            <button
              type="button"
              className="button-add"
              onClick={props.onAddPlaceClick}
            ></button>
          </section>
          <section className="cards">
            {props.cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  card={card}
                  owner={card.owner}
                  name={card.name}
                  link={card.link}
                  likes={card.likes.length}
                  handleCardClick={handleImagePopup}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                />
              );
            })}
          </section>
          <ImagePopup
            selectedCard={selectedCard}
            onClose={handleClosePopup}
            isOpen={isImagePopupOpen}
          />
        </main>
      </div>
    );
};

export default Main;