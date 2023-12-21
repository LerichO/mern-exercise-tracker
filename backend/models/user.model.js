
//require mongoose for user model
const mongoose = require('mongoose')

//declare and define mongoose schema
const Schema = mongoose.Schema;

//declare and define user schema - conditions for user's name
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
})

//export user
const User = mongoose.model('User', userSchema);
module.exports = User;