import { model, Schema } from "mongoose";

const companySchema = new Schema({
  companyName: String,
  address: String,
  postedBy: { type: String, required: true },
  postedOn: { type: Date, required: true },
  editedBy: { type: String, required: true },
  editedOn: { type: Date, required: true },
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
  jobs: [{ type: Schema.Types.ObjectId, ref: "job" }],
});

module.exports = model("Company", companySchema);