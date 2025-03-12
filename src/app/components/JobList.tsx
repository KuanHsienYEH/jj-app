"use client";

import React, { useState, useEffect } from "react";
import { Box, Button,Typography } from "@mui/material";
import JobItem from "./JobItem";
import JobModal from "./JobModal";
import { Job } from "@/types/jobs";
import { useJobs } from "../hooks/useJobs";

interface JobListProps {
  initialJobs?: Job[];
  initialHasMore?: boolean;
}

export default function JobList({ initialJobs = [], initialHasMore = true }: JobListProps) {
  const { jobs: fetchedJobs, fetchJobs, loading, hasMore: fetchedHasMore } = useJobs();
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(2); // Start from page 2 since initialJobs is page 1

  // Initialize jobs with initialJobs
  useEffect(() => {
    if (initialJobs.length > 0) {
      setJobs(initialJobs);
      setHasMore(initialHasMore);
    }
  }, [initialJobs, initialHasMore]);

  // Update jobs when fetchedJobs changes
  useEffect(() => {
    if (fetchedJobs.length > 0) {
      setJobs((prevJobs) => {
        // Merge new jobs, avoiding duplicates based on _id
        const newJobs = fetchedJobs.filter(
          (newJob) => !prevJobs.some((prevJob) => prevJob._id === newJob._id)
        );
        return [...prevJobs, ...newJobs];
      });
      setHasMore(fetchedHasMore);
    }
  }, [fetchedJobs, fetchedHasMore]);

  const handleFetchMore = async () => {
    await fetchJobs(page); // Fetch jobs for the current page
    setPage((prevPage) => prevPage + 1); // Increment page for the next fetch
  };

  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>('');

  const handleApply = (job: string) => {
    setSelectedJob(job);
    setOpenModal(true);
  };

  const handleSave = (job: Job) => {
    console.log("Job saved:", job.jobTitle);
  };

  const handleRegister = () => {
    setSelectedJob('Registering for job alerts');
    setOpenModal(true);
  };  

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        mt: 4,
      }}
    >
      <Box
        sx={{
          padding: "10px",
          textAlign: "center",
          fontSize: "2em",
          fontWeight: "bold",
        }}
      >
        探索你的下一份夢想工作
      </Box>
      {jobs.map((job) => (
        <JobItem
          key={job._id}
          job={job}
          onApply={() => handleApply(job.jobTitle)}
          onSave={() => handleSave(job)}
        />
      ))}

      {hasMore ? (
        <Box sx={{ textAlign: "center", padding: "10px" }}>
          <Button
            variant="outlined"
            onClick={handleFetchMore} // Updated to use handleFetchMore
            disabled={loading}
          >
            Read more
          </Button>
        </Box>
      ):(
        <Box sx={{ textAlign: "center", padding: "20px", mt:"30px" }}>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            找不到適合的職缺嗎？留下您的資訊，我們將在有合適職缺時通知您！
          </Typography>
          <Button sx={{mt:"10px"}} variant="outlined" color="primary" onClick={handleRegister}>
            立即登記
          </Button>
        </Box>
      )}

      <JobModal
        jobTitle={selectedJob}
        modalOpen={openModal}
        toggleModal={() => setOpenModal(false)}
      />
    </Box>
  );
}