// Load required modules
var express = require('express'),
    app= express(),
    bodyParser = require('body-parser'), 
    router= express.Router(),
    port = process.env.PORT || 3000;


var Note = require('./database').models.note;
// Set process name
process.title = "node-restapi";

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use('/restapi', router);


router.use(function(req, res, next)  {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("Url : "+ req.url);
    console.log("Full Url : "+ fullUrl);
    next();
});

//Status codes: https://www.w3.org/Protocols/HTTP/HTRESP.html

//Get Working
router.get('/notes', function(req, res)  {
    console.log('NOTES GET');
    var note = new Note();
    Note.find(function(err, results){
        if (err) {
            res.status(400);
            res.json(err);
        }
        else{
            res.status(200);
            res.json(results);
        }
    });
});
//Post Working
router.post('/notes', function(req, res)  {
    console.log('NOTES POST');
    var note = new Note();
    note.title = req.body.title;
    note.content = req.body.content;
    note.owner = req.body.owner;
    note.save(function(err){
        if (err) {
            res.status(400);
            res.json(err);
        }
        else{
            res.status(201);
            res.json({message: "Created! => "+ note});
        }
        
    });
});

//Get /notes/:note_id Working
router.get('/notes/:note_id', function(req, res)  {
    console.log('NOTE ID GET');
    Note.findById(req.params.note_id, function (err, result) {
        if (err) {
            res.status(400);
            res.json(err);
        }
        else {
            res.status(200);
            res.json(result);
        }
    });
});

//Put /notes/:note_id  Working
router.put('/notes/:note_id', function(req, res) {
    console.log('PUT id');
    Note.findById(req.params.note_id, function (err, note)  {
        if (err) {
            res.status(400);
            res.json(err);
        }
        else{
            console.log(req.body);
            note.title = req.body.title;
            note.content = req.body.content;
            //note.owner =req.body.owner;
            note.save( function (err)  {
                if (err) {
                    res.send(err);
                }
                else{
                    res.status(200);
                    res.json({message: "updated " + note});
                }
            });
        }
    });
});


//delete /notes/note_id Working
router.delete('/notes/:note_id', function (req, res) {
    console.log('NOTE DELETE');
    Note.remove({
        _id : req.params.note_id
    },function(err, note){
        if (err) {
            res.status(400);
            res.send(err);
        }
        else{
            res.status(200);
            res.json({message: "Delete => " + req.params.note_id});
        }
    });
});


// listen for requests
app.listen(3000, function()  {
    console.log(" RESTful API server started on: " + port );
});