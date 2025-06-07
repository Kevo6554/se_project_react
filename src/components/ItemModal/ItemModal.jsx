import "./ItemModal.css";
import { CurrentUserContext } from "../../context/CreateUserContext";
import { useContext } from "react";
import useModalClose from "../../utils/UseFormAndValidation";

function ItemModal({ isOpen, onClose, card, onDeleteClick }) {
  useModalClose(isOpen, onClose);

  const currentUser = useContext(CurrentUserContext);
  console.log(isOpen);
  const isOwn = card.owner === currentUser?._id;

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div
        className="modal__content modal__content_type_image
"
      >
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        {isOwn && (
          <button
            className="modal__delete"
            type="button"
            onClick={onDeleteClick}
          >
            Delete Item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
