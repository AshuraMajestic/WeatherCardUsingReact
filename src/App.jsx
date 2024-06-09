import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState(""); // State to store the input value
  const [weatherData, setWeatherData] = useState({
    location: "",
    country: "",
    tempval: "",
    tempmin: "",
    tempmax: "",
    tempStatus: ""
  });

  const getCurrentDay = () => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentTime = new Date();
    const day = weekdays[currentTime.getDay()];
    return day;
  };

  const getCurrentTime = () => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const now = new Date();
    const month = months[now.getMonth()];
    const date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let period = "AM";
    if (hours > 11) {
      period = "PM";
      if (hours > 12) {
        hours -= 12;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
    }
    return `${month} ${date} | ${hours}:${minutes} ${period}`;
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be0b5b0806ddd33a0b3769489b72ce31&units=metric`);
      const data = await response.json();
      setWeatherData({
        location: data.name,
        country: data.sys.country,
        tempval: data.main.temp,
        tempmin: data.main.temp_min,
        tempmax: data.main.temp_max,
        tempStatus: data.weather[0].main
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <>
      <div className='full'>
        <form className="temp_form" onSubmit={handleSearch}> {/* Attach handleSearch to form onSubmit event */}
          <input type="text" id="CityName" placeholder="Enter your City Name" value={city} onChange={(e) => setCity(e.target.value)} /> {/* Capture input value and update state */}
          <input type="submit" value="search" id="submitBtn" />
        </form>
      </div>
      <div className='full'>
        <div className="box">
          <div className="wave -one"></div>
          <div className="wave -two"></div>
          <div className="wave -three"></div>

          <div id="weathercon">
            {weatherData.tempStatus === "Clear" && (
              <i className="fas fa-sun" style={{ color: "#eccc68" }}></i>
            )}
            {weatherData.tempStatus === "Clouds" && (
              <i className="fas fa-cloud" style={{ color: "#f1f2f6" }}></i>
            )}
            {weatherData.tempStatus === "Rain" && (
              <i className="fas fa-rain" style={{ color: "#a4b0be" }}></i>
            )}
            {(weatherData.tempStatus !== "Clear" && weatherData.tempStatus !== "Clouds" && weatherData.tempStatus !== "Rain") && (
              <i className="fas fa-cloud" style={{ color: "#f1f2f6" }}></i>
            )}
          </div>
          <div className="info">
            <h2 className="location">
              <i className="fa fa-street-view"></i>
              {weatherData.location ? `${weatherData.location}, ${weatherData.country}` : "Location Unknown"}
            </h2>
            <p id="date">{getCurrentDay()} | {getCurrentTime()}</p>
            <h1 className="temp">{weatherData.tempval ? `${weatherData.tempval}°C` : "Temperature Unknown"}</h1>
            <h3 className="tempMinMax">
              MIN {weatherData.tempmin ? `${weatherData.tempmin}°C` : "Unknown"} | MAX {weatherData.tempmax ? `${weatherData.tempmax}°C` : "Unknown"}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
