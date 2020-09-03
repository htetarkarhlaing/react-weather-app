import React, {useState} from 'react';

const api = {
  key: "23f29ea55d6c026ac8c88aeabc7c7d6d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [ query, setQuery ] = useState('');
  const [ weather, setWeather ] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["Janauary", "February", "March", "April", "May", "June", "July", "August", "Setember", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app' ) : 'app'}>
      <main>
        {/* Start of Search Box */}
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {/* End of Search Box */}

        {(typeof weather.main != "undefined") ? (
          <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
        <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
          </div>
        ) : ('')}
        
      </main>
    </div>
  );
}

export default App;
