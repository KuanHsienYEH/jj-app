import mongoose, { Schema, Document } from "mongoose";

interface IJob extends Document {
  jobTitle: string;
  location: string;
  salary: string;
  requirement: string;
  benefit: string;
  jobDetail: string;
  jobType: string;
  createDate: Date;
  education: string;
  seniority: string;
}

const jobSchema: Schema = new Schema({
  jobTitle: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  requirement: { type: String, required: true },
  benefit: { type: String, required: false },
  jobDetail: { type: String, required: true },
  jobType: { type: String, required: true },
  createDate: { type: Date, required: true },
  education: { type: String, required: true },
  seniority: { type: String, required: true },
});

export default mongoose.models.Job || mongoose.model<IJob>("Job", jobSchema);