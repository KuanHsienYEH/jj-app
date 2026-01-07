// app/job-list/page.tsx
import JobBoard from "../components/job-search/JobBoard";
import { Job } from "@/types/jobs";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getJobs(): Promise<Job[]> {
  try {
    const reqHeaders = await headers();
    const host = reqHeaders.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/jobs/get-jobs?page=1&limit=10`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data?.data?.jobs ?? [];
  } catch {
    return [];
  }
}

export default async function JobListPage() {
  const initialJobs = await getJobs();
  return (
    <main>
      <JobBoard initialJobs={initialJobs} />
    </main>
  );
}
