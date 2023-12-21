
//require mongoose for exercise model
const mongoose = require('mongoose')

//declare and define mongoose schema
const Schema = mongoose.Schema;

//declare and define exercise schema
const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true,
})

//export exercise
const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;