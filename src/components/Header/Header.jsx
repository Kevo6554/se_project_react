import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../context/CreateUserContext";

function Header({
  handleAddClick,
  weatherData,
  handleRegistration,
  handleLogin,
  handleSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const isLoggedIn = !!currentUser?._id;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="wtwr" src={logo} />
      </Link>
      <p className="header__date-and-loaction">
        {currentDate}, {weatherData.city}
      </p>
      <button
        className="header__menu-button"
        type="button"
        onClick={toggleMenu}
      ></button>
      <div
        className={`header__mobile-menu ${
          isMenuOpen ? "header__mobile-menu_opened" : ""
        }`}
      >
        <button
          className="header__mobile-menu_close"
          type="button"
          onClick={toggleMenu}
        ></button>
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <button
              onClick={handleSignOut}
              type="button"
              className="header__button-logout"
            >
              Log Out
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">Terrence Tegegne</p>
                <img
                  src={avatar}
                  alt="Terrence Tegegne"
                  className="header__avatar"
                />
              </div>
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleLogin}
              className="header__button-login"
              type="button"
            >
              Log In
            </button>
            <button
              onClick={handleRegistration}
              className="header__button-register"
              type="button"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}
export default Header;
