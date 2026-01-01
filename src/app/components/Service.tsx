"use client";

import { useState, useRef, useEffect, useMemo,useCallback } from "react";
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

const serviceData = [
  {
    title: "人才推薦",
    thumbnail: "/images/profile.png",
    subTitle: "專業主管甄選，確保企業人才匹配度",
    content:'以中、高階主管及專業技術人才為主。本公司接受企業委託後，由專業顧問親自面談甄選，提供人選之詳細履歷資料，並安排企業與人選面談。協助企業快速找到合適之人才，降低企業在人才招募上所耗費之人力及時程。大量的人才資料庫資料，快速、優質、保密，是企業網羅關鍵人才的最佳管道。',
  },
  {
    title: "人才派遣",
    thumbnail: "/images/schedule.png",
    subTitle: "快速派遣解決企業臨時需求，彈性靈活",
    content:'非核心人力、事務性工作、臨時性工作、基層人員之策略性人力規劃，或彈性人力調節，可使用派遣人力，快速、彈性又可節省行政成本。巨將為企業提供派遣人力，堅持符合各項勞動法令，維持勞資雙方和諧。對於員工，我們秉持誠信原則，提供安全合法的僱用關係，給予基本的福利與保障。',
  },
  {
    title: "正職代招",
    thumbnail: "/images/hiring.png",
    subTitle: "專業招聘服務，找到最佳人選",
    content:'大量招募單一職缺或各項管理職及技術職缺，委外招募可以迅速補充人力。我們的招募團隊以團隊合作的方式，快速、精準、高效的進行履歷篩選、初試、甄選、推薦等作業，人才經委託公司覆試評估合格後，直接晉用為正式員工。巨將以專業的經驗，幫助企業甄選合適的人才，可為企業節省招募人才所耗費的時間和成本，提升企業競爭力。',
  },
  {
    title: "薪資管理",
    thumbnail: "/images/payment-day.png",
    subTitle: "客製化薪酬管理，精準計算福利",
    content:'巨將提供客製化的薪資管理服務，包含員工資料建立、薪資計算、保險管理、福利計畫、員工遞補招募等項目，配合客戶需求，提供即時、準確、保密的服務薪資管理服務。',
  },
  {
    title: "教育訓練",
    thumbnail: "/images/training.png",
    subTitle: "企業內訓課程，提升員工技能",
    content:'企業內訓課程，提升員工技能。我們提供多元化的培訓方案，專注於個人及團隊的專業發展，從而提高工作效率和團隊協作能力。豐富的課程內容涵蓋管理、溝通、領導技巧等，確保您的員工持續成長，應對未來挑戰。',
  },
  {
    title: "職涯諮詢",
    thumbnail: "/images/goal.png",
    subTitle: "專業職涯指導，助您職場進階",
    content:'職涯諮詢，專業職涯指導，助您職場進階。與我們一同探索職涯發展之路，解析個人優勢，制定有效計畫，提供專業指導，助您實現職場目標，成就更卓越的事業生涯。',
  },
];

const DURATION = 5;

export default function Service() {
  const slick = useRef<Slider | null>(null);
  const totalSlides = serviceData.length;

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
    }),[]
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
