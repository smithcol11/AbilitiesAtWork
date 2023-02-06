import { model, Schema } from "mongoose";

const jobOptionsSchema = new Schema(
  {
    counties: [{ type: String }],
    cities: [{ type: String }],
    zips: [{ type: String }],
    positions: [{ type: String }],
    industries: [{ type: String }],
    shiftOptions: [{ type: String }],
    timeCommitmentOptions: [{ type: String }],
  },
  { timestamps: true } 
);

module.exports = model("JobOptions", jobOptionsSchema);