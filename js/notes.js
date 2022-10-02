import {notes, archivesCount} from "./state.js";
import {archives} from "./state.js";


const createNote = document.getElementById('createNote')
const closePopup = document.getElementById('close-popup')
const form = document.getElementById('popup')
const editId = []

const buttonCreateEdit = (toggle) => {
    const button = toggle
        ? `<button type="submit">Create</button>`
        : `<button id="edit-button" class="edit-button" type="button">Edit</button>`
    document.getElementById('popup').insertAdjacentHTML('beforeend', button)
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const noteId = notes.slice(-1)[0] === undefined ? 0 : notes.slice(-1)[0].id
    const firstId = noteId === 0 ? 0 : 1
    const formData = new FormData(form)
    const newNotes = {
        id: `${Number(noteId) + Number(firstId)}`,
        name: `${formData.get('name')}`,
        created: `${new Date().toLocaleDateString('en-US')}`,
        category: `${formData.get('category')}`,
        content: `${formData.get('message')}`,
        dates: `${formData.get('date')}`,
        button: ''
    }
    notes.push(newNotes)
    document.getElementById('notes-list').innerHTML = ''
    createNoteTable(notes)
    document.getElementById('popup').classList.remove('active')
    document.getElementById('popup-bg').classList.remove('active')
})

createNote.addEventListener('click', function () {
    if (document.getElementById('popup')["lastElementChild"].tagName === 'BUTTON') {
        document.getElementById('popup')["lastChild"].remove()
    }
    buttonCreateEdit(true)
    const categoryValue = document.querySelectorAll('input[name="category"]')

    for (let i = 0; i < categoryValue.length; i++) {
        categoryValue[i].setAttribute("required", "required")
    }
    document.getElementById('name').value = ''
    document.getElementById('message').value = ''
    document.getElementById('date').value = ''
    document.getElementById('popup-bg').classList.add('active')
    document.getElementById('popup').classList.add('active')
})

closePopup.addEventListener('click', function () {
    document.getElementById('popup').classList.remove('active')
    document.getElementById('popup-bg').classList.remove('active')
})

addEventListener("click", function (e) {
    const target = e.target
    if (target.id === 'archiveAll') {
        e.composedPath()[4].children[1].innerHTML = ''
        notes.map(item => archives.push(item))
        notes.splice(0, notes.length)
    }
    if (target.id === 'cleanAll') {
        e.composedPath()[4].children[1].innerHTML = ''
        notes.splice(0, notes.length)
    }
    if (target.id === 'clean') {
        e.composedPath()[3].removeChild(e.composedPath()[2])
        notes.forEach((item, index) => item.id === e.composedPath()[2].id
            && notes.splice(index, 1))
    }
    if (target.id === 'archive') {
        e.composedPath()[3].removeChild(e.composedPath()[2])
        notes.map((item, index) => {
            if (item.id === e.composedPath()[2].id) {
                notes.splice(index, 1)
                archives.push(item)
            }
        })
    }
    if (target.id === 'edit') {
        editId.push(e.composedPath()[2].id)
        if (document.getElementById('popup')["lastElementChild"].tagName === 'BUTTON') {
            document.getElementById('popup')["lastChild"].remove()
        }
        buttonCreateEdit(false)
        notes.map(note => {
            if (note.id === e.composedPath()[2].id) {
                const categoryValue = document.querySelectorAll('input[name="category"]')
                for (let i = 0; i < categoryValue.length; i++) {
                    if (categoryValue[i].value === note.category) {
                        categoryValue[i].checked = true
                    }
                }
                document.getElementById('name').value = note.name
                document.getElementById('message').value = note.content
                document.getElementById('date').value = note.dates
            }
        })
        document.getElementById('popup-bg').classList.add('active')
        document.getElementById('popup').classList.add('active')
    }
    if (target.id === 'edit-button') {
        const notesList = e.composedPath()[3].children[1].children[1]
        notes.forEach((noteEdit, index) => {
            if (editId[0] === notesList.children[index].id) {
                //document.querySelectorAll('input[name="category"]').forEach(item => console.log(item))
                //когда изменяешь значения инпута радио новое значение записать в обьект
                noteEdit.name = document.getElementById('name').value
                noteEdit.content = document.getElementById('message').value
                noteEdit.dates = document.getElementById('date').value

            }
        })
        editId.splice(0, 1)
        document.getElementById('notes-list').innerHTML = ''
        createNoteTable(notes)
        document.getElementById('popup').classList.remove('active')
        document.getElementById('popup-bg').classList.remove('active')
    }

})


export function createNoteTable(tableNotes) {
    tableNotes.map(obj => {
        const component = `<tr id=${obj.id}>${Object.values(obj)
            .map((item, id) => `<td id=${id}>${item}</td>`).join('')}</tr>`
        document.querySelector('tbody#notes-list').insertAdjacentHTML('beforeend', component)
    })

    const buttonGroup = `
    <span id="edit" class="material-symbols-rounded">edit</span>
    <span id="archive" class="material-symbols-rounded">archive</span>
    <span id="clean" class="material-symbols-rounded">delete</span>
    `
    document.querySelectorAll('tbody#notes-list tr td:last-child')
        .forEach(button => button.insertAdjacentHTML('beforeend', buttonGroup))
    document.querySelectorAll('tbody#notes-list tr td:nth-child(4)').forEach(category => {
        if (category.textContent === 'Task') {
            archivesCount[0].active += 1
            category.parentElement.firstChild.innerHTML =
                `<span class="material-symbols-outlined">checklist</span>`
        } else if (category.textContent === 'Random Thought') {
            archivesCount[1].active += 1
            category.parentElement.firstChild.innerHTML =
                `<span class="material-symbols-outlined">psychology_alt</span>`
        } else {
            archivesCount[2].active += 1
            category.parentElement.firstChild.innerHTML =
                `<span class="material-symbols-outlined">emoji_objects</span>`
        }
    })
}

