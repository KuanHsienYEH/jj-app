import { Box } from "@mui/material";
import JobDetailWrapper from "../../components/job-search/JobDetailWrapper";
import { Job } from "@/types/jobs";
import { notFound } from "next/navigation";

export default async function Page(props: any) {
  const { params, searchParams } = props;
  const { id } = params;

  // 取得最新 job 資料
  const res = await fetch(`/api/jobs/get-jobs?id=${id}`, {
    cache: "no-store", // 確保每次請求取得最新資料
  });
  const data = await res.json();

  const job: Job | null =
    data.status === "success" && data.data.jobs && data.data.jobs.length > 0
      ? data.data.jobs[0]
      : null;

  if (!job) {
    notFound(); // job 不存在則導向 404 頁面
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
      <JobDetailWrapper job={job} />
    </Box>
  );
}
