import { model, Schema } from "mongoose";

const jobSchema = new Schema(
  {
    openingDate: { type: Date, default: Date.now, required: true },
    enteredBy: { type: String, required: true },
    updatedBy: { type: String, required: true },

    detail: {
      employer: { type: String, trim: true, required: true },  
      industry: { type: String, trim: true, required: true },
      position: { type: String, trim: true, required: true },  
      timeCommitment: {
        type: String,
        enum: ["Full-Time", "Part-Time"],
        required: true,
      },
      shift: {
        // start times
        type: String,
        enum: [
          "Early", // early, before 9
          "Morning", // 9-12
          "Afternoon", // 12-5
          "Evening", // late, after 5
        ],
        required: true,
      },
      hourlyWage: { type: Number, min: 0 },
      benefits: String,
      notes: String,
    },

    address: { type: String, required: true },
    zip: { type: String, required: true },
    city: { type: String, required: true },
    county: { type: String, required: true },

    contact: {
      email: { type: String, trim: true, lowercase: true, required: true },
      name: { type: String, trim: true, required: true },
      phone: { type: Number, integer: true, required: true },
    },
  },
  { timestamps: true } // provides createdAt and updatedAt fields
);

module.exports = model("Job", jobSchema);

/*const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    id: { type: String, required: true },
    postedBy: { type: String, required: true },
    postedOn: { type: Date, required: true },
    editedBy: { type: String, required: true },
    editedOn: { type: Date, required: true },

    detail: {
      category: { type: String, required: true },
      type: { type: String, enum: ["Full-Time", "Part-Time"], required: true }, // this was originally worded "Hours per W" from the schema document
      shift: {
        // start times
        type: String, 
        enum: [
          "Early", // early, before 9
          "Morning", // 9-12
          "Afternoon", // 12-5
          "Evening", // late, after 5
        ],
        required: true,
      },
      pay: { type: Number, required: true },
      benefits: { type: String },
      notes: { type: String }, //description
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    county: { type: String, required: true },
  },
  { timestamps: true }
);

// creating a model
const Job = mongoose.model("Job", jobSchema); 

module.exports = Job;
*/