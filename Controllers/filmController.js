let filmController = function(Film){

    let post = function(req, res){

        // let contype = req.headers['content-type'];
        // let film = new Film(req.body);
        // if (!contype || contype.indexOf('application/json') !== 0)
        //     return res.status(400).send("Unsupported Format");
        // else
        //     film.save();
        //     res.status(201).send(film);
        if(!req.body.title || !req.body.genre || !req.body.regisseur){
            res.status(400).send('Title, genre and regisseur need to be filled in')
        }else{
            let film = new Film(req.body);
            film.save();
            res.status(201).send(film);
        }
        

    }

    let get = function(req, res){
        Film.find()
        .exec()
        .then(films => {
        const response = {
          items: films.map(film => {
            return {
              title: film.title,
              regisseur: film.regisseur,
              genre: film.genre,
              _id: film._id,
              _links: {
                self: {
                    href: `http://${req.headers.host}/api/films/` + film._id
                },
                collection:{
                    href: `http://${req.headers.host}/api/films`
                }               
              }
            };
          }),
          _links: {
            self: {
                href: `http://${req.headers.host}/api/films`
            }
          },
          pagination: {
            bloat: "Bloat Bloat Bloat Bloat"
          }
        };
          if (films.length >= 0) {
        res.status(200).json(response);
          } else {
              res.status(404).json({
                  message: 'No entries found'
              });
          }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
        // Film.find(function(err, films){
        //     const results ={
        //         items: films.map(film =>{
        //             return{
        //                 _id : film._id,
        //                 title : film.title,
        //                 regisseur : film.regisseur,
        //                 genre : film.genre,
        //                 _links: {
        //                     self: {
        //                         href: `http://{req.headers.host}/api/films` + film._id
        //                     },
        //                     collection: {
        //                         href: `http://{req.headers.host}/api/films`
        //                     }
        //                 }
        //             }
        //         }),
        //         _links: {
        //             self: {
        //                 href: `http://{req.headers.host}/api/films`
        //             }
        //         },
        //         pagination: {
        //             hoi : 'Hoi Hoi Hoi'
        //         }
        //     }
        //     res.status(200).json(results)
        // }
        // )
    }

    let put = function(req, res){
        Film.findById(req.params.filmId, function(err, film){
            if(!req.body.title || !req.body.genre || !req.body.regisseur){
                 res.status(400).send('all fields need to be filled in');   
            } 
            else{
                film.title = req.body.title;
                film.regisseur = req.body.regisseur;
                film.genre = req.body.genre;
                film.save(function(err){
                    if(err){
                        res.status(500)
                    }else{
                        res.json(film); 
                    }
                })
               
            }
            
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

    // let remove = function(req, res){
    //     req.film.remove(function(err){
    //         if(err){
    //             res.status(500).send(err);
    //         } else{
    //             res.status(204).send('Removed');
    //         }
    //     });
    // }

    let remove = function(req, res){
        Film.findByIdAndDelete({_id: req.params.filmId})
            .then(film => {
                res.status(204)
                res.json(film)
            }).catch(err =>{
                res.status(500).json(err)
            })
    }

    let options = function(req, res){
        res.header('Allow', 'GET, POST, OPTIONS')
        res.set('Accept', 'application/json')
        res.send(200)
    }

    let optionsDetail = function(req, res){
        res.header('Allow', 'GET, PUT, PATCH, DELETE, OPTIONS')
        res.send(200);
    }

   

    // function currentItems(total, start, limit){
    //     console.log(total);
    // }

    

    return {
        post: post,
        get: get,
        put: put,
        patch: patch,
        delete: remove,
        options: options,
        optionsDetail: optionsDetail
    }
}

module.exports = filmController;