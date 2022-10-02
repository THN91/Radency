import {archives} from "./state.js";


export function createArchiveTable() {
    archives.map((obj, id) => {
        // console.log(obj)
        // const component = `<tr id=${id}>${Object.values(obj)
        //     .map((item, id) => `<td id=${id}>${item}</td>`).join('')}</tr>`
        // document.querySelector('tbody#notes-list').insertAdjacentHTML('beforeend', component)
    })
}
