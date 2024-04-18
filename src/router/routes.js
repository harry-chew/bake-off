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
    });
}