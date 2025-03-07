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
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(updateWeather);
}


function handleSearchSubmit(event){
    event.preventDefault();

let searchInput=document.querySelector("#search-form-input");
let cityElement=document.querySelector("#city");
cityElement.innerHTML= searchInput.value;

searchCity(searchInput.value);
}

let searchFormElement =document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);
searchCity("Paris");