var express = require('express'),
    mongoose = require('mongoose');
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/filmapi');

var Film = require('./models/filmModel');
var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var filmRouter = express.Router();


filmRouter.route('/films')
    .post(function(req, res){
        var film = new Film(req.body);

        console.log(film);
        res.send(film);

    })
    .get(function(req, res){
        var query = {};

        if(req.query.genre){
            query.genre = req.query.genre;
        }

        Film.find(query, function(err, films){
            if(err)
                res.status(500).send(err);
            else
                res.json(films)
            
        })
    });

filmRouter.route('/Films/:filmId')
    .get(function(req, res){

        Film.findById(req.params.filmId, function(err, films){
            if(err)
                res.status(500).send(err);
            else
                res.json(films)
            
        })
    });

app.use('/api', filmRouter);    

app.get('/', function(req, res){
    res.send('Welcome to my filmapi');
})

app.listen(port, function(){
    console.log('We are running on Port: ' + port);
})