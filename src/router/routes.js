const { render } = require('ejs');
const Cake = require('../../models/cake');
const Vote = require('../../models/vote');
const fs = require('fs');

module.exports = function(app){

    app.get('/', (req, res) => {
        Cake.find().then((result) => {
            res.render('index', { cakes : result});
        }).catch((error) => console.log(error)); 
    });

    app.get('/cakes', (req, res) => {
        res.render('cakes');
    });

    app.post('/cakes', (req, res) => {
        const { baker, name } = req.body;
        const cake = new Cake({ baker, name });
        cake.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((error) => {console.log(error)});
    });

    app.get('/vote/:id', (req, res) => {
        Cake.findById(req.params.id)
        .then((result) => {
            res.render('vote', { cake : result });
        })
        .catch((error) => console.log(error));
    });

    app.post('/vote/:id', setCookie, saveVote, (req, res, next) => {
        res.redirect('/');
    });

    function saveVote(req, res, next) {
        if (!req.headers.cookie) 
            return;

        const cookies = req.headers.cookie.split('=');
        if (!cookies)
            return;

        let login;
        cookies.forEach((cookie, index) => {
            if (cookie === 'login') {
                login = cookies[index + 1];
            }
        });

        const voteObj = {
            userId : login,
            cakeId : req.params.id,
            taste : req.body.taste,
            look : req.body.look,
            feel : req.body.feel
        };

        const vote = new Vote( voteObj );
        vote.save()
        .then((result) => {
            //res.redirect('/');
            next();
        })
        .catch((error) => {console.log(error); next()});
        console.log(login);
    }

    function setCookie(req, res, next) {
        // read cookies
        var cookie = req.headers.cookie;
        if (cookie === undefined)  {
               // no: set a new cookie
            var randomNumber=Math.random().toString();
            randomNumber=randomNumber.substring(2,randomNumber.length);
            let options = {
                maxAge: 1000 * 60 * 60 * 24 * 30, // would expire after 15 minutes
                httpOnly: true, // The cookie only accessible by the web server
                signed: true // Indicates if the cookie should be signed
                
            }
            // Set cookie
            res.cookie('login', randomNumber, options) // options is optional
            //console.log(randomNumber);
        }
        else {
            // yes, cookie was already present 
            //console.log('cookie exists', cookie);
        } 
        //res.redirect('/');
        next();
    }
    app.get('/del/:id', (req, res, next) => {
        Cake.findByIdAndDelete(req.params.id).then((result) => {
            res.redirect('/');
        }).catch((error) => console.log(error)); 
    });

    app.get('/results', (req, res, next) => {
        Cake.find()
        .then((results) => { 
            let cakes = results;
            Vote.find()
            .then((result) => {
                res.render('results', 
                { 
                    cakes,
                    votes : result 
                });
            })
            .catch((error) => console.log(error));

        })
        .catch((error) => console.log(error));

    });
}