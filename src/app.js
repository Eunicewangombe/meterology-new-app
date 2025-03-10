function updateWeather(response){
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=response.data.temperature.current;
    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML=response.data.condition.description;
    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=`${response.data.temperature.humidity}% `;
    let windElement=document.querySelector("#wind-speed");
    windElement.innerHTML=`${response.data.wind.speed}Km/h `;
    let timeElement=document.querySelector("#time");
    let date=new Date(response.data.time* 1000);
    timeElement.innerHTML=formatDate(date);
    let iconElement=document.querySelector("#icon");
   iconElement.innerHTML= `<img src="${response.data.condition.icon_url}"
    class="weather-app-icon"/>`
    getForecast(response.data.city)
}
function formatDate(date){
    let minutes=date.getMinutes();
    let hours=date.getHours();
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let day=days[date.getDay()];
    if (minutes<10){
        minutes=`0${minutes}`;
        
    }
    return `${day} ${hours}:${minutes}`;
    
}
function searchCity(city){
    //make API call and update the iterface
    let apiKey="40394c97bf43843e5a265de718ofb8t4";
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather);
}


function handleSearchSubmit(event){
    event.preventDefault();

let searchInput=document.querySelector("#search-form-input");
let cityElement=document.querySelector("#city");
cityElement.innerHTML= searchInput.value;

searchCity(searchInput.value);
}
function formatDay(timestamp){
    let date= new Date(timestamp*1000);
    let days=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
    return days[date.getDay()]
}
function getForecast(city){
    let apiKey="40394c97bf43843e5a265de718ofb8t4";
    let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast)
}
function displayForecast(response){
    console.log(response.data);
    let forecastElement=document.querySelector("#forecast")
    
    let forecastHtml= "";
    response.data.daily.forEach(function(day,index){
        if (index<5){
    forecastHtml=forecastHtml+`
    <div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)} </div>
    <div class="weather-forecast-icon">
    <img src="${day.condition.icon_url}"/>
    </div>
    <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">
        <strong>${Math.round (day.temperature.maximum )}°</strong>
        </div> 
        <div class="weather-forecast-temperature">${Math.round (day.temperature.minimum )}°</div>
    
    </div>
    </div> `; 
}
});

forecastElement.innerHTML=forecastHtml;
}

let searchFormElement =document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);
searchCity("Paris");






 