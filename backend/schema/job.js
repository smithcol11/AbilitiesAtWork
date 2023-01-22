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

    // id: { type: String, required: true },
    // postedBy: { type: String, required: true },
    // postedOn: { type: Date, required: true },
    // editedBy: { type: String, required: true },
    // editedOn: { type: Date, required: true },

    // detail: {
    //   category: { type: String, required: true },
    //   type: { type: String, enum: ["Full-Time", "Part-Time"], required: true }, // this was originally worded "Hours per W" from the schema document
    //   shift: {
    //     // start times
    //     type: String,
    //     enum: [
    //       "Early", // early, before 9
    //       "Morning", // 9-12
    //       "Afternoon", // 12-5
    //       "Evening", // late, after 5
    //     ],
    //     required: true,
    //   },
    //   pay: { type: Number, required: true },
    //   benefits: { type: String },
    //   notes: { type: String }, //description
    // },
    // address: { type: String, required: true },
    // city: { type: String, required: true },
    // county: { type: String, required: true },
  },
  { timestamps: true }
);

// creating a model
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
