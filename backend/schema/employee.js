const mongoose = require("mongoose");

const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        first: { type: String, required: true, minlength: 1 },
        last: { type: String, required: true, minlength: 1 },
    }
);

userSchema.plugin(passportLocalMongoose)
const Employee = mongoose.model('Employee', userSchema);

module.exports = Employee;