import { ApiResponse } from "../types/api";
import Job from "../models/Job";
import connectDB from "../lib/db";

async function fetchJobs(): Promise<ApiResponse> {
  await connectDB();
  const jobs = await Job.find().sort({ createDate: -1 }).exec();
  return { status: "ok", data: jobs };
}

export default async function HomePage() {
  const response = await fetchJobs();
  const jobs = response.status === "ok" ? response.data : [];

  return (
    <div>
      <h1>Welcome to JJapp!</h1>
      <h2>Job Listings</h2>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job: any) => (
            <li key={job._id}>
              {job.jobTitle} - {job.location} - {job.salary}
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
}