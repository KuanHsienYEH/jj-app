"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";

export default function FlowGraphic() {
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        p: 2,
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "center" }}>
        {/* Left circle */}
        <Circle label="策略性\n人力規劃" color="#7aa7d6" />

        {/* Middle line with nodes */}
        <Box sx={{ flex: 1, minWidth: 120 }}>
          <Box sx={{ height: 2, bgcolor: "#9bb7d6", position: "relative" }}>
            <Node left="10%" label="非核心人力" />
            <Node left="45%" label="臨時性工作" />
            <Node left="80%" label="基層人員" />
          </Box>
        </Box>

        <Typography sx={{ fontWeight: 900, color: "text.secondary" }}>or</Typography>

        {/* Right circle */}
        <Circle label="彈性\n人力調節" color="#8bc34a" />
      </Box>
    </Box>
  );
}

function Circle({ label, color }: { label: string; color: string }) {
  return (
    <Box
      sx={{
        width: 92,
        height: 92,
        borderRadius: "50%",
        border: "4px solid",
        borderColor: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "#fff",
        flexShrink: 0,
      }}
    >
      <Typography sx={{ whiteSpace: "pre-line", fontWeight: 900, fontSize: 14, color }}>
        {label}
      </Typography>
    </Box>
  );
}

function Node({ left, label }: { left: string; label: string }) {
  return (
    <Box
      sx={{
        position: "absolute",
        left,
        top: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#7aa7d6" }} />
      <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary" }}>
        {label}
      </Typography>
    </Box>
  );
}
