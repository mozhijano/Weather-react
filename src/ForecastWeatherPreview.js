import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function ForecastWeatherPreview(props) {
    let icon = `http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`;
  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days[day];
  }

  function maxTemperature() {
    let temperature = Math.round(props.data.main.temp_max);

    return `${temperature}°`;
  }

  function minTemperature() {
    let temperature = Math.round(props.data.main.temp_min);

    return `${temperature}°`;
  }
  return (
    <div>
      <div className="ForecastWeather-detail-day">{day()} </div>
      <div className="ForecastWeather-detail-icon">
        <img src={icon} />
      </div>
      <div>
        <span className="ForecastWeather-detail-maxTemp">
          {maxTemperature()}
        </span>
        <span className="ForecastWeather-detail-minTemp">
          {minTemperature()}
        </span>
      </div>
    </div>
  );
}
