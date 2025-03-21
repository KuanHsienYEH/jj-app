import { useState, useEffect } from "react";
import { Job } from "@/types/jobs";
import { ApiResponse } from "@/types/api";



const API_URL = "/api/jobs/get-jobs";

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (customPage?: number, customLimit?: number) => {
    const currentPage = customPage ?? page;
    const currentLimit = customLimit ?? limit;
    

    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
      const data: ApiResponse = await res.json(); // ✅ 指定 API 回應類型

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
