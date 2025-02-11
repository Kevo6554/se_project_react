import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constant";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick }) {
  return (
    <div className="clothes__section">
      <p className="clothes__section-item">Your items</p>
      <button className="clothes__section-btn">+ Add New</button>
      <ul className="card__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;
