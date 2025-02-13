import "./DeleteModal.css";

function DeleteModal({
  card,
  onClose,
  handleDeleteCard,
  onDeleteClick,
  isOpen,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div
        className="modal__content modal__content_type_image
"
      >
        <button
          onClick={onClose}
          type="button"
          className="delete__modal"
        ></button>
        <div className="delete__modal-footer">
          <h2 className="delete__modal-caption">
            Are you sure you want to delete this item? This action is
            irreversible.
            {card}
            <button
              onClick={onDeleteClick}
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
          </h2>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
