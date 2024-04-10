//imported / required services/packages
const express = require('express');

//server variables
const app = express();
const port = 3000;

//app settings
app.set('view engine', 'ejs');

//get requests coming in to the server
require('./src/router/routes')(app);
//redirects
require('./src/router/redirects')(app);

//listen to requests (this is the app)
app.listen(port, () => {
    console.log(`App started on port: ${port}`);
});