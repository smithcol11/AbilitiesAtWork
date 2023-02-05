const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    contactName: { type: String, required: true },
    businessName: { type: String, required: true },
    industry: { type: String, required: true },
    position: { type: String, required: true },
    shift: { type: String, required: true },
    hours: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    date: { type: Date, required: true },
    address: { type: String, required: true },
    county: { type: String, required: true },
    notes: { type: String },
    contactEmail: { type: String, required: true },
    contactPhoneNumber: { type: String, required: true },
  },
  { timestamps: true }
);

// creating a model
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
