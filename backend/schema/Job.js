const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    job_id: String,
    required: true,

    posted_by: String,
    
    posted_on: Date,
    required: true,
    
    detail: {
        job_category: String,
        job_type: ["Full-Time", "Part-Time"],   // this was originally worded "Hours per W" from the schema document
        shift_schedule: ["8-hour shift", "Day shift", "Morning shift", "Weekend availability", "Monday to Friday"],
        pay: Number,
        benefits: String,
        notes: String                           //description
    },

    county: String,
    city: String                                //added field 
})
