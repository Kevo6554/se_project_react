import { CurrentUserContext } from "../../context/CreateUserContext";
import "./ItemCard.css";
import { useContext } from "react";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.like?.some((id) => id === currentUser?._id);
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    handleCardLike({ id: item._id, isLiked });
  };

  const itemCardLikeClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;
  return (
    <li className="card">
      <div className="card__content">
        <h2 className="card__name">{item.name}</h2>
        {currentUser?._id && (
          <button
            className={itemCardLikeClassName}
            type="button"
            onClick={handleLike}
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
