"use client";

import React, { useState } from "react";
import JobDetail from "./JobDetail";
import JobModal from "./JobModal";
import { Job } from "@/types/jobs";

interface JobDetailWrapperProps {
  job: Job;
}

export default function JobDetailWrapper({ job }: JobDetailWrapperProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <JobDetail currJob={job} toggleModal={toggleModal} />
      <JobModal jobTitle={job.jobTitle} modalOpen={modalOpen} toggleModal={toggleModal} />
    </>
  );
}