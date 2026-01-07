"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import {Service} from "@/types/service"

export default function ServiceSection({
  title,
  subTitle,
  thumbnail,
  content
}: Service) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        {/* 左側小 icon（用圓圈 + 橘色標題模仿截圖） */}
        <Box
          sx={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: "2px solid",
            borderColor: "#f3c8a9",
            mr: 1.2,
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              inset: 4,
              borderRadius: "50%",
              bgcolor: "#f0a36a",
              opacity: 0.35,
            },
          }}
        />
        <Typography sx={{ fontWeight: 900, color: "#e6802a", fontSize: 22 }}>
          {title}
        </Typography>
      </Box>

      <Box sx={{ pl: 4 }}>
          <Typography
            variant="body2"
            sx={{ lineHeight: 1.9, color: "text.secondary", mb: 0.6 }}
          >
            {subTitle}
          </Typography>
          <Typography
            variant="body2"
            sx={{ lineHeight: 1.9, color: "text.secondary", mb: 0.6 }}
          >
            {content}
          </Typography>
        
      </Box>
    </Box>
  );
}
