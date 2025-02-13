import { useEffect, useState } from "react";
import { coordinates, APIkey } from "../../utils/constant";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { defaultClothingItems } from "../../utils/constant";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { deleteCard, getItems, addItems } from "../../utils/api";
import DeleteModal from "../DeleteModal/DeleteModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleDeleteCard = (selectedCard) => {
    deleteCard(selectedCard._id)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== id));
        selectedCard([]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const openConfirmationModal = () => {
    setActiveModal("confirm");
    selectedCard(card);
    console.log(openConfirmationModal);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    //const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
    return addItems({ name, weather, imageUrl })
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  clothingItems={clothingItems}
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={<Profile onCardClick={handleCardClick} />}
            />
          </Routes>
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
          openConfirmationModal={openConfirmationModal}
        />
        <DeleteModal
          isOpen={activeModal === "confirm"}
          onDeleteClick={handleDeleteCard}
          onClose={closeActiveModal}
        />
        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
