const fs = require('fs');

var fetchNotes = function (){
    try{
        var noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    }catch (e) {
        return [];
    }
};

var saveNotes = function (notes){
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = function(title, body){
    var notes = fetchNotes();
    var note = {
        title: title,
        body: body,
    };

    var duplicateNotes = notes.filter (function (note) {
        return note.title === title;
    });

    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = function(){
    return fetchNotes();
};

var readNote = function(title){
    notes = fetchNotes();
    var noteFound = notes.filter(function (note){
        return note.title === title;
    });
    console.log('noteFound : ', noteFound);
    return noteFound[0];
};

var removeNote = function(title){
    var notes = fetchNotes();
    var notetoRemove = notes.filter((note) => note.title != title);
    
    /*var note = {
        title: title,
    }
    var notetoRemove = notes.filter(function (note) {
        return note.title != title;
    });*/
    saveNotes(notetoRemove);
   return notes.length != notetoRemove.length;
};

var logNote = function(note){
    console.log('----');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote: addNote,
    getAll: getAll,
    readNote: readNote,
    removeNote: removeNote,
    logNote: logNote,
};