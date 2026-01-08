//weather js den buraya kodu import ettik
import { Weather } from './weather.js';





//DOM ELEMENTS
const search = document.getElementById("search");
const form = document.getElementById("form");
const main = document.querySelector('.main')
const closeMain = document.querySelector('.close__app')

// weather clasından yeni bir nesne türedildi.
const weather = new Weather();
//all run events
const runEvents = () => {
    form.addEventListener("submit", searchFilter);
    closeMain.addEventListener('click', closeApp)
    main.addEventListener('click', closeApp)
}

const searchFilter = async e => {
    e.preventDefault();

    const value = search.value.trim();
    if (!value) return alert('Şehir aratınız')

    addUI(weather.getWeather(value))
    main.classList.add('active')
    search.value = ""
};

const addUI = async (data) => {
    const datas = await data
    // console.log(datas);

    /* DOM ELMENTS */
    const el = {
        countryName: document.querySelector('.country__name'),
        cityName: document.querySelector('.city__name'),
        weatherType: document.querySelector('.weather__type'),
        degree: document.querySelector('.weather__degree'),
        img: document.querySelector('.weather__img')
    }
    //dom maniplasyonu yapılarak iki taraf eşleştirildi.
    el.countryName.textContent = datas.sys.country
    el.cityName.textContent = datas.name
    el.weatherType.textContent = datas.weather[0].description
    el.degree.textContent = `${Math.round(datas.main.temp)}°C`
    el.img.src = `https://openweathermap.org/img/wn/${datas.weather[0].icon}@2x.png`

}
const closeApp = () => {
    main.classList.remove('active')
}

runEvents()
