import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {
  const API_KEY = "80691db5308031732158344d66e5d46d";
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  

  // useEffect(()=>{
    
  //   handleGenerate();
  // },[])
  const handleGenerate = () => {
    if (search) {
     
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(json => {
          console.log(json);
          setData(json);
          setSearch("");  // Clear the input

        })
        .catch(error => {
          console.log(error);
          
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
      />
      <button onClick={handleGenerate}>Generate</button>
      <div >
      {data && data.main && (
          <div className="weather">
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
