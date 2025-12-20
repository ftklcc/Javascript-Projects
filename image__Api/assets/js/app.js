//DOM elements
const el = {
    form: document.querySelector('.form'),
    searchInput: document.querySelector('.search'),
    clearButton: document.querySelector('.clear'),
    imageList: document.querySelector('.list')
}

//Yeni bir nesne türeterek işlem yapıyoruz
//Kodları ayırdık ki karmaşadan kurtulalım..
const newImage = new GetImage()

//all events
const runEvents = () => {
    el.form.addEventListener('submit', addRequest)
    loadData()
    el.clearButton.addEventListener('click', allClear)

}
//add request Api
const addRequest = async e => {
    e.preventDefault()
    const value = el.searchInput.value.trim()
    if (value === "") {
        alert('Arama kısmı boş bırakılamaz.')
        return;
    }
    const datas = await newImage.getPhoto(value)
    if (datas) {
        datas.forEach(data => {
            addImageUI(data.urls.small)
            saveData(data.urls.small)
        })
    }

}
//add UI image
const addImageUI = data => {
    const img = document.createElement('img')
    img.src = data
    el.imageList.prepend(img)
}
//check datas
const getData = () => {
    return JSON.parse(localStorage.getItem('image')) || [];
}
//save data
const saveData = (data) => {
    let items = getData()
    items.unshift(data)
    localStorage.setItem('image', JSON.stringify(items))
}
//load data
const loadData = () => {
    getData().forEach(data => addImageUI(data))
}
//all clear to UI and localstorage
const allClear = () => {
    if (confirm('Silmek istediğinize emin misiniz ?')) {
        el.imageList.innerHTML = "";
        localStorage.removeItem('image')
    }
}




runEvents()