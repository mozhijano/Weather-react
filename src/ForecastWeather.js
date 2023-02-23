import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ForecastWeather.css";
import ForecastWeatherPreview from "./ForecastWeatherPreview";

export default function ForecastWeather(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);
  let lon = props.forecast.lon;
  let lat = props.forecast.lat;

  useEffect(() => {
    setLoaded(false);
  }, [props.forecast]);

  function handleResponse(response) {
    setForecast(response.data.list);
    setLoaded(true);
  }

  if (loaded) {
    return (
      <div className="ForecastWeather">
        <div className="row">
          {forecast.map(function (day, index) {
            if (index < 7) {
              return (
                <div className="col" key={index}>
                  <ForecastWeatherPreview data={day} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    let apiKey = "a78075e9e54bb7f4634858f9d04d965c";
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(url).then(handleResponse);
    return null;
  }
}
