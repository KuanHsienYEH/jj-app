// components/job-board/JobListPanel.tsx
"use client";

import * as React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Job } from "@/types/jobs";

type Props = {
  jobs: Job[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function JobListPanel({ jobs, selectedId, onSelect }: Props) {
  return (
    <Stack spacing={1.5}>
      {jobs.map((job) => {
        const active = job._id === selectedId;

        return (
          <Box
            key={job._id}
            onClick={() => onSelect(job._id)}
            role="button"
            tabIndex={0}
            sx={{
              cursor: "pointer",
              borderRadius: 3,
              border: "2px solid",
              borderColor: active ? "primary.main" : "divider",
              p: 2,
              transition: "0.15s ease",
              "&:hover": {
                borderColor: "primary.main",
                boxShadow: 1,
              },
            }}
          >
            <Stack spacing={1}>
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                {job.jobTitle}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                 {job.education}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Chip
                  size="small"
                  label={job.salary}
                  sx={{ fontWeight: 700 }}
                />
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <LocationOnOutlinedIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {job.location ?? "Wichita, Kansas"}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={0.75} alignItems="center">
                  <AccessTimeOutlinedIcon fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    {job.jobType ?? "Contract/Temporary"}
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                {/* {(job.featured ?? true) && <Chip size="small" label="Featured" color="warning" />} */}
                <Typography variant="caption" color="text.secondary">
                  {/* {job.postedDaysAgo != null ? `${job.postedDaysAgo} days ago` : "0 days ago"} */}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
}
