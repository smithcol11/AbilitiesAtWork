import mongoose from 'mongoose';
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true, minlength: 1 },
        hash: { type: String, required: true },
        salt: { type: String, required: true }, 
    },
);

userSchema.plugin(passportLocalMongoose)
const Admin = mongoose.model('Admin', userSchema);

module.exports = Admin;