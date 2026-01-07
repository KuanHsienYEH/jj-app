"use client";

import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import DomainGrid from "./DomainGrid";
import ServiceSection from "./ServiceSection";
import FlowGraphic from "./FlowGraphic";
import {useService} from "@/app/hooks/useService";

type ServiceItem = {
  title: string;
  subtitle?: string;
  body: string[];
};


export default function ServicesPage() {
  const {services} = useService();
  
  return (
    <Box sx={{ bgcolor: "#fff" }}>
      <Container sx={{ py: { xs: 3, md: 4 } }}>
        {/* Top intro row */}
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={8}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
              關鍵人才・盡在巨將
            </Typography>

            <Typography variant="body2" sx={{ lineHeight: 1.9, color: "text.secondary" }}>
              巨將人力資源顧問有限公司，是由人力資源資深專業團隊所組成，秉持專業、優質、服務之精神，提供企業界人力資源顧問相關服務。在人才服務方面遍及傳統製造、電子科技、醫學美容、3C服務業，並獲得企業服務滿意肯定。本公司正派經營，合法私立就業服務機構設立，並經台北市政府勞動局評鑑為A級之優良仲介。成長快速，制度完善，擁有眾多工作機會，是求職者的最佳選擇，是企業掌握關鍵人才的最佳合作夥伴。
            </Typography>
          </Grid>

          {/* Right certificate card image */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 220, md: 180 },
              }}
            >
              {/* 你把截圖中的右上證照/證明圖放這裡 */}
              <Image
                src="/images/about_pic00.jpg"
                alt="創利營運 / 證照"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 3, md: 4 } }} />

        {/* Main content: left service list + right domain box */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
              服務項目
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {services.map((s) => (
                <ServiceSection key={s.title} title={s.title} subTitle={s.subTitle } thumbnail={s.thumbnail}  content={s.content} />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <DomainGrid />

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <img
                style={{marginTop:50}}
                src="/images/about_pic02.jpg"
                alt=""
              />
            </Box>

            {/* 底部棋子圖（截圖右下） */}
            <Box
              sx={{
                mt: 3,
                position: "relative",
                width: "100%",
                height: { xs: 200, md: 260 },
              }}
            >
              {/* <Image
                src="/images/services/chess.png"
                alt="策略與人才"
                fill
                style={{ objectFit: "cover", borderRadius: 12 }}
              /> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}