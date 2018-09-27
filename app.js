const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");

const titleObject = {
    describe: 'Title of note',
    demand: true,
    alias:'t',
}

const bodyObject = {
    describe: 'Body of the note',
    demand: true,
    alias:'b',
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleObject,
        body: bodyObject,
    })
    .command('list', 'List all the notes')
    .command('read', 'Read a note', {
        title: titleObject,
    })
    .command('remove', 'Remove a note', {
        title: titleObject,
    })
    .help()
    .argv;
var command = argv._[0];

if (command === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    if (note === undefined){
        console.log('Note title already in use!!');
    }else{
        console.log('Note created');
        notes.logNote(note);
    }
} else if (command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => {
        notes.logNote(note);
    });
} else if (command === 'read'){
    console.log('Reading a note');
    var note = notes.readNote(argv.title);
    if (note != undefined){
        console.log('Note Found');
        notes.logNote(note);
    } else {
        console.log('The given note was not found!!');
    }
} else if (command === 'remove'){
    console.log('Removing a note');
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note Removed' : 'Note not Found!';
    console.log(message);
    
    /*if(notes.removeNote(argv.title) == true){
        console.log('note removed!');
    }else{
        console.log('Note not present');
    }*/

} else {
    console.log('Command not recognized!');
}