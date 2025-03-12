import { useState, useEffect } from "react";
import { Job, JobListResponse } from "../types/jobs";

const API_URL = "/api/jobs/get-jobs";

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?page=${page}&limit=10`);
      const data: JobListResponse = await res.json(); // ✅ 指定 API 回應類型

      if (data.status === "success") {
        setJobs((prev) => [...prev, ...data.data.jobs]);
        setPage(page + 1);
        if (data.data.jobs.length < 10) setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
    setLoading(false);
  };

  return { jobs, fetchJobs, loading, hasMore };
};
