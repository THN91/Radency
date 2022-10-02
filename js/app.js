import {createNoteTable} from "./notes.js";
import {createArchiveTable} from "./archives.js";
import {notes} from "./state.js";
import {changeTable} from "./helpers.js"


createNoteTable(notes)
createArchiveTable()

