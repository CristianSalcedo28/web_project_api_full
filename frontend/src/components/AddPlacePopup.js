import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');
  
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(placeName, placeLink);
  }

  function onChangeName(evt) {
    setPlaceName(evt.target.value)
  }

  function onChangeLink(evt) {
    setPlaceLink(evt.target.value)
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="New Place"
      submitText="Create"
      onSubmit={handleSubmit}
    >
         <input 
            type="text"
            name="title"
            className="popup__item popup__item_title"
            id="title"
            placeholder="Title"
            required
            minLength="2"
            maxLength="30"
            onChange={onChangeName}
          />
          <span className="title-error popup__item-error "></span>
          <input
            type="url"
            name="link"
            className="popup__item popup__item_link"
            id="image"
            placeholder="Url"
            required
            onChange={onChangeLink}
          />
          <span className="image-error popup__item-error "></span>
        </PopupWithForm> 
  );
}

export default AddPlacePopup;        