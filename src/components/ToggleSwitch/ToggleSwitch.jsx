import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit";
import "./ToggleSwitch.css";
import { useContext } from "react";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <label className="toggle__switch">
      <input type="checkbox" className="toggle__switch-box" />
      <span className="toggle__switch-slider"></span>
      <span className="toggle__switch-text toggle__switch-text_f">F</span>
      <span className="toggle__switch-text toggle__switch-text_c">C</span>
    </label>
  );
}
