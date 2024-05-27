//imported / required services/packages
const express = require('express');
const mongoose = require('mongoose');
const safe = require('./safe.js');
const cookieParser = require('cookie-parser');

mongoose.connect(safe).then(() => {
    //listen to requests (this is the app)
    app.listen(port, () => {
        console.log(`App started on port: http://localhost:${port}`);
    });
}).catch((err) => {
    console.log(err);
});

//server variables
const app = express();
const port = 3000;

//middleware
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));

//app settings
app.set('view engine', 'ejs');

//get requests coming in to the server
require('./src/router/routes')(app);
//redirects
require('./src/router/redirects')(app);
