import "./WeatherCard.css";

import { defaultWeatherOptions, weatherConditions } from "../../utils/constant";

function WeatherCard({ weatherData }) {
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
        <p className="weather__temp">{weatherData.temp.F}&deg; F</p>
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
