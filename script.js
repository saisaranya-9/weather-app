const apiKey = "fa703d5f0e8e345bce46b9129be4b083";

function getWeather(){

    let city = document.getElementById("cityInput").value;

    if(city === ""){
        document.getElementById("weatherResult").innerHTML =
        "<p style='color:red;'>Please enter a city name</p>";
        return;
    }

    document.getElementById("loading").style.display = "block";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {

        document.getElementById("loading").style.display = "none";

        if(data.cod === "404"){
            document.getElementById("weatherResult").innerHTML =
            "<p style='color:red;'>City not found</p>";
            return;
        }

        let temp = data.main.temp;
        let humidity = data.main.humidity;
        let condition = data.weather[0].main;
        let icon = data.weather[0].icon;

        let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        document.getElementById("weatherResult").innerHTML = `
            <img src="${iconUrl}">
            <p>Temperature: ${temp} °C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Condition: ${condition}</p>
        `;
    })
    .catch(error =>{
        console.log(error);
    });
}


function getLocationWeather(){

navigator.geolocation.getCurrentPosition(function(position){

let lat = position.coords.latitude;
let lon = position.coords.longitude;

document.getElementById("loading").style.display = "block";

let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

fetch(url)
.then(response => response.json())
.then(data => {

document.getElementById("loading").style.display = "none";

let temp = data.main.temp;
let humidity = data.main.humidity;
let condition = data.weather[0].main;
let city = data.name;
let icon = data.weather[0].icon;

let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

document.getElementById("weatherResult").innerHTML = `
<img src="${iconUrl}">
<p>Location: ${city}</p>
<p>Temperature: ${temp} °C</p>
<p>Humidity: ${humidity}%</p>
<p>Condition: ${condition}</p>
`;

});

});

}