import JobList from "../components/JobList";
import { Job } from "../types/jobs";

async function getJobs(): Promise<Job[]> {
  try {
    const baseUrl =  typeof window !== "undefined" ? window.location.origin : "";
    const res = await fetch(`${baseUrl}/api/jobs/get-jobs?page=1&limit=10`, {
      cache: "no-store", // ✅ 避免快取，確保資料即時更新
    });

    if (!res.ok) {
      console.error("Failed to fetch jobs, status:", res.status);
      return [];
    }

    const data = await res.json();
    return data.data.jobs || [];
  } catch (error) {
    console.error("Server error while fetching jobs:", error);
    return [];
  }
}

export default async function JobsPage() {
  const jobs = await getJobs(); // ✅ Server-Side Fetching

  return <JobList initialJobs={jobs} />;
}
