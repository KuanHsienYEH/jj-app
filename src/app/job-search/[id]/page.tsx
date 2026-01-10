import { Box } from "@mui/material";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Job } from "@/types/jobs";
import JobDetailClient from "./JobDetailClient";

export default async function Page(props: any) {
  const { params } = props;
  const { id } = await params;

  // ✅ Server fetch: 用絕對網址（或直接 fetch DB/service 更好）
  const reqHeaders = await headers();
  const host = reqHeaders.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/jobs/get-job?id=${id}`, {
    cache: "no-store",
  });

  const data = await res.json();

  const job = data.data
  if (!job) notFound();

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      {/* ✅ 把互動交給 client component */}
      <JobDetailClient job={job} />
    </Box>
  );
}
