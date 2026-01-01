//weather js den buraya kodu import ettik
import { Weather } from './weather.js';

//DOM ELEMENTS
const search = document.getElementById("search");
const form = document.getElementById("form");


// weather clasından yeni bir nesne türedildi.
const weather = new Weather();
//all run events
const runEvents = () => {
    form.addEventListener("submit", searchFilter);
}

const searchFilter = async e => {
    e.preventDefault();

    const value = search.value.trim();
    if (!value) return alert('Şehir aratınız')

    addUI(weather.getWeather(value))
    search.value = ""
};

const addUI = async (data) => {
    const datas = await data
    /* DOM ELMENTS */
    const el = {
        countryName: document.querySelector('.country__name'),
        cityName: document.querySelector('.city__name'),
        weatherType: document.querySelector('.weather__type'),
        degree: document.querySelector('.weather__degree')
    }
    //dom maniplasyonu yapılarak iki taraf eşleştirildi.
    el.countryName.textContent = datas.sys.country
    el.cityName.textContent = datas.name
    el.weatherType.textContent = datas.weather[0].main
    el.degree.textContent = `${Math.round(datas.main.temp)}°C`

}


runEvents()
