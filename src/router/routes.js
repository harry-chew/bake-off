module.exports = function(app){

    app.get('/', (req, res) => {
        res.render('index');
    });
    
    app.get('/about', (req, res) => {
        res.render('about');
    });
    
    app.get('/results', (req, res) => {
        res.render('results');
    });

    app.get('/admin', (req, res) => {
        //probably need to auth here
        res.render('admin');
    });
}