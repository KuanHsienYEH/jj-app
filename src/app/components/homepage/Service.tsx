"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Stack, Container, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CountdownCircle from "./CountdownCircle";
import ServiceCard from "./ServiceCard";
import styles from "@/styles/components/service.module.scss";
import {useService} from "@/app/hooks/useService";


const DURATION = 5;

export default function Service() {
  const slick = useRef<Slider | null>(null);
  const {services} = useService();
  const serviceData = services;
  const totalSlides = services.length;

  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isAnimatingRef = useRef(false);
  const lastManualRef = useRef(0);


  // const handlePrev = () => {
  //   slick?.current?.slickPrev?.();
  //   setCurrentSlide((s) => (s - 1 + totalSlides) % totalSlides);
  //   setTimeLeft(DURATION);
  // };

  // const handleNext = () => {
  //   slick?.current?.slickNext?.();
  //   setCurrentSlide((s) => (s + 1) % totalSlides);
  //   setTimeLeft(DURATION);
  //};
  const goPrev = useCallback(() => {
    if (isAnimatingRef.current) return;   // ✅ 切換中就忽略連點
    lastManualRef.current = Date.now();   // ✅ 記錄手動操作時間
    slick.current?.slickPrev?.();
  }, []);

  const goNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    lastManualRef.current = Date.now();
    slick.current?.slickNext?.();
  }, []);


  useEffect(() => {
    const id = setInterval(() => {
      // ✅ 手動點擊後 800ms 內不自動切
      if (Date.now() - lastManualRef.current < 800) return;

      setTimeLeft((t) => {
        if (t > 0) return t - 1;
        slick.current?.slickNext?.();
        return DURATION;
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);



  const settings = useMemo(
    () => ({
      autoplay: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      speed: 300,
      waitForAnimate: true,   // ✅ 重要：避免切換交錯
      // nextArrow: null,
      // prevArrow: null,

      beforeChange: (_: number, next: number) => {
        isAnimatingRef.current = true;
        setCurrentSlide(next);     // ✅ 立刻更新頁碼
        setTimeLeft(DURATION);     // ✅ 每次切換都重置倒數
      },
      afterChange: () => {
        isAnimatingRef.current = false;
      },
    }), []
  );


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
          <b>以多年深耕台灣勞動力市場的經驗，提供專業、快速、符合法規的人力資源解決方案。</b>
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          className={styles.serviceStack}
        >
          <ArrowBackIosIcon className={styles.serviceStackBtn} onClick={goPrev} />
          <CountdownCircle
            currentSlide={currentSlide}
            count={totalSlides}
            timeLeft={timeLeft}
            duration={DURATION}
          />
          <ArrowForwardIosIcon className={styles.serviceStackBtn} onClick={goNext} />
        </Stack>

        <Button
          className={styles.serviceGuideBtnPC}
          variant="outlined"
          size="large"
          sx={{
            maxWidth: 320,
            width: "100%",
            mt: "4rem",
            px: 2.5,
            py: 1.8,
            display: { xs: "none", md: "inline-flex" },
          }}
        >
          <Typography fontWeight="bold" className={styles.serviceGuideText}>
            服務指南
          </Typography>
          <ChevronRightIcon />
        </Button>
      </Box>

      <Box className={styles.serviceBoxRight}>
        <Box className={styles.slideContainer}>
          <Slider ref={slick} {...settings}>
            {serviceData.map((item, index) => (
              <ServiceCard key={item.title ?? index} index={index} service={item} />
            ))}
          </Slider>
        </Box>
      </Box>

      <Button
        className={styles.serviceGuideBtnMB}
        variant="outlined"
        size="large"
        sx={{
          maxWidth: 320,
          width: "100%",
          px: 2.5,
          py: 1.8,
          display: { xs: "inline-flex", md: "none" },
          mt: "-20px",
        }}
      >
        <Typography fontWeight="bold" className={styles.serviceGuideText}>
          服務指南
        </Typography>
        <ChevronRightIcon />
      </Button>
    </Container>
  );
}
