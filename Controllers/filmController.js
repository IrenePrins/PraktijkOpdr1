let filmController = function(Film){

    let post = function(req, res){
        let film = new Film(req.body);

        film.save();
        res.status(201).send(film);

    }

    let get = function(req, res){
        let query = {};

        if(req.query.genre){
            query.genre = req.query.genre;
        }

        Film.find(query, function(err, film){
            if(err)
                res.status(500).send(err);
            else
                res.json(film)

        })
    }

    let put = function(req, res){
        Film.findById(req.params.filmId, function(err, film){
            if(err)
                res.status(500).send(err);
            else
                req.film.title = req.body.title;
                req.film.regisseur = req.body.regisseur;
                req.film.genre = req.body.genre;
                req.film.seen = req.body.seen;
                film.save(function(err){
                    if(err)
                        res.status(500).send(err);
                    else{
                        res.json(req.film)
                    }});
                res.json(req.film);    
            
        })
    }

    let patch = function(req, res){
        if(req.body.title){
            delete req.body._id;
        }

        for (let p in req.body) {
            req.film[p] = req.body[p];
        }

        req.film.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.json(req.film)
            }
        });
        
    }

    let remove = function(req, res){
        req.film.remove(function(err){
            if(err){
                res.status(500).send(err);
            } else{
                res.status(204).send('Removed');
            }
        });
    }

    return {
        post: post,
        get: get,
        put: put,
        patch: patch,
        delete: remove
    }
}

module.exports = filmController;