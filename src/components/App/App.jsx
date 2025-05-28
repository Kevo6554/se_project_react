import { useEffect, useState } from "react";
import { coordinates, APIkey } from "../../utils/constant";
import "./App.css";
import { api } from "../../utils/api.js";
import Header from "../Header/Header";
import Main from "../Main/Main";

import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";

import DeleteModal from "../DeleteModal/DeleteModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { CurrentUserContext } from "../../context/CreateUserContext";
import { registerUser, logIn, getUserProfile } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

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
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardDelete = () => {
    const cardId = selectedCard._id;
    const token = localStorage.getItem("jwt");
    api
      .deleteCard(cardId, token)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== cardId));
        closeActiveModal();
        setSelectedCard({});
      })
      .catch(console.error);
  };

  const openConfirmationModal = () => {
    setActiveModal("confirm");
  };

  const handleLoginModal = () => setActiveModal("login");

  const handleRegisterModal = () => setActiveModal("signup");

  const handleEditModal = () => setActiveModal("editprofile");

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

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    if (token)
      //const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
      api
        .addItems({ name, weather, imageUrl, token })
        .then((data) => {
          console.log(data);
          setClothingItems([data, ...clothingItems]);
          closeActiveModal();
        })
        .catch(console.error);
  };

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    editProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser((prevUser) => ({ ...prevUser, ...updatedUser }));
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    logIn({ email, password })
      .then((res) => {
        if (!res.token) throw new Error("Token not received");
        localStorage.setItem("jwt", res.token);
        return getUserProfile(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/profile");
        closeActiveModal();
      });
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    setIsLoading(true);
    registerUser({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return getUserProfile(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Registration Error:", err);
        alert(err);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // watch activeModal here

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserProfile(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error(error);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <div className="app__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleRegistration={handleRegisterModal}
              handleLogin={handleLoginModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    clothingItems={clothingItems}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      handleSignOut={handleSignOut}
                      handleEditModal={handleEditModal}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <ItemCard
            item={item}
            onCardClick={handleCardClick}
            handleCardLike={handleCardLike}
          />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            addItems={handleAddItemModalSubmit}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteClick={openConfirmationModal}
          />
          <RegisterModal
            isOpen={activeModal === "signup"}
            handleRegistration={handleRegister}
            isLoading={isLoading}
            onClose={closeActiveModal}
            handleLogin={handleLoginModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            handleLogin={handleLogin}
            isLoading={isLoading}
            onClose={closeActiveModal}
            handleRegisterClick={handleRegisterModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onEditProfile={handleEditProfile}
          />
          <DeleteModal
            isOpen={activeModal === "confirm"}
            handleDeleteCard={handleCardDelete}
            onClose={closeActiveModal}
          />
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
