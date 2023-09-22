import successImage from "../images/success.svg";
import failedImage from "../images/failed.svg";

function InfoTooltipPopup(props) {
  return (
    <div
      className={`popup popup_type_infotooltip ${
        props.isOpen && "popup__show"
      }`}
    >
      <div className={`popup__container`}>
        {props.status === "success" ? (
          <div className="infotooltip">
            <img src={successImage} alt="Success icon"></img>
          </div>
        ) : (
          <div className="infotooltip">
            <img src={failedImage} alt="Failed icon"></img>
          </div>
        )}
        <button
          className="close-button-tooltipe"
          type="button"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltipPopup;
