let express = require('express'),
    mongoose = require('mongoose');
    bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://localhost/filmapi');

let Film = require('./models/filmModel');
let app = express();

let port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

filmRouter = require('./Routes/filmRoutes')(Film);

app.use('/api', filmRouter);    

app.get('/', function(req, res){
    res.send('Welcome to my filmapi');
})

app.listen(port, function(){
    console.log('We are running on Port: ' + port);
})

function currentItems(total, start, limit){
    Film.find(query, function(err, film){
        if(err)
            res.status(500).send(err);
        else
            res.json(film)
        
    })
}