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

app.use('/api', function(req, res, next){
    res.set('Accept' , 'application/json');
    next()
})
app.use(function(req, res, next){
    // let contype = req.headers["content-type"]?req.headers["content-type"]:"text/html"
 
    // if (contype !== 'application/json' && contype !== 'application/x-www-form-urlencoded' && contype !== 'text/html'){
    //     res.status(400).send('unsupported')
    // }        
    // else
    //     next() 
    if(req.accepts('json')){
        next()
    }else{
        res.send(400)
    }
})


app.use('/api/films', filmRouter)

app.get('/', function(req, res){
    res.send('Welcome to my filmapi');
})

app.listen(port, function(){
    console.log('We are running on Port: ' + port);
})






