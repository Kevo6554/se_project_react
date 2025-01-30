import "./WeatherCard.css";

import { defaultWeatherOptions, weatherConditions } from "../../utils/constant";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherConditions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }
  return (
    <section className="weather__card">
      {weatherData?.temp?.F && (
        <p className="weather__temp">
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}
          &deg; {currentTemperatureUnit}
        </p>
        //{weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperature}
      )}

      <img
        src={weatherOption?.url}
        alt={`Card Showing ${weatherOption?.day ? "day" : "night"} time ${
          weatherOption?.condition
        } weather`}
        className="weather__card-image"
      />
    </section>
  );
}
export default WeatherCard;
