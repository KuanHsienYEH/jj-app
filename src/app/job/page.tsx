import JobList from "../components/JobList";
import { Job } from "@/types/jobs";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getJobs(): Promise<Job[]> {
  try {
    //因為這邊是server component 所以url要從後端拿
    const reqHeaders = await headers();
    const host = reqHeaders.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;
    const res = await fetch(`${baseUrl}/api/jobs/get-jobs?page=1&limit=10`, {
      cache: "no-store",
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
  const jobs = await getJobs();

  return (
    <main>
      <JobList initialJobs={jobs} />
    </main>
  );
}
