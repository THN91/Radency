import {createNoteTable} from "./notes.js";
import {archives, notes} from "./state.js";

export let changeTable = true
const toggleBtn = document.getElementById('switch')
const tableName = document.querySelector('.header p')

toggleBtn.addEventListener('click', function (e) {
    changeTable = !changeTable
    changeTable === true ? e.target.innerText = 'Notes' : e.target.innerText = 'Archives'
    changeTable === true ? tableName.innerText = 'Notes' :tableName.innerText = 'Archives'
    document.getElementById('notes-list').innerHTML = ''
    changeTable === true ? createNoteTable(notes) : createNoteTable(archives)
})
