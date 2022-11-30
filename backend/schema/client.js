//Client schema file.

import mongoose from 'mongoose';
const { Schema } = mongoose;

const clientSchema = new Schema({
  userID: {type: Integer, required: true},
  initials: {type: String, required: true, minlength: 2},
  preference: {
    industry: {type: [String], required: true},
    hours: {type: String, enum: ['Any', 'Part-Time', 'Full-Time'], default: 'Any', required: true}
  }, 
  savedJobs: String,
  appliedJobs: String, //How are saved jobs handled?
  postedBy: { type: String, required: true },
  postedOn: {type: Date, default: Date.now, required: true},
  editedBy: { type: String, required: true },
  editedOn: {type: Date, default: Date.now},

});

const Client = mongoose.model(
  "Client",
  clientSchema
  );
modeule.exports = Client;