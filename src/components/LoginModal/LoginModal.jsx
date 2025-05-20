import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({
  handleLogin,
  isOpen,
  onClose,
  isLoading,
  handleRegisterClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Login"
      buttonText={isLoading ? "Logging in..." : "Login"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label className="modal__label" htmlFor="email-login">
        Email
        <input
          className="modal__input"
          id="email-login"
          name="email"
          type="email"
          minLength="4"
          maxLength="64"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="password-login">
        Password
        <input
          className="modal__input"
          id="password-login"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>

      <div className="modal__button-container">
        <button className="modal__submit" type="submit">
          Login
        </button>
        <button
          type="button"
          className="modal__register"
          onClick={handleRegisterClick}
        >
          Or Signup
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
