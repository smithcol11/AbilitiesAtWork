//Client schema file.

import mongoose from 'mongoose';
const { Schema } = mongoose;

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
  First_Name: String,
  Last_Name: String,
  Address: String,
  Resume: String,     //How are resumes handled?
  Contact_Info: contactSchema,
  Preference: categorySchema, 
  SavedJobs: String,
  AppliedJobs: String //How are saved jobs handled?
});