"use strict";

// Basic express setup and installation of SASS and bodyParser

const PORT          = 8080;
const sassMiddleware = require('node-sass-middleware');
const express       = require("express");
const bodyParser    = require("body-parser");
const path          = require('path');
const app           = express();

app.use(
  sassMiddleware({
    src: __dirname +  '/scss',
    dest: __dirname + '/public/styles',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/styles'
  })
);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb://localhost:27017/tweeter';


// Set-up of Mongodb, which is the main data storrage for this project

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  const DataHelpers = require('./lib/data-helpers.js')(db);
  const tweetsRoutes = require('./routes/tweets')(DataHelpers);
  app.use('/tweets', tweetsRoutes);
});



app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
