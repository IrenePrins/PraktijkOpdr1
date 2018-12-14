let express = require('express');

let routes = function(Film){
    let filmRouter = express.Router();

    let filmController = require('../Controllers/filmController.js')(Film);

    filmRouter.route('/films')
    .post(filmController.post)
    .get(filmController.get);

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

        res.json(req.film);
            
        
    })

    .put(filmController.put)
    
    .patch(filmController.patch)
    
    .delete(filmController.delete)

    return filmRouter;

};

module.exports = routes;