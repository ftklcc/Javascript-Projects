// importing static data for date formatting
import { months, weekdays } from './data.js'

//selecting DOM elements for dynamic updates
const campaignText = document.querySelector('.campaign-text')
const timeContainer = document.querySelector('.campaign-time-container')
const timeText = document.querySelectorAll('.campaign-time h4')

//timer variable and target date
let timer = null
const future = new Date(2028, 0, 27, 19, 30,)

//all events
const runEvents = () => {
    textValue()
    getRemaining()
    timer = setInterval(getRemaining, 1000)
}
//format and display the target lunch date in the UI
const textValue = () => {
    let futureYear = future.getFullYear()
    let futureMonth = capitalize(months[future.getMonth()])
    let futureDate = future.getDate()
    let futureDay = capitalize(weekdays[future.getDay()])
    let futureHour = future.getHours()
    let futureMins = future.getMinutes()

    // Injects the formatted date into the campaign description
    campaignText.textContent = `[${futureYear}] ${futureDate} ${futureMonth} ${futureDay} ${futureHour}:${futureMins} 'da Satışlarımız başlayacaktır....`

}
//calculateing remaining time and update UI
const getRemaining = () => {
    // Get time in milliseconds
    let futureTime = future.getTime()
    let nowTime = new Date().getTime()
    let diff = futureTime - nowTime

    // Time constants
    const ONE_DAY = 24 * 60 * 60 * 1000
    const ONE_HOUR = 60 * 60 * 1000
    const ONE_MINUTE = 60 * 1000

    // Calculate remaining units using Math.floor and Modulo (%)
    const day = Math.floor(diff / ONE_DAY)
    const hour = Math.floor((diff % ONE_DAY) / ONE_HOUR)
    const minute = Math.floor((diff % ONE_HOUR) / ONE_MINUTE)
    const second = Math.floor((diff % ONE_MINUTE) / 1000)

    // Store values in an array for easy mapping
    const value = [day, hour, minute, second]

    // Update DOM elements with formatted numbers
    timeText.forEach((time, index) => {
        time.innerHTML = format(value[index])
    })

    // If countdown expires, stop timer and update UI
    if (diff <= 0) {
        clearInterval(timer)
        campaignText.innerHTML = `<p class="endText" >Satışlar başlamıştır...</p>`
        timeContainer.innerHTML = '<h3 class="endText" >Stoklar tükenmeden sipariş veriniz...</h3>'
    }

}

//! Utils 
//capitalizes the first letter and lowers the rest (MONDAY or monday -> 'Monday')
const capitalize = (text) =>
    `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`

//double-digit format (converts 5 to "05")
const format = (number) => String(number).padStart(2, '0')

//init app
document.addEventListener('DOMContentLoaded', runEvents)