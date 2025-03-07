"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import JobCard from "./JobCard";
import { Box, Container, Link } from "@mui/material";

type Job = {
  _id: string;
  jobTitle: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
};

const style = {
  titleBox: {
      position:'relative', 
      display: 'flex', 
      justifyContent: 'center',
      '@media (max-width:425px)': {
          justifyContent: 'start'
        },
  },
  moreJob: {
      position:'absolute', 
      right:'20px', 
      bottom:'20px',
      '@media (max-width:425px)': {
          right:'0', 
          bottom:'20px',
        },
  },
}


export default function LatestJob() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams({
        page: "1",  // ✅ Use `1` instead of `0`
        limit: "9",
        keyword: "", // ✅ Always a string
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
  

  const style = {
    titleBox: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      "@media (max-width:425px)": {
        justifyContent: "start",
      },
    },
    moreJob: {
      position: "absolute",
      right: "20px",
      bottom: "20px",
      "@media (max-width:425px)": {
        right: "0",
        bottom: "20px",
      },
    },
  };

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Box sx={{ ...style.titleBox }}>
        <h1>最新職缺</h1>
        <Link sx={{ ...style.moreJob }} href="/jobs" underline="hover">
          {"更多職缺 >"}
        </Link>
      </Box>
      <div className="slider-container" style={{ width: "100%" }}>
        <Slider {...settings}>
          {jobs?.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </Slider>
      </div>
    </Container>
  );
}
