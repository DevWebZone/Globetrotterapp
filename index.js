const express = require('express');
const cookieParser = require('cookie-parser');

const fetchData = require('./config/fetchData');

const db = require('./config/mongoose');
const app = express();
const port = 8000;

// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    fetchData.getDestinationData();
    console.log(`Server is running on port: ${port}`);
});
