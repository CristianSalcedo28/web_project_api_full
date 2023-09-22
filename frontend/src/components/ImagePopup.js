import React, { useEffect } from "react";

function ImagePopup({selectedCard, isOpen, onClose}) {

    return (
        <div className={`popup popup_image ${isOpen ? "popup__show" : " "}`}>
            <div className="popup__content">
                <button type="button" className="close-button" id="close-button-image" onClick={() => onClose()}></button>
                <img 
                     src={selectedCard?.link}
                     alt=""
                     className="popup__image" />
                <p className="popup__text">{selectedCard?.name}</p>
            </div>
        </div>
      );
    }

export default ImagePopup;
    