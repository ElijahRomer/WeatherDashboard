console.log(`If this is logged, then app.js is linked correctly.`);

M.AutoInit();

let homeCity;
let currentCity;

const pageInitialize = () => {
  if (localStorage.getItem(`homeCity`) === null||localStorage.getItem(`homeCity`) === "") {
    updateHomeCity(`chicago`)
  }
  renderPreviousCitySearches();
  let homeCity = retrieveHomeCityFromLocalStorage();
  getWeatherInfo(homeCity);
};

const updateHomeCity = (city) => {
  localStorage.setItem(`homeCity`, city);
  document.querySelector(`#home-city-el`).textContent = city;
  document.querySelector(`#home-city-el`).value = city;
  document.querySelector(`#home-city-el`).addEventListener('click', routeHistoryClickFetch)
};

const retrieveHomeCityFromLocalStorage = () => {
    homeCity = localStorage.getItem(`homeCity`);
    document.querySelector(`#home-city-el`).textContent = homeCity;
    document.querySelector(`#home-city-el`).value = homeCity;
    document.querySelector(`#home-city-el`).addEventListener('click', routeHistoryClickFetch)
  return homeCity;
};

const captureValueAndTriggerAppFunction = () => {
  currentCity = document.querySelector(`#city-input`).value;
  getWeatherInfo(currentCity);
};

const routeHistoryClickFetch = (eventObject) => {
  let city = eventObject.target.value;
  getWeatherInfo(city);
}

const routeHomeClickSet = (eventObject) => {
  let city = eventObject.target.value;
  updateHomeCity(city);
}


document.querySelector(`#search`).addEventListener('click', captureValueAndTriggerAppFunction);

document.addEventListener(`DOMContentLoaded`, pageInitialize);

document.querySelector(`#set-current-as-home`).addEventListener(`click`, routeHomeClickSet)




const getWeatherInfo = (cityName) => {
  document.querySelector(`#set-current-as-home`).value = cityName;
  const APIKey = `23b24ea95d3f9c9ddcf2eea23ed648c8`
  let getLatLongCoordFetchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;
  fetchWeatherData(getLatLongCoordFetchUrl, APIKey)
  .then(message => {
    if (message !== `success`){
      console.log(`message received was NOT "success"`);
      throw message;
    } else {
      persistCityToLocalStorage(cityName);
      renderPreviousCitySearches()
    }})
  .catch((err) => {
    console.log(`getWeatherInfo .catch path triggered with an error of ${err}`)
    document.querySelector(`#invalid-city-trigger`).click()
  })
};



const persistCityToLocalStorage = (cityName) => {
    let previousCitySearchesArray = JSON.parse(localStorage.getItem(`previousCitySearches`));
  if (localStorage.getItem(`previousCitySearches`) === null) {
      localStorage.setItem(`previousCitySearches`, JSON.stringify([cityName]));
      return;
  } else if (previousCitySearchesArray.includes(cityName)){
    return;
  } else {
    if (previousCitySearchesArray.length < 10) {
        previousCitySearchesArray.unshift(cityName);
        localStorage.setItem(`previousCitySearches`, JSON.stringify(previousCitySearchesArray));
    } else {
        previousCitySearchesArray.pop();
        previousCitySearchesArray.unshift(cityName);
        localStorage.setItem(`previousCitySearches`, JSON.stringify(previousCitySearchesArray))
    }
  }
};

const renderPreviousCitySearches = () => {
  let previousCitySearchContainerEl = document.querySelector(`#city-search-history`);
    for (let i = previousCitySearchContainerEl.children.length - 1; i >=0; i--) {
      previousCitySearchContainerEl.children[i].remove()
    };
  let previousCitySearchesArray = JSON.parse(localStorage.getItem(`previousCitySearches`));
    if (previousCitySearchesArray !== null){
      previousCitySearchesArray.forEach((city) => {
        let prevCitySearchEl = document.createElement(`a`);
          prevCitySearchEl.setAttribute('class', 'waves-effect waves-light btn-large grey darken-1 black-text search');
          prevCitySearchEl.textContent = city;
          prevCitySearchEl.value = city;
          prevCitySearchEl.addEventListener(`click`, routeHistoryClickFetch)
        previousCitySearchContainerEl.appendChild(prevCitySearchEl);
      }
    )
  }
};


