"use client";

import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ServiceCard from "./ServiceCard";
import { Box, Container, Typography } from "@mui/material";

// ✅ Define service data type
interface Service {
  title: string;
  thumbnail: string;
  subTitle: string;
  content: string;
}

// ✅ Service Data
const serviceData: Service[] = [
  {
    title: "人才推薦",
    thumbnail: "/images/profile.png", // ✅ Ensure correct path
    subTitle: "專業主管甄選，確保企業人才匹配度",
    content: "專業顧問親自面談甄選，提供完整履歷資料，並安排企業與人選面談。",
  },
  {
    title: "人才派遣",
    thumbnail: "/images/schedule.png",
    subTitle: "快速派遣解決企業臨時需求，彈性靈活",
    content: "可彈性調整人力需求，節省企業成本，維持高效率運作。",
  },
  {
    title: "正職代招",
    thumbnail: "/images/hiring.png",
    subTitle: "專業招聘服務，找到最佳人選",
    content: "提供大量招募，協助企業迅速補充人力，確保人才與職位匹配。",
  },
];

export default function Service() {
  const slick = useRef<Slider>(null);
  const [timeLeft, setTimeLeft] = useState(5);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = serviceData.length;

  // ✅ Auto slide timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        handleNextSlide();
        return 5;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Slide functions
  const handlePrevSlide = () => {
    slick.current?.slickPrev();
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeLeft(5);
  };

  const handleNextSlide = () => {
    slick.current?.slickNext();
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeLeft(5);
  };

  const settings = {
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  return (
    <Container>
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          我們的服務
        </Typography>
      </Box>
      <Slider ref={slick} {...settings}>
        {serviceData.map((item, index) => (
          <ServiceCard key={index} index={index} service={item} /> // ✅ Ensure `index` is passed
        ))}
      </Slider>
    </Container>
  );
}
