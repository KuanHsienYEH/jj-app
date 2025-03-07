"use client";

import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Stack, Container, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CountdownCircle from "./CountdownCircle";
import ServiceCard from "./ServiceCard";
import styles from "@/styles/components/service.module.scss"; // ✅ Import SCSS Module

// ✅ 使用 Next.js `public` 內的圖片
const serviceData = [
  {
    title: "人才推薦",
    thumbnail: "/images/profile.png",
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
  {
    title: "薪資管理",
    thumbnail: "/images/payment-day.png",
    subTitle: "客製化薪酬管理，精準計算福利",
    content: "提供即時、準確、保密的薪資管理服務。",
  },
  {
    title: "教育訓練",
    thumbnail: "/images/training.png",
    subTitle: "企業內訓課程，提升員工技能",
    content: "提供多元化的培訓方案，確保您的員工持續成長，應對未來挑戰。",
  },
  {
    title: "職涯諮詢",
    thumbnail: "/images/goal.png",
    subTitle: "專業職涯指導，助您職場進階",
    content: "職涯諮詢，專業指導，助您實現職場目標。",
  },
];

const duration = 5;

export default function Service() {
  const slick = useRef<Slider>(null);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = serviceData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        handleNextSlide();
        return duration;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevSlide = () => {
    slick.current?.slickPrev();
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeLeft(duration);
  };

  const handleNextSlide = () => {
    slick.current?.slickNext();
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeLeft(duration);
  };

  const settings = {
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  return (
    <Container className={styles.serviceContainer}>
      <Box className={styles.serviceBoxLeft}>
        <Box className={styles.serviceBoxLeftContainer}>
          <h1>服務</h1>
          <Typography variant="h6">
            <b>我們能提供的服務</b>
          </Typography>
        </Box>
        <Typography className={styles.serviceBoxLeftDesc}>
          <b>
            以多年深耕台灣勞動力市場的經驗，提供專業、快速、符合法規的人力資源解決方案。
          </b>
        </Typography>
        <Stack direction="row" className={styles.serviceStack}>
          <ArrowBackIosIcon className={styles.serviceStackBtn} onClick={handlePrevSlide} />
          <CountdownCircle currentSlide={currentSlide} count={totalSlides} timeLeft={timeLeft} duration={duration} />
          <ArrowForwardIosIcon className={styles.serviceStackBtn} onClick={handleNextSlide} />
        </Stack>
        <Button className={styles.serviceGuideBtnPC} variant="outlined" size="large">
          <Typography fontWeight="bold" className={styles.serviceGuideText}>
            服務指南
          </Typography>{" "}
          <ChevronRightIcon />
        </Button>
      </Box>
      <Box className={styles.serviceBoxRight}>
        <Box className={styles.slideContainer}>
          <Slider ref={slick} {...settings}>
            {serviceData.map((item, index) => (
              <ServiceCard key={index} index={index} service={item} />
            ))}
          </Slider>
        </Box>
      </Box>
    </Container>
  );
}
