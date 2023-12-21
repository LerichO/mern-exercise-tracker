
//require express.js router
const router = require('express').Router();

//require mongoose exercise model
let Exercise = require('../models/exercise.model');

//route GET request from root
router.route('/').get((req, res) => {
    
    //.find() is a mongoose method that returns data from model from database
    Exercise.find()
    .then(exercises => res.json(exercises))                 //returns exercises as json
    .catch(err => res.status(400).json('Error: ' + err));   //catch error and respond with error msg
});

//route POST request from /add
router.route('/add').post((req, res) => {

    //get data from request body
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    //create new exercise from from request data
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    //save new exercise to database
    newExercise.save()
    .then(() => res.json('Exercise added!'))                //respond with success msg
    .catch(err => res.status(400).json('Error: ' + err));   //catch error and respond with error msg 

});

//route GET request for exercise by ID
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

//route DELETE request for exercise by ID
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//route UPDATE request for exercise by ID
router.route('/update/:id').post((req, res) => {

    Exercise.findById(req.params.id).then(exercise => {

        //get exercise data from request
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        //save new exercise data
        exercise.save()
        .then(exercise => res.json('Exercise updated.'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));   
});

//export router
module.exports = router;