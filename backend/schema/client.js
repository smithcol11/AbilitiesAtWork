const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const clientSchema = new Schema(
  {
    initials: { type: String, required: true, minlength: 2 },
    industry: [{ type: String, required: true }],
    hours: {
      type: String,
      enum: ["Any", "Part-Time", "Full-Time"],
      default: "Any",
      required: true,
    },
    appliedJobs: [{ type: Schema.Types.ObjectId, ref: "job" }],
    enteredBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
  },
  { timestamps: true } // provides createdAt and updatedAt fields
);

module.exports = model("Client", clientSchema);
