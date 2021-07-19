console.log(`If this is logged, then app.js is linked correctly.`);

M.AutoInit();

let defaultCityName = `Chicago`;

const getWeatherInfo = () => {
  console.log(`getWeatherInfo FIRED`);
  const APIKey = `23b24ea95d3f9c9ddcf2eea23ed648c8`
  let cityName = document.querySelector(`#city-input`).value;
  let getLatLongCoordFetchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;
  fetchWeatherData(getLatLongCoordFetchUrl, APIKey)

  
  console.log(getLatLongCoordFetchUrl)
}

document.querySelector(`#search`).addEventListener('click', getWeatherInfo)



const decodeUnixTimeStamp = (unixStamp) => {
  console.log(`decodeUnixTimeStamp FIRED`);
  let unixToJSTimeStamp = unixStamp * 1000;    
  let formattedJSTime = moment(unixToJSTimeStamp).format(`MMMM Do YYYY`);
  return formattedJSTime;
};

// let convertKelvinToFahrenheit = (k) => {
  //   console.log(`convertKelvinToFahrenheit FIRED`);
  //   // (0K − 273.15) × 9/5 + 32 = -459.7°F
  //   let kelvin = k * 100;
  //   let fahrenheitTimes100 = (kelvin - 27315) * 9/5 + 3200;
  //   let fahrenheit = fahrenheitTimes100 / 100;
  //   console.log(fahrenheit);
  //   return fahrenheit.toFixed(2);
  // };
  
  const convertDegreesToCardinalDirections = (deg) => {
    console.log(`convertDegreesToCardinalDirections FIRED`);
    if(deg < 11){
      return 'S';
    } else if (deg < 34) {
      return 'SSW';
    } else if (deg < 56) {
      return 'SW';
    } else if (deg < 79) {
      return 'WSW';
    } else if (deg < 101) {
      return 'W';
    } else if (deg < 124) {
      return 'WNW';
    } else if (deg < 146) {
      return 'NW';
    } else if (deg < 169) {
      return 'NNW';
    } else if (deg < 191) {
      return 'N';
    } else if (deg < 214) {
      return 'NNE';
    } else if (deg < 236) {
      return 'NE';
    } else if (deg < 259) {
      return 'ENE';
    } else if (deg < 281) {
      return 'E';
    } else if (deg < 304) {
      return 'ESE';
    } else if (deg < 326) {
      return 'SE';
    } else if (deg < 349) {
      return 'SSE';
    } else if (deg >= 349) {
      return 'S'
    }
  }
  
  
  
  const rotateArrow = (deg) => {
    console.log(`rotateArrow  FIRED`)
    console.log(deg)
    let arrow = document.querySelector('#arrow');
    console.log(arrow)
    arrow.style.transform = `rotate(${deg}deg)`
  }
  
  const updateWeatherIcon = (imgEl, iconTag) => {
    console.log(imgEl);
    console.log(iconTag);
    imgEl.setAttribute(`src`, `http://openweathermap.org/img/wn/${iconTag}@2x.png`)
  }
  
  const capitalizeEachWord = (sentence) => {
    console.log(`%ccapitalizeEachWord FIRED`, 'color:red')
    let capitalizedSentence = sentence.split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return capitalizedSentence;
  }
  
  const generateWindSpeedString = (windDirection, windSpeed, windGust) => {
    console.log(`generateWindSpeedString FIRED`);
    if (windGust === undefined) {
      return `${windSpeed} mph ${windDirection}`;
    } else {
      return `${windSpeed} mph ${windDirection} gusting to ${windGust} mph`;
    }
  }

  const UVIndexColorizer = (UVIndex) => {
    console.log(`UVIndexColorizer FIRED`);
    console.log(`UVIndex is ${UVIndex}`);
    let UVIndexEl = document.querySelector(`#city-uv-index`);
    if (UVIndex === 0) {
        UVIndexEl.style.backgroundColor = `purple`;
        UVIndexEl.style.color = `lightblue`;
        document.querySelector(`#city-uv-index`).textContent = `N/A`;
      return;
    } else if (UVIndex < 3) {
        UVIndexEl.style.backgroundColor = `limegreen`;
        UVIndexEl.style.color = `black`;
        document.querySelector(`#city-uv-index`).textContent = UVIndex;
      return;
    } else if (UVIndex < 6) {
        UVIndexEl.style.backgroundColor = `yellow`;
        UVIndexEl.style.color = `black`;
        document.querySelector(`#city-uv-index`).textContent = UVIndex;
      return;
    }  else if (UVIndex < 8) {
        UVIndexEl.style.backgroundColor = `orange`;
        UVIndexEl.style.color = `black`;
        document.querySelector(`#city-uv-index`).textContent = UVIndex;
      return;
    } else if (UVIndex < 11) {
        UVIndexEl.style.backgroundColor = `red`;
        UVIndexEl.style.color = `black`;
        document.querySelector(`#city-uv-index`).textContent = UVIndex;
      return;
    } else {
      UVIndexEl.style.backgroundColor = `#6B49C8`;
      UVIndexEl.style.color = `black`;
      document.querySelector(`#city-uv-index`).textContent = UVIndex;
    }
  }

  UVIndexColorizer(0)
  
  
  const renderUpdatedWeatherValues = (json) => {
      console.log(`renderUpdatedWeatherValues FIRED`);
      console.log(json);
    let currentWeatherIconEl = document.querySelector(`#current-weather-icon`);
    let currentWeatherIconTag = json.current.weather[0].icon;
    let currentWeatherDescription = capitalizeEachWord(json.current.weather[0].description);
      console.log(json.current.weather[0].icon);
    updateWeatherIcon(currentWeatherIconEl, currentWeatherIconTag);
    let currentDateTime = decodeUnixTimeStamp(json.current.dt);
    let currentTempF = json.current.temp;
    let windDegrees = json.current.wind_deg;
    let windDirection = convertDegreesToCardinalDirections(windDegrees);
    let windSpeed = json.current.wind_speed;
    let windGust = json.current.wind_gust;
    let humidity = json.current.humidity;
    let UVIndex = json.current.uvi;
      UVIndexColorizer(UVIndex);
      document.querySelector(`#description`).textContent = currentWeatherDescription;
      document.querySelector(`#date`).textContent = ` ${currentDateTime} `;
      document.querySelector(`#city-temp`).textContent = `${currentTempF} `;
      rotateArrow(windDegrees);
      document.querySelector(`#city-wind`).textContent = generateWindSpeedString(windDirection, windSpeed, windGust);
      document.querySelector(`#city-humidity`).textContent = humidity;
  }



  
  const updateDayForecast = (dayIndexNumber, dayInfoObject) => {
    console.log(`updateDayForecast FIRED`);
  
    let forecastWeatherIconEl = document.querySelector(`#F${dayIndexNumber}-weather-icon`);
    let forecastWeatherDescriptionEl = document.querySelector(`#F${dayIndexNumber}-description`);
    let forecastDateEl = document.querySelector(`#F${dayIndexNumber}-date`);
    let forecastHiTempEl =  document.querySelector(`#F${dayIndexNumber}-temp-hi`)
    let forecastLoTempEl =  document.querySelector(`#F${dayIndexNumber}-temp-lo`)
    let forecastWindEl =  document.querySelector(`#F${dayIndexNumber}-wind`)
    let forecastHumidityEl =  document.querySelector(`#F${dayIndexNumber}-humidity`)

    let forecastWeatherIconTag = dayInfoObject.weather[0].icon;
    let forecastWeatherDescription = dayInfoObject.weather[0].description;
    let forecastWindCardinalDirection = convertDegreesToCardinalDirections(dayInfoObject.wind_deg)
    
  

    forecastDateEl.textContent = decodeUnixTimeStamp(dayInfoObject.dt);
    updateWeatherIcon(forecastWeatherIconEl, forecastWeatherIconTag);
    forecastWeatherDescriptionEl.textContent = capitalizeEachWord(forecastWeatherDescription);
    forecastHiTempEl.textContent = dayInfoObject.temp.max;
    forecastLoTempEl.textContent = dayInfoObject.temp.min;

    forecastWindEl.textContent = generateWindSpeedString(forecastWindCardinalDirection, dayInfoObject.wind_speed, dayInfoObject.wind_gust)

    forecastHumidityEl.textContent = dayInfoObject.humidity;




  }
  
  const update5DayForecast = (daily) => {
    console.log(`update5DayForecast FIRED`)
    console.log(daily)
    const fiveDayForecastElements = document.getElementsByClassName(`forecast`);
    console.log(fiveDayForecastElements);
     for (let i = fiveDayForecastElements.length; i > 0; i--){
       console.log(fiveDayForecastElements[i]);
       updateDayForecast(i, daily[i])
     }
  }

  const fetchWeatherData = (getLatLongCoordFetchUrl, APIKey) => {
    console.log(`fetchWeatherData FIRED`);
    fetch(getLatLongCoordFetchUrl)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      console.log(`The city returned from API is ${json.name}`)
      if (json.name === undefined) {
        throw `ERROR: 404 (Not Found) The city could not be found as entered.`
      }
      document.querySelector(`#city-name`).textContent = `${json.name}, `;
      console.log(`LATITUDE OF ${json.name} IS ${json.coord.lat}`)
      console.log(`LONGITUDE OF ${json.name} IS ${json.coord.lon}`)
      console.log(json.coord)
      return json.coord;
    })
    .then(coord => {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=imperial&exclude=minutely,hourly&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
          console.log(json);
            renderUpdatedWeatherValues(json);
            rotateArrow(json.current.wind_deg);
            update5DayForecast(json.daily)
      }) 
    })
    .catch(err => {
      console.error(err);
      document.querySelector(`#invalid-city-trigger`).click();
      document.querySelector(`#city-input`).color = `red`;
    }) 
  }
