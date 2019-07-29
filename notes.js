const fs = require('fs')
const chalk = require('chalk')

const getNotes = function(title) {
    const notes = loadNotes();
    const matchingNote = notes.find((note) => note.title===title )
    if(!matchingNote) {
        console.log(chalk.red('No note found for title:'+title))
    }
    else {
        console.log(chalk.bold.underline.italic('Title : ' + matchingNote.title))
        console.log(chalk('Body : ' + matchingNote.body))
    }
}

const listNodes = () => {
    console.log(chalk.bold.inverse.blue('Your notes'))
    const notes = loadNotes();

    notes.forEach((note) => {
        console.log(note.title)
    });
}

const addNotes = (title, body) => {
    const notes = loadNotes()

    //const dupNotes = notes.filter((note) => note.title === title)
    const dupNote = notes.find((note)=>note.title===title)

    debugger
    
    if (dupNote == null) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note added'))
    }
    else {
        console.log(chalk.red.inverse('Note title already exists'))
    }
}

const removeNote = (title) => {
    // const notes = loadNotes();
    // if (notes.length > 0)
    //     for (var i = notes.length-1; i>=0; i--) {
    //         if (notes[i].title === title) {
    //             notes.splice(i, 1)
    //             console.log('remove note @', i)
    //             break
    //         }
    //     }

    // saveNotes(notes)
    const notes = loadNotes();
    if (notes.length < 1) {
        //console.log('notes.json is empty')
        console.log(chalk.bgRed('No note found!'))
    }
    else {
        const resultNotes = notes.filter((note) => note.title!==title)
        if(resultNotes.length===notes.length) {
            console.log(chalk.bgRed('No note found!'))
        }
        else {
            console.log(chalk.bgGreen('Node removed!'))
        }
        saveNotes(resultNotes)
    }
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        return JSON.parse(dataBuffer.toString())
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    listNodes: listNodes
}
