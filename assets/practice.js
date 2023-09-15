const weatherMainContainer = document.querySelector(".weather-informations");
const whenErrorCase = document.querySelector(".when-error");

const searchBox = document.querySelector(".search-place input");
const searchIcon = document.querySelector(".search-icon");

/* informations */

const temp = document.querySelector(".weather-main .temp");
const city = document.querySelector(".weather-main .city");

const humidityPersontage = document.querySelector(".weather_additional-info .humidity .values .per");
const windValue = document.querySelector(".weather_additional-info .wind .values .per");


function getData(city) {
    return new Promise((resolve, reject) => {
        let myRequest = new XMLHttpRequest();
        myRequest.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=184c0e86b04a2782c4ab773a3a633537&units=metric`)
        myRequest.responseType = "json";
        myRequest.send()

        myRequest.onload = () => {
            if (myRequest.readyState == 4 && myRequest.status >= 200 && myRequest.status < 300) {
                resolve(myRequest.response)
            } else {
                reject("Please enter a valid city name")
            }
        }
    })
}

searchIcon.addEventListener("click", () => {
    if (searchBox.value == "") return;
    getData(searchBox.value).then(
        (data) => {
            temp.textContent = data.main.temp + "°C";
            city.textContent = data.name + ", " + data.sys.country;
            humidityPersontage.textContent = data.main.humidity + "%";
            windValue.textContent = data.wind.speed + "km/h";

            weatherMainContainer.style.display = "block";
            whenErrorCase.style.display = "none"
        }
    ).catch(
        (error) => {
            whenErrorCase.style.display = "block"
            weatherMainContainer.style.display = "none";
        }
    )

})