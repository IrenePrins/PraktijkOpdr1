let express = require('express');

let routes = function(Film){
    let filmRouter = express.Router();

    let filmController = require('../Controllers/filmController.js')(Film);
    //let paginationController = require('../Controllers/paginationController.js')(Film);

    filmRouter.route('/')
    .options(filmController.options)
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
    });
    
})

filmRouter.route('/:filmId')
    .get(function(req, res){
        id = req.params.filmId;
        Film.findById(id)
            .exec()
            .then(film =>{
                if(film) {
                    film = film.toJSON()
                    film._links = {
                        self: {
                            href: `http://${req.headers.host}/api/films/` + film._id
                        },
                        collection:{
                            href: `http://${req.headers.host}/api/films`
                        }
                    }
                    res.status(200).json(film)
                } else{
                    res.status(404).json({ message: "Geen id gevonden" })
                }
            })
            .catch(err => {
                res.status(500).json({ error: err})
            })
    })

    .put(filmController.put)
    
    .patch(filmController.patch)
    
    .delete(filmController.delete)
    .options(filmController.optionsDetail)

    return filmRouter;

};

module.exports = routes;