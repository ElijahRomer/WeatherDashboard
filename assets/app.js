console.log(`If this is logged, then app.js is linked correctly.`);

let cityName = `Chicago`;
let stateName =`US-IL`

const APIKey = `23b24ea95d3f9c9ddcf2eea23ed648c8`

// let currentWeatherFetchURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`; //THIS API DOES NOT PROVIDE UV INDEX.
// let fiveDayForecastFetchURL = `api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`; //THIS API DOES NOT PROVIDE UV INDEX.

let getLatLongCoordFetchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`


console.log(getLatLongCoordFetchUrl)

fetch(getLatLongCoordFetchUrl)
  .then(response => response.json())
  .then(json => {
    console.log(`LATITUDE OF ${cityName} IS ${json.coord.lat}`)
    console.log(`LONGITUDE OF ${cityName} IS ${json.coord.lon}`)
    console.log(json.coord)
    return json.coord;
    })
  .then(coord => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly&appid=${APIKey}`)
      .then(response => response.json())
      .then(json => console.log(json))
    })
    // .then(response => response.json())
    // .then(json => {
    //   console.log(json)
    // })
