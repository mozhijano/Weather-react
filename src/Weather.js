import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherTemperature from "./WeatherTempreture";
import "./App.css";

function Weather(props) {
  let [city, setCity] = useState(props.defaultCity);
  // [
  //   { id: 1, name: "Lisbon" },
  //   { id: 2, name: "Paris" },
  //   { id: 3, name: "Sydney" },
  //   { id: 4, name: "San Francisco" },
  // ];
  let [weather, setWeather] = useState({ loaded: false });

  function getCurrentCityWeather() {
    let apiKey = "a78075e9e54bb7f4634858f9d04d965c";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemperature);
  }
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${hours}`;
    }
    return `${days[day]} ${hours}:${minutes}`;
  }

  function showTemperature(response) {
    setWeather({
      loaded: true,
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
    getCurrentCityWeather();
  }

  function getCityName(event) {
    setCity(event.target.value);
  }

  // useEffect(() => {
  //   let apiKey = "a78075e9e54bb7f4634858f9d04d965c";
  //   let url = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${apiKey}&units=metric`;
  //   axios.get(url).then(showTemperature);
  // }, []);

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
  if (weather.loaded) {
    return (
      <div className="container">
        <div className="weather">
          {/* {city.map((c, index) => (
          <span className="city" key={index}>
            <a href="/" onClick={handleSubmit} id={c.id}>
              {c.name}
            </a>
          </span>
        ))} */}
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
          <div className="row weather-info ">
            <div className="col-6 mt-3">
              <div className="d-flex">
                <div>
                  <img src={weather.icon} alt={weather.description} />
                </div>
                <div>
                  <WeatherTemperature celsius={weather.temperature} />
                </div>
              </div>
            </div>
            <div className="col-6 wt-desc text-start">
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
  } else {
    getCurrentCityWeather();
  }
}

export default Weather;
