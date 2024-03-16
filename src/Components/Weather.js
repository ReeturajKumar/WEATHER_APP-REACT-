import React, { useState } from 'react'
import '../Styles/Weather.css'
import { BsSearch } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { LuWind } from "react-icons/lu";
import { WiHumidity } from "react-icons/wi";
import Time from './Time';

const Weather = () => {
  const [city, setcity] = useState('')
  const [weather, setwather] = useState()
  const [error, seterror] = useState()
  const API_KEY = "ab674f30a5797714688595ca13270383";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;


  function handleOnchange(event) {
    setcity(event.target.value);
    // console.log(event.target.value)
  }


  async function fetchData() {
    try {
      let responce = await fetch(URL);
      let output = await responce.json();
      if(responce.ok){
        setwather(output);
        console.log(output)
        seterror('');
      }else{
        seterror("No Data Found, Please check your city name")
      }
    } catch (error) {
      
    }
  }
  return (
    <div className='container'>
      <div className='city'>
        <input type='text' value={city} onChange={handleOnchange} placeholder='Enter any City Name' />
        <button onClick={()=> fetchData()} >
        <BsSearch />
        </button>
      </div>
      {error && <p className='error-message'>{error}</p>}
      {weather && weather.weather && 
      <div className='content'>
        <div className='image'>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <h3 className='desc'>{weather.weather[0].description}</h3>
        </div>
        <div className='temp'>
        <h2 className='desc'>{weather.main.temp}<span>&deg;C</span></h2>
        </div>
        <div className='weather_city'>
          <div className='location'>
            <FaLocationDot />
          </div>
          <p>{weather.name} <span><Time/></span></p>
        </div>
        <div className='weather_state'>
          <div className='wind'>
            <div className='div_icon'>
              <LuWind />
            </div>
            <h3 className='wind-speed'>{weather.wind.speed} <span>km/h</span></h3>
            <h2 className='wind-heading'>Wind Speed</h2>
          </div>
          <div className='weather_humadity'>
            <div className='humadity'>
              <div className='humadity_icon'>
                <WiHumidity />
              </div>
              <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
              <h2 className='Humidity-heading'>Humidity</h2>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default Weather