function updateWeather(response){
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=response.data.temperature.current;
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