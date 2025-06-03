import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function AddItemModal({ onClose, isOpen, addItems }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  // const handleNameChange = (e) => {setNAme(e.target.value)}
  // const handleImageChange = (e) => {setImage(e.target.value)}
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };
  const handleImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItems({ name, imageUrl, weather });

    setName("");
    setImageUrl("");
    setWeather("");
  };
  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          //handleNAmeChange
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image
        <input
          type="text"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className=" modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className=" modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />
          <span>Cold</span>
        </label>
      </fieldset>
      <button type="submit" className="modal__submit">
        Add garment
      </button>
    </ModalWithForm>
  );
}
