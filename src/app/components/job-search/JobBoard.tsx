// components/job-board/JobBoard.tsx
"use client";

import * as React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import JobListPanel from "./JobListPanel";
import JobDetailPanel from "./JobDetailPanel";
import JobApplyModal from "./JobApplyModal";
import { Job } from "@/types/jobs";
import { useJobs } from "../../hooks/useJobs";

type Props = {
  initialJobs: Job[];
};

export default function JobBoard({ initialJobs }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const jobIdFromUrl = searchParams.get("jobId") || "";
  const { jobs: fetchedJobs, fetchJobs, loading, hasMore } = useJobs();

  const [jobs, setJobs] = React.useState<Job[]>(initialJobs);
  const [page, setPage] = React.useState(2);

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedJobId, setSelectedJobId] = React.useState(jobIdFromUrl);

  // Sync selected id from URL (supports refresh/back/forward)
  React.useEffect(() => {
    setSelectedJobId(jobIdFromUrl);
  }, [jobIdFromUrl]);

  // Merge fetched jobs into list (dedupe by _id)
  React.useEffect(() => {
    if (fetchedJobs?.length) {
      setJobs((prev) => {
        const newOnes = fetchedJobs.filter((j) => !prev.some((p) => p._id === j._id));
        return [...prev, ...newOnes];
      });
    }
  }, [fetchedJobs]);

  const selectedJob = React.useMemo(() => {
    if (!selectedJobId) return null;
    return jobs.find((j) => j._id === selectedJobId) ?? null;
  }, [jobs, selectedJobId]);

  // Default select first job if URL has none
  React.useEffect(() => {
    if (!selectedJobId && jobs.length > 0) {
      const firstId = jobs[0]._id;
      const next = new URLSearchParams(searchParams.toString());
      next.set("jobId", firstId);
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs.length]);

  const handleSelect = (id: string) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("jobId", id);
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const handleFetchMore = async () => {
    await fetchJobs(page); //  hook 裡要吃 page
    setPage((p) => p + 1);
  };

  const handleApply = () => setOpenModal(true);
  const PANEL_H = { xs: "70vh", md: "76vh" };
  const hideScrollbarSx = {
    overflowY: "auto",
    scrollbarWidth: "none",      // Firefox
    msOverflowStyle: "none",     // IE/Edge legacy
    "&::-webkit-scrollbar": {
        display: "none",           // Chrome/Safari
    },
  } as const;


  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 4 },
      }}
    >
      {/* <Stack spacing={2} sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
          Job List
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Click a job on the left to see details on the right.
        </Typography>
      </Stack> */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "420px 1fr" },
          gap: 2,
          alignItems: "start",
        }}
      >
        {/* Left: List */}
        <Box
            sx={{
            height: PANEL_H,
            display: "flex",
            flexDirection: "column",
            bgcolor: "transparent",
            }}
        >
            {/* optional: 你要保留標題就放這裡（不滑動） */}
            <Box sx={{ height: PANEL_H, display: "flex", flexDirection: "column" }}>

                <Box sx={{ px: 0, pb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {jobs.length} 個職缺
                </Typography>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        pr: 1,
                    }}
                >
                <Box sx={{ flex: 1, ...hideScrollbarSx }}>
                    <JobListPanel jobs={jobs} selectedId={selectedJobId} onSelect={handleSelect} />
                    {/* load more... */}
                </Box>
            </Box>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center", pb: 2 }}>
              {hasMore ? (
                <Button variant="outlined" onClick={handleFetchMore} disabled={loading}>
                  {loading ? "Loading..." : "Read more"}
                </Button>
              ) : (
                <Box sx={{ textAlign: "center", py: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    若目前沒有符合您專長的職位，歡迎主動與我們聯絡，有適合職缺我們將第一時間通知你。                  
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box
            sx={{
            height: PANEL_H,
            overflowY: "auto",
            pr: 1,
            bgcolor: "transparent",
            }}
        >
            <JobDetailPanel job={selectedJob} onApply={handleApply} />
        </Box>
      </Box>

      <JobApplyModal
        modalOpen={openModal}
        toggleModal={() => setOpenModal(false)}
        jobTitle={selectedJob?.jobTitle ?? "Job Alert / Apply"}
      />
    </Box>
  );
}