const decodeUnixTimeStamp = (unixStamp, format) => {
  let unixToJSTimeStamp = unixStamp * 1000;
  if (format === `time`){
      let formattedJSTime = moment(unixToJSTimeStamp).format('LT');
      return formattedJSTime;
  } else {
      let formattedJSTime = moment(unixToJSTimeStamp).format(`MMMM Do YYYY`);
      return formattedJSTime;
  }
};

  
  const convertDegreesToCardinalDirections = (deg) => {
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
      let arrow = document.querySelector('#arrow');
      arrow.style.transform = `rotate(${deg}deg)`
  }
  

  const updateWeatherIcon = (imgEl, iconTag) => {
    imgEl.setAttribute(`src`, `http://openweathermap.org/img/wn/${iconTag}@2x.png`)
  }
  

  const capitalizeEachWord = (sentence) => {
    let capitalizedSentence = sentence.split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return capitalizedSentence;
  }
  

  const generateWindSpeedString = (windDirection, windSpeed, windGust) => {
    if (windGust === undefined) {
      return `${windSpeed} mph ${windDirection}`;
    } else {
      return `${windSpeed} mph ${windDirection} gusting to ${windGust} mph`;
    }
  }


  const UVIndexColorizer = (UVIndex) => {
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
  
  
  const renderUpdatedWeatherValues = (json) => {
    let currentWeatherIconEl = document.querySelector(`#current-weather-icon`);
    let currentWeatherDescription = capitalizeEachWord(json.current.weather[0].description);
    let currentDateTime = decodeUnixTimeStamp(json.current.dt);
    let currentWeatherIconTag = json.current.weather[0].icon;
    let currentTempF = json.current.temp;
    let windDegrees = json.current.wind_deg;
    let windDirection = convertDegreesToCardinalDirections(windDegrees);
    let windSpeed = json.current.wind_speed;
    let windGust = json.current.wind_gust;
    let humidity = json.current.humidity;
    let UVIndex = json.current.uvi;
      updateWeatherIcon(currentWeatherIconEl, currentWeatherIconTag); 
      UVIndexColorizer(UVIndex);
      rotateArrow(windDegrees);
      document.querySelector(`#city-wind`).textContent = generateWindSpeedString(windDirection, windSpeed, windGust);
      document.querySelector(`#description`).textContent = currentWeatherDescription;
      document.querySelector(`#date`).textContent = ` ${currentDateTime} `;
      document.querySelector(`#city-temp`).textContent = `${currentTempF} `;
      document.querySelector(`#city-humidity`).textContent = humidity;
  }



  
  const updateDayForecast = (dayIndexNumber, dayInfoObject) => {
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
      forecastWindEl.textContent = generateWindSpeedString(forecastWindCardinalDirection, dayInfoObject.wind_speed)
      forecastHumidityEl.textContent = dayInfoObject.humidity;
  }
  
  const update5DayForecast = (daily) => {
      const fiveDayForecastElements = document.getElementsByClassName(`forecast`);
      for (let i = fiveDayForecastElements.length; i > 0; i--){
        updateDayForecast(i, daily[i])
      }
  }

  const fetchWeatherData = (getLatLongCoordFetchUrl, APIKey) => {
    return fetch(getLatLongCoordFetchUrl)
    .then(response => response.json())
    .then(json => {
      if (json.name === undefined) {
        throw `ERROR: 404 (Not Found) The city could not be found as entered.`
      }
      document.querySelector(`#city-name`).textContent = `${json.name}, `;
      return json.coord;
    })
    .then(coord => {
       return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=imperial&exclude=minutely,hourly&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            renderUpdatedWeatherValues(json);
            rotateArrow(json.current.wind_deg);
            update5DayForecast(json.daily)
            return(`success`) 
      })
    })
    .catch(err => {
      console.error(err);
      return err;
    }) 
  }

