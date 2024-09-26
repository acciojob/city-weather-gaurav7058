import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const API_KEY = "80691db5308031732158344d66e5d46d";
  const [data, setData] = useState(null);  // Allow null to handle initial state better
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);  // To handle errors

  const handleGenerate = () => {
    if (search) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(json => {
          if (json.cod !== 200) {
            setError(json.message);
            setData(null);  // Clear previous data if error occurs
          } else {
            setData(json);
            setError(null);  // Clear any previous error
          }
          setSearch("");  // Clear the input
        })
        .catch(error => {
          console.log(error);
          setError("Failed to fetch weather data.");
        });
    }
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
        placeholder="Enter city name"
      />
      <button onClick={handleGenerate}>Generate</button>

      <div>
        {error && <p className="error">{error}</p>} {/* Display errors */}
        {data && data.main && (
          <div className="weather">
            <h3>{data.name}</h3>
            <p>Temperature: {(data.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Weather: {data.weather[0].description}</p>
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Weather Icon" />
          </div>
        )}
      </div>

      {/* Do not remove the main div */}
    </div>
  );
};

export default App;
