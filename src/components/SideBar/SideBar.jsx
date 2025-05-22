import "./SideBar.css";
import avatar from "../../images/avatar.png";
import { useContext, useReducer } from "react";
import { CurrentUserContext } from "../../context/CreateUserContext";

function Sidebar({ handleEditClick, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          className="sidebar__button"
          type="button"
          onClick={handleEditClick}
        >
          Change Profile Data
        </button>
        <button
          className="sidebar__button"
          type="button"
          onClick={handleSignOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
