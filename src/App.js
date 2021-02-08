import React, {useState, useEffect} from 'react';
import "./css/weather-icons.min.css";
import dateBuilder from './components/date'
import api from './components/apiLink'
import useGeolocation from './components/geolocation';
//
//    HACE FALTA USAR "useEffect"  PARA USAR LAS COORDENADAS AL INICIO
//
function App() {
    const [query,
        setQuery] = useState('');
    const [weather,
        setWeather] = useState({});
    const [changeunits, setChangeUnits] = useState(true)
    const handleChangeUnits = () => {
        setChangeUnits(!changeunits)
    };
    const location = useGeolocation();
    const search = evn => {
        if (evn.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                });
        }
    }
    
    return (
        <div
            className="App"
            className={(typeof weather.main != "undefined")
            ? ((weather.weather[0].main === "Clouds")
                ? 'App clouds'
                : (weather.weather[0].main === "Rain")
                    ? 'App rain'
                    : (weather.weather[0].main === "Snow")
                    ? 'App snow'
                    : (weather.weather[0].main === "Clear")
                    ? 'App clear'
                    : (weather.weather[0].main === "Mist")
                    ? 'App mist'
                    : 'App')
            : 'App'}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}/>
                </div>
                {(typeof weather.main != "undefined")
                    ? (
                        <div>
                            <div className="location-box">
                                <div className="location">{weather.name},{weather.sys.country}</div>
                                <div className="date">{dateBuilder(new Date())}</div>
                            </div>
                            <div className="weather-box">
                                <div className="temp">
                                    {changeunits ? Math.round(weather.main.temp) * 9/5 +32 + '°F' : Math.round(weather.main.temp) + '°C' }
                                </div>
                                <div className="btn-degree">
                                <button onClick={handleChangeUnits}>Celsius / Fahrenheit</button>
                                </div>
                                <div className="weather">
                                    {weather.weather[0].main}
                                </div>
                                <div className="weather">
                                    {< i className = {
                                        `wi wi-owm-${weather.weather[0].id}`
                                    } />}
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <div>
                            <div className="location-box">
                                <div className="location">City not found</div>
                                <div className="date">{dateBuilder(new Date())}</div>
                            </div>
                            <div className="weather-box">
                                <div className="temp">
                                    ??°
                                </div>
                                <div className="weather">
                                    Try another city please
                                </div>
                            </div>
                        </div>
                    )}
            </main>
        </div>
    );
}

export default App;
