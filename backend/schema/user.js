import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    employee: {
        first: String,
        last: String,
    },
    admin: {
        username: String = 'admin',
        password: String = 'laks123@$'
    }

});

const User = mongoose.model('User', userSchema);

module.exports = User;