const alert = document.querySelector('.alert')
const form = document.querySelector('.form-1')
const addInput = document.querySelector('.add-list')
const submitBtn = document.querySelector('.submit-btn')
const select = document.querySelector('#select')
const search = document.querySelector('.search')
const filterBtns = document.querySelectorAll('.btn')
const lists = document.querySelector('.list')
const allDeleteBtn = document.querySelector('.all-delete')
const modal = document.querySelector('.modal')

//Edit için değişkenler
let editElement;
let editId = "";
let editFlag = false;

const runEvents = () => {
    form.addEventListener('submit', addList)
    document.addEventListener('DOMContentLoaded', loadData)
    allDeleteBtn.addEventListener('click', allDelete)
    filterBtn()
    filterBtnActive()
    search.addEventListener('keyup', filterSearch)
}
/* liste oluşturma edit yapma ve boş ise uyarı  */
const addList = (e) => {
    e.preventDefault()

    const id = new Date().getTime().toString()
    const value = addInput.value.trim()
    const selectValue = select.value


    if (value && !editFlag) {
        addListUI(id, value, selectValue)
        addLocalStorage(id, value, selectValue)
        showAlert('success', 'added to the list')
        resetForm()
    } else if (value && editFlag) {
        editElement.textContent = value
        editItemLocalStorage(editId, value, selectValue)
        showAlert('success', 'Changed Value')
        resetForm()
    } else {
        showAlert('danger', 'empty Value')
    }
};
/* işlemlerin yapıldıktan sonra veya hatalı ise uyarı */
const showAlert = (type, message) => {
    alert.textContent = message
    alert.classList.add(`alert-${type}`)
    setTimeout(() => {
        alert.textContent = ""
        alert.classList.remove(`alert-${type}`)
    }, 2000);
};
/* işlem sağlandıktan sonra formun eski haline dönmesi */
const resetForm = () => {
    addInput.value = "";
    editFlag = false;
    editId = "";
    submitBtn.textContent = 'add';
    submitBtn.style.backgroundColor = '#377df5'
    select.value = "low";

};
//Liste oluşturmak için kullanılan fonksiyon
const addListUI = (id, value, selectValue) => {
    const li = document.createElement('li')
    li.classList.add('list-item')
    const attr = document.createAttribute('data-id')
    attr.value = id;
    li.setAttributeNode(attr)
    li.innerHTML = `<div class="left-item">
                            <input type="checkbox" class="check"/>
                            <p>${value}</p>
                        </div>
                        <div class="right-item">
                            <span class="priority">${selectValue}</span>
                            <span class="date"></span>
                            <button class="edit-btn btn2"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="delete-btn btn2"><i class="fa-solid fa-trash"></i></button>
                        </div>`
    //Prio Color
    const prio = li.querySelector('.priority')
    priColor(prio)
    //Checkbox listener
    const check = li.querySelector('.check')
    check.addEventListener('click', checkbox)
    //Edit Btn
    const editBtn = li.querySelector('.edit-btn')
    editBtn.addEventListener('click', editItem)
    //Delete Btn
    const deleteBtn = li.querySelector('.delete-btn')
    deleteBtn.addEventListener('click', deleteItem)
    //date
    const d = li.querySelector('.date')
    const dates = new Date().toLocaleDateString('tr-TR')
    d.innerHTML = dates
    lists.append(li)


};
//Local storage kontrol
const getCheckStorage = () => {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
};
// Eklenen listeyi local storage kayıt
const addLocalStorage = (id, value, selectValue) => {
    const list = { id, value, selectValue, checked: false }
    const items = getCheckStorage()
    items.push(list)
    localStorage.setItem('list', JSON.stringify(items))
};
// local storage'de bulunanları sayfa yüklendiğinde ekrana yazdırma
const loadData = () => {
    let items = getCheckStorage()
    items.forEach(item => {
        addListUI(item.id, item.value, item.selectValue)
        const listItem = lists.querySelector(`[data-id='${item.id}']`)
        const el = listItem.querySelector('.check')
        el.checked = item.checked
        if (item.checked) {
            listItem.classList.add('active')
        }
    })

};
// hatalı girilen var ise yenidend düzenleme
const editItem = e => {
    const element = e.currentTarget.parentElement.parentElement
    editElement = e.currentTarget.parentElement.previousElementSibling.querySelector('p')
    addInput.value = editElement.textContent
    editFlag = true;
    submitBtn.textContent = 'edit'
    submitBtn.style.backgroundColor = 'orange'
    editId = element.dataset.id
};
// local storage'den de düzenleme
const editItemLocalStorage = (id, value, selectValue) => {
    let items = getCheckStorage()
    items = items.map(item => {
        if (item.id === id) {
            return { ...item, value, selectValue }
        }
        return item
    })
    localStorage.setItem('list', JSON.stringify(items))
};
// checkbox aktif inaktif
const checkbox = e => {
    const el = e.currentTarget
    const elList = el.closest('.list-item') //parent elmentin parentı seçildi
    const id = elList.dataset.id
    let items = getCheckStorage()
    items = items.map(item => {
        if (item.id === id) {
            item.checked = el.checked

        }
        return item
    })
    localStorage.setItem('list', JSON.stringify(items))
    if (el.checked) elList.classList.add('active')
    else elList.classList.remove('active')



};
//Öncelik değerine göre renklendirme
const priColor = (prio) => {
    if (prio.textContent === 'low') prio.classList.add('low')
    if (prio.textContent === 'medium') prio.classList.add('medium')
    if (prio.textContent === 'high') prio.classList.add('high')
};
//Ekrandan silme
const deleteItem = e => {
    const el = e.currentTarget.parentElement.parentElement
    lists.removeChild(el)
    const id = el.dataset.id
    console.log(id);
    deleteLocalStorage(id)
    resetForm()
    showAlert('danger', 'Item deleted')

};
//Local storag'den de silme
const deleteLocalStorage = (id) => {
    let items = getCheckStorage()
    items = items.filter(item => item.id !== id)
    localStorage.setItem('list', JSON.stringify(items))
};
//Tümünü silme herYerden
const allDelete = () => {
    const listItems = document.querySelectorAll('.list-item');

    if (listItems.length === 0) {
        showAlert('danger', 'empty value');
        return;
    }

    modal.classList.add('active');
    // Kabul butonuna bir kez tıklama olayı ekle
    const acceptBtn = document.querySelector('[data-set="accept"]');
    const cancelBtn = document.querySelector('[data-set="cancel"]');

    const handleAccept = () => {
        listItems.forEach(item => item.remove());
        modal.classList.remove('active');
        localStorage.removeItem('list')
        showAlert('success', 'all clear list')
    };
    const handleCancel = () => {
        modal.classList.remove('active');
    };

    acceptBtn.addEventListener('click', handleAccept);
    cancelBtn.addEventListener('click', handleCancel);

};
//Butonlar ile filtreleme
const filterBtn = () => {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            const filter = e.target.textContent.toLowerCase()

            const allItems = document.querySelectorAll('.list-item')
            allItems.forEach(item => {
                const priority = item.querySelector('.priority').textContent.toLowerCase()
                if (filter === 'all' || filter === priority) {
                    item.style.display = 'flex'

                } else {
                    item.style.display = 'none'

                }
            })
        })
    })
};
//Active butonu işaretleme
const filterBtnActive = () => {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            filterBtns.forEach(item => {
                item.classList.remove('active')
            })
            btn.classList.add('active')
        })
    })
}
//İnput üzerinden filtreleme isim olara
const filterSearch = e => {
    const filterValue = e.target.value.toLowerCase().trim()
    const filterLists = document.querySelectorAll('.list-item')
    filterLists.forEach(li => {

        const filterP = li.querySelector('p').textContent
        if (filterP.toLowerCase().includes(filterValue)) {
            li.setAttribute('style', 'display:flex')
        } else {
            li.setAttribute('style', 'display:none')
        }
    })
}


runEvents()
