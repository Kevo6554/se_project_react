import "./WeatherCard.css";

import { weatherConditions } from "../../utils/constant";

function WeatherCard(weatherData) {
  const filteredOptions = weatherConditions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOption = filteredOptions[0];
  console.log(weatherData.isDay, weatherData.condition);
  weatherConditions.forEach((option) => {
    console.log(option.isDay, option.condition);
  });

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
