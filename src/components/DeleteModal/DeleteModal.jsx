import "./DeleteModal.css";

function DeleteModal({ card, onClose, handleDeleteCard, isOpen }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div
        className="delete__container
"
      >
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>

        <h2 className="delete__modal-caption">
          Are you sure you want to delete this item? This action is
          irreversible.
          {card}
        </h2>
        <div className="delete__modal-footer">
          <button
            onClick={() => handleDeleteCard()}
            type="submit"
            className="delete__modal-btn"
          >
            Yes, delete item
          </button>
          <button
            onClick={onClose}
            type="button"
            className="delete__modal-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
