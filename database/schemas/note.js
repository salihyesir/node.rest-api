var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
    title: { type: String, default: "Nodejs" },
    content: { type: String, default: "RestAPI" },
    owner: { type: String , default: "Salih YESIR"},
    date: {type: String, default: "Zaman"}
});

module.exports = mongoose.model('note', NoteSchema);