import { model, Schema } from "mongoose";

const jobDataSchema = new Schema(
  {
    cities: [{ type: String }],
    zips: [{ type: String }],
    counties: [{ type: String }],
    positions: [{ type: String }],
    industries: [{ type: String }],
  },
  { timestamps: true } 
);

module.exports = model("JobData", jobDataSchema);