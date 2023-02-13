import React, { useState } from "react";

function Forecast(props) {
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let hours = date.getHours();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[day] + " " + hours + ":00";
  }
  
  let forecast = props.list;

  return (
    <div class="row">
      {forecast.map(function (forecastDay, index) {
        if (index < 6) {
          return (
            <div class="col-2 weather-forecast">
              <div class="weather-forecast-day">
                {formatDay(forecastDay.dt)}
              </div>
              <div class="weather-forecast-img">
                <img
                  src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                  alt=""
                />
              </div>
              <div class="weather-forecast-temp">
                <span class="forecast-max">
                  {Math.round(forecastDay.main.temp_max)}°
                </span>
                <span class="forecast-min">
                  {" "}
                  {Math.round(forecastDay.main.temp_min)}°
                </span>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Forecast();
