"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import JobDetailPanel from "@/app/components/job-search/JobDetailPanel";
import JobApplyModal from "@/app/components/job-search/JobApplyModal";
import { Job } from "@/types/jobs";

export default function JobDetailClient({ job }: { job: Job }) {
  const PANEL_H = { xs: "70vh", md: "76vh" };
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Box sx={{ height: PANEL_H, overflowY: "auto", pr: 1, bgcolor: "transparent" }}>
        <JobDetailPanel job={job} onApply={() => setOpenModal(true)} />
      </Box>

      <JobApplyModal
        modalOpen={openModal}
        toggleModal={() => setOpenModal(false)}
        jobTitle={job?.jobTitle ?? "Job Alert / Apply"}
      />
    </>
  );
}
