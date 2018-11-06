const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteID_Schema = new Schema({ 
    lastNote:String,
    note_name:String,
    note_id:String
});

const noteID = mongoose.model('noteId',noteID_Schema);

module.exports = noteID; 