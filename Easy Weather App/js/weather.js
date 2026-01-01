export class Weather {
    constructor() {
        this.url = `https://api.openweathermap.org/data/2.5/weather`
        this.api_Key = '18faa147a15178f565ca21516dd52219'
    }

    async getWeather(value) {
        const params = new URLSearchParams({
            q: value,
            units: 'metric',
            appid: this.api_Key

        })
        const response = await fetch(`${this.url}?${params}`)
        const datas = await response.json()
        return datas
    }
}

