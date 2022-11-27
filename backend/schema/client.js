//Client schema file.

import mongoose from 'mongoose';
const { Schema } = mongoose;

const editsSchema = new Schema({
    Created: Date,
    Edited: Date
})

const contactSchema = new Schema({
    Email: String,
    Phone: Integer,
    Other:   String
  });

  const categorySchema = new Schema({
    Job_Type: String,
    Hours_per_W: Integer,
    Shift_Schedule: String,
    Location: String,
    State: String,
    City: String
  });

const clientSchema = new Schema({
  User_ID: Integer,
  Initials: String,
  Resume: String,     //How are resumes handled?
  Preference: categorySchema, 
  SavedJobs: String,
  AppliedJobs: String, //How are saved jobs handled?
  Edits: editsSchema
});
