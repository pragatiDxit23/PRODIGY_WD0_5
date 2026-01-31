const apiKey = "a5c2a5a0b1d8cf4f0eddd77007c96a23";

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const feels = document.getElementById("feels");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const icon = document.getElementById("icon");
const dateEl = document.getElementById("date");
const loading = document.getElementById("loading");

function setDate(){
  const d = new Date();
  dateEl.innerText = d.toDateString();
}
setDate();

async function fetchWeather(url){
  try{
    loading.style.display = "block";
    const res = await fetch(url);
    const data = await res.json();

    if(data.cod != 200){
      alert("City not found");
      loading.style.display = "none";
      return;
    }

    city.innerText = data.name + ", " + data.sys.country;
    temp.innerText = Math.round(data.main.temp) + "°C";
    condition.innerText = data.weather[0].description;

    feels.innerText = Math.round(data.main.feels_like);
    humidity.innerText = data.main.humidity;
    wind.innerText = data.wind.speed;
    pressure.innerText = data.main.pressure;
    visibility.innerText = (data.visibility / 1000).toFixed(1);

    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    loading.style.display = "none";
  }
  catch{
    alert("Weather load error");
    loading.style.display = "none";
  }
}

function getCityWeather(){
  const cityName = document.getElementById("cityInput").value;
  if(cityName === "") return alert("Enter city name");
  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
}

function getLocationWeather(){
  navigator.geolocation.getCurrentPosition(pos=>{
    const {latitude, longitude} = pos.coords;
    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
  });
}

getLocationWeather();

