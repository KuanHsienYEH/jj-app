// hooks/useJobs.ts
import { useState, useEffect } from "react";

const API_URL = "/api/jobs/get-jobs";

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
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
      const data = await res.json();
      if (data.status === "success") {
        setJobs((prev) => [...prev, ...data.jobs]); // ✅ 累加資料
        setPage(page + 1);
        if (data.jobs.length < 10) setHasMore(false); // 如果不足 10 筆，就不再請求
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
    setLoading(false);
  };

  return { jobs, fetchJobs, loading, hasMore };
};
