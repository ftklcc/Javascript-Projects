const months = [
    "ocak",
    "şubat",
    "mart",
    "nisan",
    "mayıs",
    "haziran",
    "temmuz",
    "ağustos",
    "eylül",
    "ekim",
    "kasım",
    "aralık",
];
const weekdays = [
    "pazar",
    "pazartesi",
    "salı",
    "çarşamba",
    "perşembe",
    "cuma",
    "cumartesi",
];

const campaignText = document.querySelector('.campaign-text')
const items = document.querySelectorAll('.campaign-time h4')
const timeContainer = document.querySelector('.campaign-time-container')
/* Değer sabitleme */
let temp = new Date()
let tempYear = temp.getFullYear()
let tempMonth = temp.getMonth()
let tempDay = temp.getDate()



// const futureDate = new Date(2026, 9, 29, 20, 30, 0)
//*alttaki yazım direkt olarak 1 gün yada şu kadar saat sonra vs. göstermektedir 
const futureDate = new Date(tempYear, tempMonth, tempDay + 1, 10, 0, 0)
const futureTime = futureDate.getTime()

const year = futureDate.getFullYear()
const month = months[futureDate.getMonth()]
const date = futureDate.getDate()
const weekday = weekdays[futureDate.getDay()]
const hours = futureDate.getHours()
const mins = futureDate.getMinutes()

campaignText.textContent = `(${year} )${date} ${month} ${weekday} ${hours}:${mins}'da satış başlayacaktır...`

function getRemainingTime() {
    const today = new Date().getTime()
    const diff = futureTime - today
    /* 1 gün içindeki milisaniye değeri */
    const ONE_DAY = 24 * 60 * 60 * 1000
    const ONE_MINUTE = 60 * 60 * 1000
    const ONE_SECOND = 60 * 1000
    //*Değerleri hesapla
    const day = Math.floor(diff / ONE_DAY)
    const hour = Math.floor((diff % ONE_DAY) / ONE_MINUTE)
    const minute = Math.floor((diff % ONE_MINUTE) / ONE_SECOND)
    const second = Math.floor((diff % ONE_SECOND) / 1000)
    //*Ekranda göstermek için değer diziye atandı
    const values = [day, hour, minute, second]
    items.forEach((item, i) => {
        item.textContent = format(values[i])
    })
    //* sayaç bitti ise
    if (diff < 0) {
        clearInterval(count)
        campaignText.textContent = `Stoklar satışa açıktır...`
        timeContainer.innerHTML = `<h4 class="endText">Stoklar tükenmeden sipariş veriniz.</h4>`
    }

}
/* 10 dan küçük ise sayaç başa 0 ekler */
function format(t) {
    if (t < 10) {
        return `0${t}`
    }
    return t
}

let count = setInterval(getRemainingTime, 1000) // ekranda dinamik sayaç çalışması için
getRemainingTime()

















