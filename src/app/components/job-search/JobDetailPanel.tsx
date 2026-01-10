"use client";

import * as React from "react";
import { Box, Button, Divider, Stack, Typography,Tooltip } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { Job } from "@/types/jobs";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

type Props = {
  job: Job | null;
  onApply: () => void;
};

export default function JobDetailPanel({ job, onApply }: Props) {
  const [copied, setCopied] = React.useState(false);
  const pageUrl = React.useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  const handleCopyLink = async () => {
    if (!pageUrl) return;
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback (較舊瀏覽器/權限問題)
      const input = document.createElement("input");
      input.value = pageUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  };


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

  

  const openShare = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareUrl = `${pageUrl}/job-search/${job._id}`

  const fbShareUrl = shareUrl
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    : "";
  const linkedInShareUrl = shareUrl
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    : "";

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
        sx={{ borderRadius: 3, py: 1.25, fontWeight: 800, width: "400px" }}
      >
        我要應徵
      </Button>
          <Stack direction="row" mt={80} spacing={1} flexWrap="wrap" alignItems="center">

            <FacebookRoundedIcon 
            sx={{ cursor:"pointer", fontWeight: 800 }} 
            onClick={() => fbShareUrl && openShare(fbShareUrl)}/>
            <LinkedInIcon 
            sx={{ cursor:"pointer", fontWeight: 800 }}      
            onClick={() => linkedInShareUrl && openShare(linkedInShareUrl)} />
            <Typography>|</Typography>
              <Tooltip title={copied ? "已複製！" : "複製連結"}>
            <IconButton onClick={handleCopyLink} size="small">
            <ContentCopyRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
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
