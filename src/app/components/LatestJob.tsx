"use client";

import React, { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextLink from "next/link";
import JobCard from "./JobCard";
import {
  Box,
  Container,
  Link,
  Typography,
  Grid,
  Skeleton,
  Stack,
  Button
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import type { Job } from "@/types/jobs";

type LatestJobProps = {
  jobs: Job[];
  loading?: boolean;
};

const actionWidth = 120;

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: "-30px",
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: 2,
      }}
      onClick={onClick}
      aria-label="Next"
    >
      <ArrowForwardIosIcon sx={{ fontSize: 30, color: "#555" }} />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "-30px",
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: 2,
      }}
      onClick={onClick}
      aria-label="Previous"
    >
      <ArrowBackIosIcon sx={{ fontSize: 30, color: "#555" }} />
    </div>
  );
};

function LatestJobSkeleton({ count = 9 }: { count?: number }) {
  return (
    <Container sx={{ mt: 10 }}>
      <Box sx={{ position: "relative", textAlign: "center", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          最新職缺
        </Typography>

        <Skeleton
          variant="text"
          width={90}
          height={24}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </Box>

      {/* 用 Grid 做出跟 3 欄卡片接近的 skeleton */}
      <Grid container spacing={2}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Box
              sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                p: 2,
              }}
            >
              {/* 模擬 JobCard 內容（你可依 JobCard 版型微調） */}
              <Skeleton variant="text" height={28} width="80%" />
              <Skeleton variant="text" height={20} width="60%" />
              <Skeleton variant="text" height={20} width="70%" />

              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Skeleton variant="rounded" width={80} height={28} />
                <Skeleton variant="rounded" width={80} height={28} />
              </Stack>

              <Skeleton
                variant="rectangular"
                height={36}
                sx={{ borderRadius: 2, mt: 2 }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default function LatestJob({ jobs, loading = false }: LatestJobProps) {
  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: { slidesToShow: 2, slidesToScroll: 2 },
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 1, slidesToScroll: 1 },
        },
      ],
    }),
    []
  );

  if (loading) return <LatestJobSkeleton count={9} />;

  return (
    <Container sx={{ mt: 10 }}>
    <Box
  sx={{
    display: "flex",
    alignItems: "center",
    mb: 3,
    gap: 1,
    flexDirection: { xs: "column", sm: "row" },
  }}
>
  {/* 左側佔位：桌機用來平衡右側按鈕寬度；手機不需要 */}
  <Box sx={{ width: { xs: 0, sm: actionWidth }, display: { xs: "none", sm: "block" } }} />

  {/* 標題：永遠置中 */}
  <Box sx={{ flex: 1, textAlign: "center" }}>
    <Typography
      variant="h4"
      sx={{ fontWeight: 900, letterSpacing: -0.5, lineHeight: 1.2 }}
    >
      最新職缺
    </Typography>
  </Box>

  {/* 右側動作 */}
  <Box
    sx={{
      width: { xs: "auto", sm: actionWidth },
      display: "flex",
      justifyContent: { xs: "center", sm: "flex-end" },
    }}
  >
    <Button
      component={NextLink}
      href="/job-search"
      variant="text"
      endIcon={<ArrowForwardIosIcon sx={{ fontSize: 16 }} />}
      sx={{
        fontWeight: 800,
        textTransform: "none",
        px: 0,
        minWidth: "auto",
      }}
    >
      更多職缺
    </Button>
  </Box>
</Box>


      {jobs?.length ? (
        <div
          className="slider-container"
          style={{ width: "100%", position: "relative" }}
        >
          <Slider {...settings}>
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </Slider>
        </div>
      ) : null}
    </Container>
  );
}
