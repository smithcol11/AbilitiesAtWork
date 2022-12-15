const mongoose = require("mongoose");

const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        //first name
        username: { type: String, required: true, minlength: 1 },

        //last name
        hash: { type: String, required: true },
        salt: { type: String, required: true }, 
    }
);

userSchema.plugin(passportLocalMongoose)
const Employee = mongoose.model('Employee', userSchema);

module.exports = Employee;