const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    job_id: { type: String, required: true },
    posted_by: { type: String, required: true },
    posted_on: { type: Date, required: true },

    detail: {
        job_category:   { type: String, required: true },
        job_type:       { type: ["Full-Time", "Part-Time"], required: true },  // this was originally worded "Hours per W" from the schema document
        shift_schedule: { type: ["8-hour shift", "Day shift", "Morning shift", "Weekend availability", "Monday to Friday"], required: true },
        pay:            { type: Number, required: true },
        benefits:       { type: String } ,
        notes:          { type: String }         //description
    },

    county: { type: String, required: true },
    city: { type: String, required: true },     //added field 
},
    { timestamps: true }
)

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
