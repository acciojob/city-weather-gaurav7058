import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {
  const API_KEY = "80691db5308031732158344d66e5d46d";
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");

  // useEffect(()=>{
    
  //   handleGenerate();
  // },[])
  const handleGenerate = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(json => {
          console.log(json);
          setData(json);
        })
        .catch(error => console.log(error));
  };
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search"
      />
      <button onClick={handleGenerate}>Generate</button>
      <div className="weather">
        {data && data.main && (
          <div>
            <h3>{data.name}</h3>
            <p>Temperature: {data.main.temp}°C</p>
            <p>Weather: {data.weather[0].description}</p>
          </div>
        )}
      </div>
      {/* Do not remove the main div */}
    </div>
  );
};

export default App;
