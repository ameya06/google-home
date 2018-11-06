var NoteID = require('../models/note_Id')


var saveNoteId = async (name, id) => {
    return NoteID.findOne({
        lastNote: "Last Note ID"
    }).then((currentServer) => {
        if (currentServer) {
            NoteID.updateOne({
                lastNote: "Last Note ID",
                $set: {
                    note_name: name,
                    note_id: id
                }
            }).then((updateNoteID) => {
                console.log('Node Id updated' + updateNoteID)
                return null
            }).catch((err) => {
                console.log('Error while updating auth =====> ' + err)
                return null
            })

        } else {
            new NoteID({
                lastNote: "Last Note ID",
                note_name: name,
                note_id: id
            }).save().then((newid) => {
                console.log('new auth created'+newid)
                return null
            }).catch((err) => {
                console.log('Error while saving =====>' + err)
                return null
            })
        }
    })
}


var getNoteID = async()=>{
    return NoteID.findOne({
        lastNote: "Last Note ID"
    }).then((currentNote) => {
        console.log(currentNote.note_id)
        return currentNote.note_id
    }).catch((err) => {
        console.log("Issue in catch" + err)
        return null
    })
}



exports.getNoteID = getNoteID
exports.saveNoteId = saveNoteId