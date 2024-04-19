const { render } = require('ejs');
const Cake = require('../../models/cake');
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

    app.post('/vote/:id', (req, res, next) => {
        console.log(req.params.id, req.cookies);
        setCookie(req, res, next);
        res.redirect('/');
    });


    function setCookie(req, res, next) {
        // read cookies
        var cookie = req.cookies.cookieName;
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
            console.log('cookie created successfully');
        }
        else {
            // yes, cookie was already present 
            console.log('cookie exists', cookie);
        } 
        next(); 
    }
}