import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(evt){
    setName(evt.target.value)
  }

  function handleChangeDescription(evt){
    setDescription(evt.target.value)
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
      submitText="Save" 
      onSubmit={handleSubmit}
    >
    <input
            type="text"
            id="name"
            name="user"
            className="popup__item popup__item_name"
            value={name || ''} 
            minLength="2"
            maxLength="40"
            required
            onChange={handleChangeName}
          />
          <span className="name-error popup__item-error "></span>
          <input
            type="text"
            id="profession"
            name="profession"
            className="popup__item popup__item_profession"
            value={description || ''}
            minLength="2"
            maxLength="200"
            required
            onChange={handleChangeDescription}
          />
          <span className="profession-error popup__item-error "></span>    
    </PopupWithForm>
  );
}

export default EditProfilePopup;