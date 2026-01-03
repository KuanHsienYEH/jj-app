"use client";

import * as React from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { Job } from "@/types/jobs";

type Props = {
  job: Job | null;
  onApply: () => void;
};

export default function JobDetailPanel({ job, onApply }: Props) {
  if (!job) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Select a job
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Choose one from the list to view details.
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.5 }}>
          {job.jobTitle}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 700, mt: 0.5 }}>
        </Typography>
      </Box>

      <Stack direction="row" spacing={1.5} flexWrap="wrap">
        <Stack direction="row" spacing={0.75} alignItems="center">
          <PaidOutlinedIcon fontSize="small" />
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {job.salary}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={0.75} alignItems="center">
          <LocationOnOutlinedIcon fontSize="small" />
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            {job.location}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={0.75} alignItems="center">
          <AccessTimeOutlinedIcon fontSize="small" />
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            {job.jobType}
          </Typography>
        </Stack>
      </Stack>

      <Button
        variant="contained"
        size="large"
        onClick={onApply}
        sx={{ borderRadius: 3, py: 1.25, fontWeight: 800 }}
      >
        我要應徵
      </Button>

      <Divider />
      <Typography variant="h6" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
        學歷科系
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
        {job.education}
      </Typography>
      <Typography variant="h6" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
        工作年資
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
        {job.seniority}
      </Typography>

      <Typography variant="h6" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
        工作內容
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
        {job.jobDetail}
      </Typography>
       <Typography variant="h6" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
        其他條件
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
        {job.requirement}
      </Typography>
    </Stack>
  );
}
