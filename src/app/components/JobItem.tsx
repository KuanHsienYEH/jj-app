"use client";

import React, { useState } from "react";
import { Typography, Button, Snackbar, Alert, Divider, Box } from "@mui/material";
import { Job } from "@/types/jobs";
import ShareIcon from "@mui/icons-material/Share";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useRouter } from "next/navigation";

interface JobItemProps {
  job: Job;
  onApply: () => void;
  onSave: () => void;
}

export default function JobItem({ job, onApply, onSave }: JobItemProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();

  const handleShare = () => {
    const baseUrl =  typeof window !== "undefined" ? window.location.origin : "";
    const jobDetailUrl = `${baseUrl}/job/${job._id}`;
    navigator.clipboard.writeText(jobDetailUrl).then(() => {
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 2000);
    }).catch((err) => {
      console.error("Failed to copy URL:", err);
    });
  };

  const handleTitleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation(); // Prevents triggering parent click event
    router.push(`/job/${job._id}`);
  };

  return (
    <>
      <Typography 
        fontSize={18} 
        fontWeight={600} 
        color="primary" 
      >
        <span onClick={handleTitleClick} style={{ cursor: "pointer" }}>
          {job.jobTitle}
        </span>
      </Typography>
      <Typography sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: "4px", color: "gray", fontSize: "14px" }}>
        {job.location} | {job.seniority} | {job.education}
      </Typography>
      <Typography 
        fontSize={14} 
        color="gray" 
        mt={1} 
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {job.jobDetail}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
        <Typography
          sx={{
            backgroundColor: "#f0f0f0",
            padding: "4px 8px",
            fontSize: "12px",
            borderRadius: "4px",
            display: "inline-block"
          }}
        >
          {job.salary}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1, justifyContent: "flex-end" }}>
          <Button onClick={handleShare} startIcon={<ShareIcon />} sx={{ textTransform: "none", fontSize: "14px", color: "#666" }}>
            分享
          </Button>
          <Button 
            onClick={onApply} 
            variant="contained" 
            sx={{ textTransform: "none", padding: "6px 12px", fontSize: "14px", flexGrow: 1, maxWidth: "150px" }}
          >
            應徵
          </Button>
        </Box>
      </Box>
      <Divider sx={{ marginY: "16px", backgroundColor: "#ddd" }} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          已複製網址到剪貼簿！
        </Alert>
      </Snackbar>
    </>
  );
}
