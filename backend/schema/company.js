import mongoose from 'mongoose';
const { Schema } = mongoose;

const companySchema = new Schema({
    companyID: Schema.Types.ObjectId,
    companyName: String, 
    address: String,
    contactName: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    phone: {
        type: Number,
        trim: true,
        required: true,
    }, 
    other: String,
    jobs: [{type: Schema.Types.ObjectId, ref: 'job' }]
});

let Company  = mongoose.model('Company', companySchema); 
module.exports = Company;
