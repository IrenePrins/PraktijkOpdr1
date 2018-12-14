let should = require('should');
             require('sinon');

describe('Film Controller Test: ', function(){
    describe('Post', function(){
        it('should not allow an empty title on post', function(){
            let Film = function(film){this.save(){}};

            let req = {
                body: {
                    regisseur: 'Irene'
                }
            }

            let res = {
                status: sinon.spy(),
                send: sinon.spy()
            }
            
            let filmController = require('../Controllers/filmController')(Film);
            filmController.post(req, res);
            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('title is required').should.equal(true);
            
        });
    })
})