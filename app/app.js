const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const developRoute = require("../api/routes/developers");
const videoRoute = require('../api/routes/videogames');


//middleware for logging
app.use(morgan('dev'));

//middleware for parsing
app.use(express.urlencoded({
    extended: true
}));

//middleware to make all requests json
app.use(express.json());

//make sure server is responding
app.get('/', (req, res, next) => {
    res.status(200).json({message: 'Server is up'});
})


//Route from developers.js and videogames.js
app.use("/developer", developRoute);

app.use("/videogames", videoRoute);


//middleware to handle cors policy
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'Options'){
        res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, PATCH, DELETE');
    }
    next();
})


//middleware modules for error handling
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error)
});

//middleware to send error neatly 
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status,
        },
    });
});

//connect to mongoose
mongoose.connect(process.env.mongoDbUrl, (err) => {
    if(err){
        console.error('Error:', err.message);
    } else {
        console.log('Connected to mongo');
    }
});

module.exports = app;