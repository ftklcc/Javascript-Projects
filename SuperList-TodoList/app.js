//Cache DOM elements
const DOM = {
    alert: document.querySelector('.alert'),
    form: document.querySelector('.form-1'),
    addInput: document.querySelector('.add-list'),
    priorityInput: document.getElementById('select'),
    submitButton: document.querySelector('.submit-btn'),
    searchInput: document.querySelector('.search'),
    filterButtonContainer: document.querySelector('.button-container'),
    taskList: document.querySelector('.list'),
    modal: document.querySelector('.modal'),
    modalConfirmButton: document.querySelector('[data-set="accept"]'),
    ModalCancelButton: document.querySelector('[data-set="cancel"]'),
    allDeleteButton: document.querySelector('.all-delete')
}

//Holds editing task ID
let editId = null;
//Edit State Flag
let editMode = false;

//initialize App
const initApp = () => {
    runEvents()
    loadStorage()
}
//Bind Even listeners
const runEvents = () => {
    DOM.form.addEventListener('submit', addTask)
    DOM.taskList.addEventListener('click', (e) => removeTask(e))
    DOM.filterButtonContainer.addEventListener('click', filterPriority)
    DOM.searchInput.addEventListener('keyup', filterSearch)
    DOM.allDeleteButton.addEventListener('click', openModal)
    DOM.ModalCancelButton.addEventListener('click', closeModal)
    DOM.modalConfirmButton.addEventListener('click', removeAllTask)

}
// add new Task
const addTask = (e) => {
    e.preventDefault()
    const value = DOM.addInput.value.trim()

    //empty input validation
    if (!value) return showAlert('danger', 'empty value')

    //if edit mode is active, update task
    if (editMode) {
        updateTask(value)
        return;
    }

    const task = {
        id: Date.now(),
        value: value,
        priority: DOM.priorityInput.value,
        completed: false
    }

    addTaskUI(task)
    saveStorage(task)
    resetForm()
    showAlert('success', 'add task to the list')
}
//Render task UI
const addTaskUI = (task) => {
    const { id, value, priority, completed } = task

    const li = document.createElement('li')
    li.className = `list-item ${priority} ${completed ? "active" : ""}`
    li.dataset.id = id;
    li.innerHTML = `<div class="left-item">
							<input type="checkbox" class="check" ${completed ? 'checked' : ''} />
							<p> ${value} </p>
						</div>
						<div class="right-item">
							<span class="priority ${priority}"> ${priority} </span>
							<span class="date"> ${updateTime()} </span>
							<button class="edit-btn btn2"><i class="fa-solid fa-pen-to-square"></i></button>
							<button class="delete-btn btn2"><i class="fa-solid fa-trash"></i></button>
						</div>`
    //edit Button handler
    const editButton = li.querySelector('.edit-btn')
    editButton.addEventListener('click', () => editItem(li))
    //chekcbox handler
    const checkInput = li.querySelector('input');
    checkInput.addEventListener('change', (e) => toggleCheckbox(li))
    DOM.taskList.appendChild(li)
}
//get task from storage
const getCheckStorage = () => {
    return localStorage.getItem('task')
        ? JSON.parse(localStorage.getItem('task')) : [];
}
//save task to storage
const saveStorage = (task) => {
    const items = getCheckStorage()
    items.push(task)
    localStorage.setItem('task', JSON.stringify(items))
}
//load task from storage
const loadStorage = () => {
    getCheckStorage().forEach(addTaskUI)
}
//remove single task
const removeTask = (e) => {
    const delButton = e.target.closest('.fa-trash')
    if (!delButton) return;

    const li = e.target.closest('.list-item')
    li.remove()
    removeLocaleStorage(li)
    showAlert('danger', 'delete task')
}
//remove task from storage
const removeLocaleStorage = (li) => {
    let items = getCheckStorage()
    items = items.filter(i => i.id !== Number(li.dataset.id))
    localStorage.setItem('task', JSON.stringify(items))
}
//edit task
const editItem = (li) => {
    editMode = true;
    editId = li.dataset.id

    const liText = li.querySelector('.left-item p').textContent.trim()
    const liPrio = li.querySelector('.priority').textContent.trim()

    DOM.submitButton.style.background = 'orange'
    DOM.submitButton.textContent = 'edit'

    DOM.addInput.value = liText;
    DOM.priorityInput.value = liPrio

}
//update task
const updateTask = (newTask) => {
    let items = getCheckStorage();

    let item = items.find(i => i.id === Number(editId))

    console.log(item.value);

    item.value = newTask;
    item.priority = DOM.priorityInput.value;

    localStorage.setItem('task', JSON.stringify(items))

    reloadUI()
    showAlert('success', 'Updated!')
    resetForm()
}
//toggle completed state
const toggleCheckbox = (li) => {
    li.classList.toggle('active')
    let id = Number(li.dataset.id)

    let items = getCheckStorage();
    let item = items.find(i => i.id === id)
    item.completed = !item.completed

    localStorage.setItem('task', JSON.stringify(items))

}
//filter by priority
const filterPriority = (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    updateButton(btn)

    const btnText = btn.textContent.trim().toLowerCase()
    const list = DOM.taskList.querySelectorAll('.list-item')

    list.forEach(li => {
        const text = li.querySelector('.priority')
            .textContent
            .toLowerCase()
            .trim()

        if (text.includes(btnText) || btnText === "all") {
            li.style.display = 'flex'
        } else {
            li.style.display = 'none'
        }

    })

}
//update active filter button
const updateButton = (btn) => {
    btn.parentNode.querySelector('.active').classList.remove('active')
    btn.classList.add('active')
}
//search filter
const filterSearch = (e) => {
    const filterValue = e.target.value.toLowerCase().trim()
    const list = DOM.taskList.querySelectorAll('.list-item')

    list.forEach(li => {
        const text = li.querySelector('.left-item p').textContent.trim().toLowerCase()

        li.style.display = text.includes(filterValue)
            ? 'flex'
            : 'none'
    })
}
//Open modal
const openModal = () => {
    DOM.modal.classList.add('active')
}
//close modal
const closeModal = () => {
    DOM.modal.classList.remove('active')
}
//remove all task
const removeAllTask = () => {
    DOM.taskList.innerHTML = "";
    localStorage.removeItem('task')

    showAlert('success', 'clear list')
    DOM.modal.classList.remove('active')
}
/* ------ Utility */

//reloaded UI
const reloadUI = () => {
    DOM.taskList.innerHTML = "";
    loadStorage();
}
//Display alert
const showAlert = (type, message) => {
    DOM.alert.textContent = message;
    DOM.alert.classList.add(`alert-${type}`)
    setTimeout(() => {
        DOM.alert.textContent = "";
        DOM.alert.classList.remove(`alert-${type}`)
    }, 1000)
}
//Get current date
const updateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const date = now.getDate()
    return `${date}/${month}/${year}`
}
//reset form state
const resetForm = () => {
    DOM.addInput.value = "";


    DOM.submitButton.style.background = '#0a4cbd'
    DOM.submitButton.textContent = 'add'

    editMode = false;
    editId = "";


}

//Start App
initApp()