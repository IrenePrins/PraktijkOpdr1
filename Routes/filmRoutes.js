let express = require('express');

let routes = function(Film){
    let filmRouter = express.Router();

    let filmController = require('../Controllers/filmController.js')(Film);
    //let paginationController = require('../Controllers/paginationController.js')(Film);

    filmRouter.route('/films')
    .post(filmController.post)
    .get(filmController.get)
    //.get(paginationController.currentItems)

filmRouter.use('/films/:filmId', function(req, res, next){
    Film.findById(req.params.filmId, function(err, film){
        if(err)
            res.status(500).send(err);
        else if(film){
            req.film = film;
            next();
        }
        else{
            res.status(404).send('no films found');
        }
        
    })
})



filmRouter.route('/films/:filmId')
    .get(function(req, res){

        let returnFilm = req.film.toJSON();

        returnFilm.links = {};
        let newLink = 'http://' + req.headers.host + '/api/films/?genre=' + returnFilm.genre;
        returnFilm.links.collection = 'http://' + req.headers.host + '/api/films/';
        returnFilm.links.FilterByThisGenre = newLink.replace(' ', '%20');
        res.json(returnFilm);
        
    })

    .put(filmController.put)
    
    .patch(filmController.patch)
    
    .delete(filmController.delete)

    return filmRouter;



};

module.exports = routes;