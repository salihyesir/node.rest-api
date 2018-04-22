var Mongoose 	= require('mongoose');
Mongoose.connect("mongodb://localhost/note");


Mongoose.connection.on('error', function(err) {
	if(err) throw err;
});

Mongoose.Promise = global.Promise;

module.exports = { Mongoose, 
	models: {
		note: require('./schemas/note.js')
	}
};