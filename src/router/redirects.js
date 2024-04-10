module.exports = function(app){
    app.get('/about-us', (req, res) => {
        res.redirect('/about');
    });

    //catch all - must go at the end of this
    app.use((req, res) => {
        res.status(404).send('<h1>URL no worky</h1>');
    });
}