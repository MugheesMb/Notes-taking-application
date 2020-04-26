const fs = require('fs')
const chalk = require('chalk')

const getNotes = () =>  'Your notes...'


const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const saveNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  () =>{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const notestokeep = notes.filter((note) => note.title !== title)
if(notes.length > notestokeep.length){
    console.log(chalk.green.inverse('Note removed.!'))
    saveNotes(notestokeep)
}
else{
    console.log(chalk.red.inverse('note not removed'))
}
}

const listNotes = () => {
    const notes = loadNotes()
    notes.forEach((note) => console.log(note.title) )
}
const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title ===title)
    if(note){
        console.log(chalk.red.inverse(note.title))
        console.log(note.body)
    }
    else{
        console.log("not found")
    }


  
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}