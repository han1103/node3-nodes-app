const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    description: 'Add a new note',
    builder: {
        title: {
            description: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            description: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    description: 'Remove a node',
    builder: {
        title: {
            description: 'title of the note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    description: 'List all notes',
    handler() {
        notes.listNodes()
    }
})

yargs.command({
    command: 'read',
    description: 'Read a node',
    handler(argv) {
        notes.getNotes(argv.title)
    }
})

yargs.parse()
// console.log(yargs.argv)