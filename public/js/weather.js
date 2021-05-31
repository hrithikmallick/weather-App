const btnweather = document.getElementById("btn-weather");
const cityname = document.getElementById("cityname");
const temp = document.getElementById("temp");
const tempmin = document.getElementById("tempmin");
const tempmax = document.getElementById("tempmax");
const loca = document.getElementById("loca");
const weather = document.getElementById("cloud");
const weatherdesc = document.getElementById("condi");
const wind = document.getElementById("wind");

const checkweather = async (event) => {
  event.preventDefault();
  let city = cityname.value;
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=827788fcf1df41ec70e9c1d2faaf39cf`;
  try {
    let data = await fetch(api);
    arrData = await data.json();
    console.log(arrData);
    loca.innerHTML = `${arrData.name},${arrData.sys.country}`;
    temp.innerHTML = `Temperature:- ${arrData.main.temp}&deg;C`;
    tempmin.innerHTML = `min temp:- ${arrData.main.temp_min}&deg;C`;
    tempmax.innerHTML = `max temp:- ${arrData.main.temp_max}&deg;C`;
    weatherdesc.innerHTML = `${arrData.weather[0].description}`;
    wind.innerHTML = `Wind speed :- ${arrData.wind.speed}m/s`;
    let cloud = arrData.weather[0].main;
    // console.log(cloud);
    if (cloud == "Clear") {
      weather.innerHTML =
        '  <i class="fas fa-sun" style="font-size: 55px; color: yellow"></i>';
    } else if (cloud == "Clouds") {
      weather.innerHTML =
        '  <i class="fas fa-cloud" style="font-size: 55px; color: #dfe4ea"></i>';
    } else if (cloud == "Rain") {
      weather.innerHTML =
        '  <i class="fas fa-cloud-rain" style="font-size: 55px; color: #dfe4ea"></i>';
    } else if (cloud == "Haze") {
      weather,
        (innerHTML =
          '<i class="fas fa-smog" style="font-size: 55px; color: #dfe4ea"></i>');
    } else {
      weather.innerHTML =
        '  <i class="fas fa-cloud" style="font-size: 55px; color: #dfe4ea"></i>';
    }
  } catch (error) {
    // console.error(error);
    alert("Please Enter Proper Name");
  }
};
btnweather.addEventListener("click", checkweather);
