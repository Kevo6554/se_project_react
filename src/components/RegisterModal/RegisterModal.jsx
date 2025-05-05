import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { useEffect, useState } from "react";
function RegisterModal({
  handleRegistration,
  isOpen,
  onClose,
  isLoading,
  handleLogIn,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const hanleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({ email, password, name, avatar });
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatar("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Registering" : "Next"}
      altButtonText="or Log in"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formValid={isValid}
      onClose={onClose}
    >
      <label className="modal__label" htmlFor="email-register">
        Email *
      </label>
      <input
        className="modal__input"
        id="email-register"
        name="email"
        type="email"
        value={values.email || ""}
        onChange={handleChange}
        required
      />
      <label className="modal__label" htmlFor="password-register">
        Password *
      </label>
      <input
        className="modal__input"
        id="password-register"
        name="password"
        type="password"
        value={values.password || ""}
        onChange={handleChange}
        required
      />
      <label className="modal__label" htmlFor="name-register">
        Name *
      </label>
      <input
        className="modal__input"
        id="name-register"
        name="name"
        type="text"
        value={values.name || ""}
        onChange={handleChange}
        required
      />

      <label className="modal__label" htmlFor="avatar-register">
        Avatar URL
      </label>
      <input
        className="modal__input"
        id="avatar-register"
        name="avatar"
        type="text"
        value={values.avatar || ""}
        onChange={handleChange}
      />
      <div className="modal__button-container">
        <button type="button" className="modal__login" onClick={handleLogIn}>
          Login
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
