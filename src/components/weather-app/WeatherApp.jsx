import React, { useState } from "react";
import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherWindy,
} from "react-icons/ti";
import {
  PiSunBold,
  PiMoonStarsDuotone,
  PiCloudMoonFill,
  PiCloudSunFill,
  PiSnowflakeLight,
} from "react-icons/pi";
import { BsClouds } from "react-icons/bs";
import {
  WiHumidity,
  WiDayRain,
  WiNightAltRain,
  WiDayThunderstorm,
  WiNightAltThunderstorm,
} from "react-icons/wi";
import { IoSearch } from "react-icons/io5";
import { TbLineDashed, TbMist } from "react-icons/tb";
import "./weather-app.css";

export default function WeatherApp() {
  let apiKey = "704c0e619072fa7424edc98fbc36275f";

  const weatherIcon = {
    _01d: <PiSunBold className="weather-icon" />,
    _01n: <PiMoonStarsDuotone className="weather-icon" />,
    _02d: <PiCloudSunFill className="weather-icon" />,
    _02n: <PiCloudMoonFill className="weather-icon" />,
    _03d: <TiWeatherCloudy className="weather-icon" />,
    _03n: <TiWeatherCloudy className="weather-icon" />,
    _04d: <BsClouds className="weather-icon" />,
    _04n: <BsClouds className="weather-icon" />,
    _09d: <TiWeatherDownpour className="weather-icon" />,
    _09n: <TiWeatherDownpour className="weather-icon" />,
    _10d: <WiDayRain className="weather-icon" />,
    _10n: <WiNightAltRain className="weather-icon" />,
    _11d: <WiDayThunderstorm className="weather-icon" />,
    _11n: <WiNightAltThunderstorm className="weather-icon" />,
    _13d: <PiSnowflakeLight className="weather-icon" />,
    _13n: <PiSnowflakeLight className="weather-icon" />,
    _50d: <TbMist className="weather-icon" />,
    _50n: <TbMist className="weather-icon" />,
  };

  const blankData = {
    desc: "--",
    temp: "--",
    location: "--",
    humidity: "--",
    wind: "--",
    icon: <TbLineDashed className="weather-icon" />,
  };

  const [data, setData] = useState(blankData);
  const [searchText, setSearchText] = useState(null);

  function handleSearchChange(event) {
    setSearchText(event.target.value);
  }

  async function fetchData() {
    try {
      setData((prevData) => (prevData = blankData));
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=Metric&appid=${apiKey}`
      );
      const result = await response.json();

      if (result && result.weather.length > 0) {
        setData({
          desc: result.weather[0].description,
          temp: result.main.temp.toString().split(".")[0],
          location: result.name,
          humidity: result.main.humidity,
          wind: result.wind.speed,
          icon: weatherIcon["_" + result.weather[0].icon],
        });
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      fetchData();
    }
  }

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="search..."
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <div className="search-icon" onClick={fetchData}>
          <IoSearch />
        </div>
      </div>
      <div className="weather-desc">{data.desc}</div>
      {/* <TiWeatherWindyCloudy className="weather-icon" /> */}
      {data.icon}
      <div className="temp">{data.temp}°C</div>
      <div className="location">{data.location}</div>
      <div className="data-container">
        <div className="element">
          <WiHumidity className="bottom-icons" />
          <div className="data">
            <div className="humidity-percent">{data.humidity}%</div>
            <div className="txt">Humidity</div>
          </div>
        </div>
        <div className="element">
          <TiWeatherWindy className="bottom-icons" />
          <div className="data">
            <div className="humidity-percent">{data.wind} kmph</div>
            <div className="txt">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
