// 
// let base_url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`;
let inputVal = document.body.querySelector(".input_txt");
let searchBtn = document.body.querySelector(".search_btn");
let weatherBox = document.body.querySelector(".weather-box");
let temperature = document.body.querySelector(".temp");
let des = document.body.querySelector(".des");
let weatherDetails = document.body.querySelector(".weather-details");
let humidityVal = document.body.querySelector(".humidity .text span");
let flVal = document.body.querySelector(".fl .text span");
let displayImg = document.body.querySelector("img");
let locationf = document.body.querySelector(".fetchedLocation");
let alertMessage = document.body.querySelector(".alertMsg");
let currLocationBtn = document.body.querySelector(".heading i");

searchBtn.addEventListener("click", hitApi);

inputVal.addEventListener("keyup", (e)=>{
  if(e.key=="Enter") hitApi()});

function getLocation() {
  if(inputVal.value=="") {
    return;
  }
  else{
    let result=inputVal.value.trim();
    inputVal.value = "";
    return result;
  }
}


async function hitApi(lat = null, long = null) {
    let api_key = `9b9344b5fa42284acab579cc63b6af59`;
    let location = getLocation();
    displayImg.src="photos/loading.gif";
    if(lat==null && long==null) {
    try {
   
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`);
    let data = await response.json();
    
    
    updateData_UI(data);
    
    
    
  } catch (error) {
    alertWrongLocation();
  }
    }

    else{
      try{
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${api_key}`);
      let data = await response.json();
      
      updateData_UI(data);
      }
      catch(error){
        alertWrongLocation();
      }
    }
  }






function updateData_UI(data) {
  
  let loc_name = data.name; 
  let locWeather = data.weather[0].main;
  let locTemp = data.main.temp;
  let locDes = data.weather[0].description;
  let locHum = data.main.humidity;
  let locfl = data.main.feels_like;
  

  temperature.innerHTML =`${locTemp}°C`;
  des.innerHTML =`${locDes}`;
  humidityVal.innerHTML = `${locHum}%`;
  flVal.innerHTML = `${locfl}°C`;
  updateImg(locWeather);
  weatherBox.classList.remove("hide");
  weatherDetails.classList.remove("hide");
  locationf.innerHTML = loc_name;
}


function updateImg(locWeather) {
  switch(locWeather){
    case "Clear": displayImg.src=`photos/Clear.jpg`;break;
    case "Clouds": displayImg.src=`photos/Cloudy.jpg`;break;
    case "Haze": displayImg.src=`photos/Haze.png`;break;
    case "Mist": displayImg.src=`photos/Haze.png`;break;
    case "Rain": displayImg.src=`photos/rain.jpg`;break;
  }
}

function alertWrongLocation() {
  alertMessage.classList.remove("hide")
  setTimeout(()=>alertMessage.classList.toggle("hide"),2500)
}

currLocationBtn.addEventListener("click", askCurrLoc);

async function askCurrLoc() {
  let result = navigator.geolocation.getCurrentPosition(getCords, HandleFailure);
}


function getCords(position) {
  hitApi(position.coords.latitude, position.coords.longitude);
}

function HandleFailure() {
  console.log(":( user didn't gave access!");
}