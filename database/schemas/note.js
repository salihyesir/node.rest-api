var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    owner: { type: String },
    date: {type: String, default: "Zaman"}
});

module.exports = mongoose.model('note', NoteSchema);