"use client";

import React from "react";
import { Stack, Chip, Box, Card, CardActions, Typography, Button } from "@mui/material";
import { LocalAtm, School, BusinessCenter } from "@mui/icons-material";
import { Job } from "@/types/jobs";

interface JobDetailProps {
  currJob: Job;
  toggleModal: () => void;
}

const isNew = (createDate: string): boolean => {
  const now = new Date();
  const jobDate = new Date(createDate);
  const diffDays = Math.floor((now.getTime() - jobDate.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};

export default function JobDetail({ currJob, toggleModal }: JobDetailProps) {
  return (
    <Card id="job-detail" variant="outlined">
      <Box className="job-detail__header">
        <Stack className="mb" direction="row" justifyContent="space-between">
          <Typography variant="h4" component="div">
            {currJob.jobTitle}
          </Typography>
          <Stack direction="row" className="chip-box">
            {currJob.isActive && <Chip label="HOT" variant="outlined" color="error" />}
            {isNew(currJob.createDate || "") && <Chip label="NEW" variant="outlined" color="success" />}
          </Stack>
        </Stack>
        <Stack className="mb">
          <Typography color="text.secondary">
            {currJob.location}
          </Typography>
        </Stack>
        <Stack className="chip-box mb" flexWrap="wrap" direction="row" spacing={1}>
          {currJob.salary && <Chip icon={<LocalAtm />} label={currJob.salary} />}
          {currJob.education && <Chip icon={<School />} label={currJob.education} />}
          {currJob.jobType && <Chip icon={<BusinessCenter />} label={currJob.jobType} />}
        </Stack>
        <CardActions className="button-wrapper">
          <Button onClick={toggleModal} variant="contained" size="large">
            我要應徵
          </Button>
        </CardActions>
      </Box>
      <Box className="job-detail__body">
        {currJob.seniority && (
          <>
            <Typography>
              <b>工作年資</b>
            </Typography>
            <pre>{currJob.seniority}</pre>
          </>
        )}
        {currJob.jobDetail && (
          <>
            <Typography>
              <b>工作內容</b>
            </Typography>
            <pre>{currJob.jobDetail}</pre>
          </>
        )}
        {currJob.requirement && (
          <>
            <Typography>
              <b>其他條件</b>
            </Typography>
            <pre>{currJob.requirement}</pre>
          </>
        )}
      </Box>
    </Card>
  );
}