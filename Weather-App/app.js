const notificationElement = document.getElementsByClassName('notification')[0]
const tempElement = document.getElementsByClassName("tempElement")[0]
const iconElement = document.getElementsByClassName("iconElement")[0]
const descElement = document.getElementsByClassName("descElement")[0]
const locElement = document.getElementsByClassName("locElement")[0]

const kelvin = 273
const key = '0f60a6d96efca4b46d58e46f1a07dd51'

const weather = {
    temperature: {
        value: 0,
        unit: "Celsius"
    },
    description: "Few Clouds",
    iconId: "clear",
    city: "Cairo",
    country: "EG"
}

tempElement.addEventListener("click", () => {
    if (weather.temperature.value === undefined) return
    if (weather.temperature.unit === "Celsius") {
        let fah = celToFah(weather.temperature.value)
        fah = Math.floor(fah)
        tempElement.innerHTML = `${fah}<span style='font-size:1.2em;'>&#8457;</span>`;
        weather.temperature.unit = "Fahrenheit"
    } else {
        tempElement.innerHTML = `${weather.temperature.value} <span style='font-size:1.2em;'>&#8451;</span>`;
        weather.temperature.unit = "Celsius"
    }
})




if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
    console.log('navigator')
} else {
    notificationElement.style.display = "block"
}

function setPosition(pos) {
    let lattude = pos.coords.latitude
    let long = pos.coords.longitude
    getWeatherInfo(long, lattude)
}


function showError(err) {
    notificationElement.style.display = "block"
    notificationElement.innerHTML = `<h1>${err.message}</h1>`
}

getWeatherInfo = (long, latllude) => {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latllude}&lon=${long}&APPID=${key}`
    fetch(api).then((res) => {
        let data = res.json()
        return data
    }).then((data) => {
        console.log(data)
        weather.temperature.value = Math.floor(data.main.temp - kelvin)
        console.log(weather.temperature.value)
        weather.description = data.weather[0].description
        weather.iconId = data.weather[0].icon
        weather.city = data.name
        weather.country = data.sys.country
    }).then(() => {
        displayWeather()
    })
}


displayWeather = () => {
    iconElement.innerHTML = `<img src="./icon/${weather.iconId}.png">`
    tempElement.innerHTML = `${weather.temperature.value}  <span style='font-size:1.2em;'>&#8451;</span>`
    descElement.innerHTML = `${weather.description}`
    locElement.innerHTML = `${weather.city}, ${weather.country}`
}

celToFah = (temp) => {
    return (temp * 9 / 5) + 32
}


