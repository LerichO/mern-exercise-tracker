
//require express.js router
const router = require('express').Router();

//require mongoose user model
let User = require('../models/user.model');

//route GET request from root
router.route('/').get((req, res) => {
    
    //.find() is a mongoose method that returns data from model from database
    User.find()
    .then(users => res.json(users))                         //return users as json
    .catch(err => res.status(400).json('Error: ' + err));   //catch error and respond with error msg
});

//route POST request from /add
router.route('/add').post((req, res) => {

    //create new user from username from request
    const username = req.body.username;
    const newUser = new User({"username": username});

    //save new user to database
    newUser.save()
    .then(() => res.json('User added!'))                    //respond with success msg
    .catch(err => res.status(400).json('Error: ' + err));   //catch error and respond with error msg
});

//export router
module.exports = router;