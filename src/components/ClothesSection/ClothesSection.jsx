import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constant";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../context/CreateUserContext";
import { useContext } from "react";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userCards = clothingItems.filter(
    (card) => card.owner === currentUser?._id
  );
  return (
    <div className="clothes__section">
      <div className="clothes__section-title">
        <p className="clothes__section-item">Your items</p>
        <button
          type="button"
          onClick={handleAddClick}
          className="clothes__section-btn"
        >
          + Add New
        </button>
      </div>
      <ul className="card__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              handleCardLike={handleCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;
