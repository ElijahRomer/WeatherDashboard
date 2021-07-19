console.log(`If this is logged, then app.js is linked correctly.`);

M.AutoInit();

let homeCity;
let currentCity;

const pageInitialize = () => {
  console.log(`pageInitialize FIRED`);
  console.log(localStorage.getItem(`homeCity`));
  console.log(typeof localStorage.getItem(`homeCity`));
  if (localStorage.getItem(`homeCity`) === null||localStorage.getItem(`homeCity`) === "") {
    console.log(`No homeCity found. Setting to Chicago.`)
    updateHomeCity(`chicago`)
  }
  renderPreviousCitySearches();
  let homeCity = retrieveHomeCityFromLocalStorage();
  // getWeatherInfo(homeCity);
};

const updateHomeCity = (city) => {
  console.log(`updateHomeCity FIRED`);
  localStorage.setItem(`homeCity`, city);
  document.querySelector(`#home-city-el`).textContent = city;
  document.querySelector(`#home-city-el`).value = city;
  document.querySelector(`#home-city-el`).addEventListener('click', routeHistoryClickFetch)
};

const retrieveHomeCityFromLocalStorage = () => {
    console.log(`retrieveHomeCityFromLocalStorage FIRED`);
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
  // console.log(`getWeatherInfo FIRED`);
  document.querySelector(`#set-current-as-home`).value = cityName;
  const APIKey = `23b24ea95d3f9c9ddcf2eea23ed648c8`
  let getLatLongCoordFetchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;
  fetchWeatherData(getLatLongCoordFetchUrl, APIKey)
  .then(message => {
    console.log(`message is ${message}`)
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
  console.log(`persistCityToLocalStorage FIRED`);
  if (localStorage.getItem(`previousCitySearches`) === null) {
      console.log(`No Cities saved in Local Storage`)
      localStorage.setItem(`previousCitySearches`, JSON.stringify([cityName]));
      return;
  } else {
    let previousCitySearchesArray = JSON.parse(localStorage.getItem(`previousCitySearches`));
    if (previousCitySearchesArray.length < 10) {
        console.log(`previousCitySearchesArray.length is less than 10`)
        previousCitySearchesArray.unshift(cityName);
        localStorage.setItem(`previousCitySearches`, JSON.stringify(previousCitySearchesArray));
    } else {
        console.log(`previousCitySearchesArray.length is 10 or greater`)
        previousCitySearchesArray.pop();
        previousCitySearchesArray.unshift(cityName);
        localStorage.setItem(`previousCitySearches`, JSON.stringify(previousCitySearchesArray))
    }
  }
};

const renderPreviousCitySearches = () => {
  console.log(`renderPreviousCitySearches FIRED`);
  let previousCitySearchContainerEl = document.querySelector(`#city-search-history`);

  for (let i = previousCitySearchContainerEl.children.length - 1; i >=0; i--) {
    previousCitySearchContainerEl.children[i].remove()
  };

  let previousCitySearchesArray = JSON.parse(localStorage.getItem(`previousCitySearches`));

    previousCitySearchesArray.forEach((city) => {
      let prevCitySearchEl = document.createElement(`a`);
        prevCitySearchEl.setAttribute('class', 'waves-effect waves-light btn-large grey darken-1 black-text search');
        prevCitySearchEl.textContent = city;
        prevCitySearchEl.value = city;
        prevCitySearchEl.addEventListener(`click`, routeHistoryClickFetch)
      previousCitySearchContainerEl.appendChild(prevCitySearchEl);
    }
  )
};


const decodeUnixTimeStamp = (unixStamp, format) => {
  // console.log(`decodeUnixTimeStamp FIRED`);
  let unixToJSTimeStamp = unixStamp * 1000;
  if (format === `time`){
      let formattedJSTime = moment(unixToJSTimeStamp).format('LT');
      return formattedJSTime;
  } else {
      let formattedJSTime = moment(unixToJSTimeStamp).format(`MMMM Do YYYY`);
      return formattedJSTime;
  }
};

console.log(decodeUnixTimeStamp(1626685207));
console.log(decodeUnixTimeStamp(1626685207, `time`));

  
  const convertDegreesToCardinalDirections = (deg) => {
    // console.log(`convertDegreesToCardinalDirections FIRED`);
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
    // console.log(`rotateArrow  FIRED`)
      let arrow = document.querySelector('#arrow');
      arrow.style.transform = `rotate(${deg}deg)`
  }
  

  const updateWeatherIcon = (imgEl, iconTag) => {
    // console.log(`updateWeatherIcon FIRED`);
    imgEl.setAttribute(`src`, `http://openweathermap.org/img/wn/${iconTag}@2x.png`)
  }
  

  const capitalizeEachWord = (sentence) => {
    // console.log(`capitalizeEachWord FIRED`)
    let capitalizedSentence = sentence.split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return capitalizedSentence;
  }
  

  const generateWindSpeedString = (windDirection, windSpeed, windGust) => {
    // console.log(`generateWindSpeedString FIRED`);
    if (windGust === undefined) {
      return `${windSpeed} mph ${windDirection}`;
    } else {
      return `${windSpeed} mph ${windDirection} gusting to ${windGust} mph`;
    }
  }


  const UVIndexColorizer = (UVIndex) => {
    // console.log(`UVIndexColorizer FIRED`);
    // console.log(`UVIndex is ${UVIndex}`);
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
      // console.log(`renderUpdatedWeatherValues FIRED`);
      // console.log(json);
    let currentWeatherIconEl = document.querySelector(`#current-weather-icon`);
    let currentWeatherIconTag = json.current.weather[0].icon;
    let currentWeatherDescription = capitalizeEachWord(json.current.weather[0].description);
      // console.log(json.current.weather[0].icon);
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
    // console.log(`updateDayForecast FIRED`);
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
    // console.log(`update5DayForecast FIRED`)
      const fiveDayForecastElements = document.getElementsByClassName(`forecast`);
      for (let i = fiveDayForecastElements.length; i > 0; i--){
        updateDayForecast(i, daily[i])
      }
  }

  const fetchWeatherData = (getLatLongCoordFetchUrl, APIKey) => {
    // console.log(`fetchWeatherData FIRED`);
    return fetch(getLatLongCoordFetchUrl)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      console.log(`The city returned from API is ${json.name}`)
      if (json.name === undefined) {
        throw `ERROR: 404 (Not Found) The city could not be found as entered.`
      }
      document.querySelector(`#city-name`).textContent = `${json.name}, `;
      // console.log(`LATITUDE OF ${json.name} IS ${json.coord.lat}`)
      // console.log(`LONGITUDE OF ${json.name} IS ${json.coord.lon}`)
      // console.log(json.coord)
      return json.coord;
    })
    .then(coord => {
       return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=imperial&exclude=minutely,hourly&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
          console.log(json);
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

