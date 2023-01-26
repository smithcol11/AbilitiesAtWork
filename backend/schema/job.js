const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    //Document Information
    id: { type: String, required: true },
    postedBy: { type: String, required: true },
    postedOn: { type: Date, required: true },
    editedBy: { type: String, required: true },
    editedOn: { type: Date, required: true },

    //Contact Information
    contactName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhoneNumber: { type: String, required: true },

    //Buisness and Job Information
    businessName: { type: String, required: true },
    industry: { type: String, required: true },
    position: { type: String, required: true },
    shift: { type: String, required: true },
    hours: { type: String, required: true },
    pay : { type: Number},
    city: { type: String, required: true },
    zip: { type: String, required: true },
    date: { type: Date, required: true },
    address: { type: String, required: true },
    county: { type: String, required: true },
    notes: { type: String },
},
  { timestamps: true }
);

// creating a model
const Job = mongoose.model("Job", jobSchema); 

module.exports = Job;
