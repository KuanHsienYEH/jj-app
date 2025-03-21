"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import JobCard from "./JobCard";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Job = {
  _id: string;
  jobTitle: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
};

export default function LatestJob() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams({
        page: "1",
        limit: "9",
        keyword: "",
      }).toString();

      console.log(`📡 Fetching jobs from API: /api/jobs/get-jobs?${params}`);

      const res = await fetch(`/api/jobs/get-jobs?${params}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`❌ API Error: ${errorData.message}`);
      }

      const result = await res.json();
      if (result.status === "success") {
        setJobs(result.data.jobs);
      } else {
        console.error("❌ API returned error:", result.message);
      }
    } catch (error) {
      console.error("❌ Error fetching job data:", error);
    }
  };

  // **左右箭頭按鈕**
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
      >
        <ArrowBackIosIcon sx={{ fontSize: 30, color: "#555" }} />
      </div>
    );
  };

  // **Slick 設定**
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Box sx={{ position: "relative", textAlign: "center", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          最新職缺
        </Typography>
        <Link
          href="/job"
          underline="hover"
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 16,
            color: "#007bff",
          }}
        >
          更多職缺 &gt;
        </Link>
      </Box>
      <div className="slider-container" style={{ width: "100%", position: "relative" }}>
        <Slider {...settings}>
          {jobs?.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </Slider>
      </div>
    </Container>
  );
}
