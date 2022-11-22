import mongoose from 'mongoose';
mongoose.connect("http://localhost:3000")
const { Schema } = mongoose;

const CompanySchema = new Schema({
    Company_ID: Schema.Types.ObjectId,
    Company_Name: String, 
    Address: String,
    Contact_Info:[{
        Contact_Name: String,
        Email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        Phone: {
            type: String,
            required: 'Bussiness phone number is required',
            match: [/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/, 'Please fill a valid phone number'],
            /*this regex works for the formats (123) 456-7890 or 123-456-7890*/
        }, 
        Other: String,
    }],
    Job_List: [{type: Schema.Types.ObjectId, ref: 'Jobs' }]
});


var Company  = mongoose.model('Company', CompanySchema);
/*var Jobs  = mongoose.model('Jobs', JobSchema);*/

