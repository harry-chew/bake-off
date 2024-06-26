const Cake = require('../../models/cake');
const Vote = require('../../models/vote');

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
        var randomNumber=Math.random().toString();
        randomNumber=randomNumber.substring(2, randomNumber.length);

        let month = 1000 * 60 * 60 * 24 * 30;
        const options = {
            maxAge : month,
            httpOnly : true
        };
        let cookie = req.cookies['login'];
        if (!cookie || cookie == undefined)
            res.cookie('login', randomNumber, options);

        //console.log(req.cookies['login']);

        saveVote(req);

        res.redirect('/');
    });

    function saveVote(req, res, next) {
        let login = req.cookies['login'];
        if (!login)
            return;
        
        const voteObj = {
            userId : login,
            cakeId : req.params.id,
            taste : req.body.taste,
            look : req.body.look,
            feel : req.body.feel
        };

        console.log(voteObj);

        const vote = new Vote( voteObj );
        vote.save()
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {console.log(error);});
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