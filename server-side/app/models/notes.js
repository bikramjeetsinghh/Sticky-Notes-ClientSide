const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    id: { type: String, required: true, default: () => mongoose.Types.ObjectId().toHexString() },
    title: { type: String,  default: '' },
    description: { type: String, default: '' },
    titleColor: {type: String, default: ''},
    dateTime: {type: String, default: new Date()},
    descriptionColor: {type: String, default: ''},
    isDeleted: { type: Boolean, default: false },
}, { collection: 'Notes' });

const NotesModel = mongoose.model('Notes', notesSchema);
module.exports = NotesModel;