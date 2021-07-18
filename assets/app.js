console.log(`If this is logged, then app.js is linked correctly.`);


let getWeatherInfo = () => {
  console.log(`getWeatherInfo FIRED`);
  const APIKey = `23b24ea95d3f9c9ddcf2eea23ed648c8`
  let cityName = document.querySelector(`#city-input`).value;
  let getLatLongCoordFetchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;
  fetchWeatherData(getLatLongCoordFetchUrl, APIKey)

console.log(getLatLongCoordFetchUrl)
}

document.querySelector(`#search`).addEventListener('click', getWeatherInfo)



let decodeUnixTimeStamp = (unixStamp) => {
  console.log(`decodeUnixTimeStamp FIRED`);
    let unixToJSTimeStamp = unixStamp * 1000;    
    let formattedJSTime = moment(unixToJSTimeStamp).format(`MMMM Do YYYY, h:mm:ss a`);
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

let convertDegreesToCardinalDirections = (deg) => {
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
};


let fetchWeatherData = (getLatLongCoordFetchUrl, APIKey) => {
  console.log(`fetchWeatherData FIRED`);
fetch(getLatLongCoordFetchUrl)
  .then(response => response.json())
  .then(json => {
    console.log(json)
    console.log(`The city returned from API is ${json.name}`)
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
        let currentDateTime = decodeUnixTimeStamp(json.current.dt);
        // let currentTempF = convertKelvinToFahrenheit(json.current.temp);
        let currentTempF = json.current.temp;
        let windDegrees = json.current.wind_deg;
        let windDirection = convertDegreesToCardinalDirections(windDegrees)
        let windSpeed = json.current.wind_speed;
        let windGust = json.current.wind_gust;
        let humidity = json.current.humidity;
        let UVIndex = json.current.uvi;

        console.log(`The date is ${currentDateTime}.`);
        console.log(`The temperature is ${currentTempF} F.`);
        console.log(`The wind is coming from ${windDegrees} degrees off N.`);
        console.log(`The wind is blowing ${windDirection}.`);
        console.log(`The wind is blowing at ${windSpeed} mph.`);
        console.log(`The wind is gusting as high as ${windGust} mph.`);
        console.log(`The current relative humidity is ${humidity}%.`);
        console.log(`The current UV Index is ${UVIndex}.`);


      })
    })
  }
