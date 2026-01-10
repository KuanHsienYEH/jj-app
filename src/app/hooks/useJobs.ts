import { useState, useEffect, useCallback } from "react";
import { Job } from "@/types/jobs";
import { ApiResponse } from "@/types/api";

const API_URL = "/api/jobs/get-jobs";

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = useCallback(
    async (customPage?: number, customLimit?: number) => {
      const currentPage = customPage ?? page;
      const currentLimit = customLimit ?? limit;

      if (!hasMore || loading) return;

      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}?page=${currentPage}&limit=${currentLimit}`
        );
        const data: ApiResponse = await res.json();

        if (data.status === "success") {
          setJobs((prev) => [...prev, ...data.data.jobs]);
          setPage((p) => p + 1);

          if (data.data.jobs.length < currentLimit) setHasMore(false);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    },
    [page, limit, hasMore, loading]
  );

  useEffect(() => {
    fetchJobs(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { jobs, fetchJobs, loading, hasMore };
};
