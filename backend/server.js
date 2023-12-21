
//require modules for server
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//configures env variables into .env files
require('dotenv').config();

//create express application
const app = express();

//assign express application to port 5000
const port = process.env.PORT || 5000;

//cors "middleware"
app.use(cors());

//enables json parsing
app.use(express.json());

/****************************************************************
 * MongoDB import/initialization stuff
 */
//get databse URI
const uri = process.env.ATLAS_URI;

//connect to MongoDB database through URI
//Do not include userNewUrlParser and useCreateIndex flags, they are deprecated since the tutorial altogether
mongoose.connect(uri);

//begin connection to MongoDB database
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongDB databse connection established successfully");
})

//requiring exercise and user routing javascript scripts
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//route to operations in router scripts
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//start express application
app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
})