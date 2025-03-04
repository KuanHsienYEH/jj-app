import Job from "../models/Job";
import { ApiResponse } from "../types/api";

export async function getJobs(number?: string): Promise<ApiResponse> {
  try {
    let query = Job.find().sort({ createDate: -1 });
    if (number) {
      const num = parseInt(number);
      if (isNaN(num)) return { status: "error", message: "Invalid number parameter" };
      query = query.limit(num);
    }
    const jobs = await query.exec();
    return { status: "ok", data: jobs };
  } catch (error) {
    console.error("Error in getJobs:", error);
    return { status: "error", message: "Failed to fetch jobs" };
  }
}

export async function getJob(id: string): Promise<ApiResponse> {
  if (!id) return { status: "error", message: "Job ID is required" };
  const job = await Job.findById(id);
  if (job) return { status: "ok", data: job };
  return { status: "error", message: "Job not found" };
}

export async function addJob(data: {
  jobTitle: string;
  location: string;
  salary: string;
  requirement: string;
  benefit: string;
  jobDetail: string;
  jobType: string;
  createDate: string;
  education: string;
  seniority: string;
}): Promise<ApiResponse> {
  await Job.create({ ...data, createDate: new Date(data.createDate) });
  return { status: "ok", data: { res: "ok" } };
}

export async function updateJob(data: {
  _id: string;
  jobTitle: string;
  location: string;
  salary: string;
  requirement: string;
  benefit: string;
  jobDetail: string;
  jobType: string;
  createDate: string;
  education: string;
  seniority: string;
}): Promise<ApiResponse> {
  const result = await Job.updateOne(
    { _id: data._id },
    { $set: { ...data, createDate: new Date(data.createDate) } }
  );
  if (result.modifiedCount > 0) return { status: "ok", data: { res: "ok" } };
  return { status: "error", message: "Job not found" };
}

export async function deleteJob(id: string): Promise<ApiResponse> {
  if (!id) return { status: "error", message: "Job ID is required" };
  const result = await Job.deleteOne({ _id: id });
  if (result.deletedCount > 0) return { status: "ok", data: { res: "ok" } };
  return { status: "error", message: "Job not found" };
}