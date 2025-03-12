import { Box, Typography } from "@mui/material";
import JobDetailWrapper from "../../components/JobDetailWrapper";
import { Job } from "@/types/jobs";

interface JobDetailPageProps {
  params: { id: string };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = params;

  // Fetch job data on the server
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // ✅ 確保完整 URL
  const res = await fetch(`${baseUrl}/api/jobs/get-jobs?id=${id}`, {
    cache: "no-store", // Ensure fresh data for dynamic routes
  });
  const data = await res.json();

  // Handle case where job is not found
  const job: Job | null =
    data.status === "success" && data.data.jobs && data.data.jobs.length > 0
      ? data.data.jobs[0]
      : null;

  if (!job) {
    return <Typography variant="h6">Job not found</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
      <JobDetailWrapper job={job} />
    </Box>
  );
}