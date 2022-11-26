import mongoose from 'mongoose';
const { Schema } = mongoose;


let company  = mongoose.model('company', companySchema);
let job  = mongoose.model('job', jobSchema);

const companySchema = new Schema({
    companyID: Schema.Types.ObjectId,
    companyName: String, 
    Address: String,
    contactInfo:[{
        contactName: String,
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        phone: {
            type: String,
            required: 'Bussiness phone number is required',
            match: [/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/, 'Please fill a valid phone number'],
            /*this regex works for the formats (123) 456-7890 or 123-456-7890*/
        }, 
        other: String,
    }],
    jobList: [{type: Schema.Types.ObjectId, ref: 'job' }]
});



