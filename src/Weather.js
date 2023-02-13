import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Weather() {
  let [city, setCity] = useState([
    { id: 1, name: "Lisbon" },
    { id: 2, name: "Paris" },
    { id: 3, name: "Sydney" },
    { id: 4, name: "San Francisco" },
  ]);
  let [weather, setWeather] = useState({});

  function getCurrentCityWeather(cityName) {
    let apiKey = "a78075e9e54bb7f4634858f9d04d965c";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemperature);
  }
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

  function showTemperature(response) {
    setWeather({
      name: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
      currentDay: response.data.dt,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    getCurrentCityWeather(event.target.innerText);
  }

  function getCityName(event) {
    setCity(event.target.value);
  }

  useEffect(() => {
    let apiKey = "a78075e9e54bb7f4634858f9d04d965c";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemperature);
  }, []);

  let form = (
    <form className="form-css" id="search-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-9">
          <input
            type="search"
            id="name"
            className="form-control shadow-sm search-input"
            placeholder="Type a city..."
            autoFocus="on"
            onChange={getCityName}
          />
        </div>
        <div className="col-3">
          <input
            type="submit"
            className="form-control btn btn-primary shadow-sm w-100"
            value="Search"
            id="search"
          />
        </div>
      </div>
    </form>
  );

  return (
    <div className="container">
      <div className="weather">
        {city.map((c, index) => (
          <span className="city" key={index}>
            <a href="#" onClick={handleSubmit} id={c.id}>
              {c.name}
            </a>
          </span>
        ))}
        <div className="row">
          <div className="col">{form}</div>
        </div>
        <div className="row">
          <div className="col wt-desc text-start mt-5">
            <div className="row">
              <div className="col city-name" id="city-name">
                {weather.name}
              </div>
            </div>
            <div className="row">
              <div className="col details" id="current-day">
                {formatDay(weather.currentDay)}
              </div>
            </div>
            <div className="row">
              <div className="col details" id="weather-description">
                {weather.description}
              </div>
            </div>
          </div>
        </div>
        <div className="row weather-info">
          <div className="col-1">
            <img src={weather.icon} alt={weather.description} />
          </div>
          <div className="col-7 text-start">
            <span className="degree-num" id="weather-degree"></span>
            <span className="text-start degree-sign">
              <a id="celsius">{Math.round(weather.temperature)}°C</a>|
              <a id="fahrenheit">°F</a>
            </span>
          </div>
          <div className="col-3 wt-desc text-start">
            <div className="row">
              <div className="col details">
                Humidity:
                <span className="temp-relations">
                  <span id="humidity">{weather.humidity}</span>%
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col details">
                Wind:
                <span className="temp-relations">
                  <span id="weather-wind">{weather.wind}</span> km/h
                </span>
              </div>
            </div>
          </div>
        </div>

        <div id="forecast" className="mt-5"></div>
        <div className="footer">
          <a
            href="https://github.com/mozhijano/Weather-react"
            target="_blank"
            rel="noreferrer"
          >
            Open-source code
          </a>
          by Mozhgan Janoosepah
        </div>
      </div>
    </div>
  );
}

export default Weather;
