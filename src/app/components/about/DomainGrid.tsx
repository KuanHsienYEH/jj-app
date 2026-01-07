"use client";

import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const domains = [
  { label: "行政管理", icon: <BusinessCenterOutlinedIcon />, color: "#4c8bd6" },
  { label: "業務行銷", icon: <LocalShippingOutlinedIcon />, color: "#f0a63a" },
  { label: "資訊服務", icon: <ComputerOutlinedIcon />, color: "#9a6ad6" },
  { label: "工程製造", icon: <EngineeringOutlinedIcon />, color: "#5aa7a7" },
  { label: "財會金融", icon: <PaymentsOutlinedIcon />, color: "#d6b85a" },
  { label: "醫學保健", icon: <FavoriteBorderOutlinedIcon />, color: "#e46a6a" },
];

export default function DomainGrid() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "84px 1fr",
        gap: 2,
        alignItems: "center",
      }}
    >
      {/* 左側 6+ */}
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: 54, fontWeight: 900, color: "text.secondary", lineHeight: 1 }}>
          6
          <Typography component="span" sx={{ fontSize: 20, fontWeight: 900 }}>
            大
          </Typography>
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 800, color: "text.secondary" }}>
          專業領域
        </Typography>
      </Box>

      {/* 右側格子 */}
      <Grid container spacing={1.2}>
        {domains.map((d) => (
          <Grid item xs={6} key={d.label}>
            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1.5,
                px: 1.2,
                py: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "#fafafa",
              }}
            >
              <Box sx={{ color: d.color, display: "flex", alignItems: "center" }}>{d.icon}</Box>
              <Typography variant="body2" sx={{ fontWeight: 800, color: d.color }}>
                {d.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
