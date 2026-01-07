import Image from "next/image";
import Link from "next/link";
import { Box, Button, Grid, Typography, useMediaQuery, Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";

interface FooterProps {
  year: number;
}

export default function Footer({ year }: FooterProps) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const rowSx = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    "& svg": { width: 16, height: 16, flex: "0 0 16px", display: "inline-block" },
  };

  return (
    <Box component="footer" sx={{ background: "#f8f9fa", py: 4, px: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          {/* 公司資訊 */}
          <Grid item md={4} sm={12} xs={12}>
            <Typography 
              variant={isMobile ? "body1" : "h5"} 
              gutterBottom
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              巨將人力資源顧問有限公司
            </Typography>
            <Box mt={2}>
              <Typography sx={rowSx}>
                <FontAwesomeIcon icon={faLocationDot} />
                <Link 
                  href="https://maps.app.goo.gl/XSiGu9tZtJGRhQV19" 
                  target="_blank" 
                  rel="noopener" 
                  color="inherit"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  106001 台北市大安區信義路二段
                </Link>
              </Typography>
              <Typography sx={rowSx}>
                <FontAwesomeIcon icon={faPhone} />
                <Link 
                  href="tel:0223569977" 
                  color="inherit"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  (02) 2356-9977
                </Link>
              </Typography>
              <Typography sx={rowSx}>
                <FontAwesomeIcon icon={faEnvelope} />
                <Link 
                  href="mailto:service@jujianghr.com.tw" 
                  color="inherit"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  service@jujianghr.com.tw
                </Link>
              </Typography>
              <Box mt={1}>
                <Link 
                  href="https://www.facebook.com/Jujianghr" 
                  target="_blank" 
                  rel="noopener"
                  style={{ textDecoration: "none" }}
                >
                  <FacebookIcon fontSize="large" sx={{ color: "#1877f2" }} />
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* 留白區域 */}
          <Grid item md={2} xs={12}></Grid>

          {/* 快速連結 1 */}
          <Grid item md={2} sm={6} xs={12}>
            <Typography variant="h6" >
                公司介紹
            </Typography>
            <Typography>
              <Link href="#" color="inherit" style={{ textDecoration: "none", color: "#333" }}>
                服務指南
              </Link>
            </Typography>
            <Typography>
              <Link href="#" color="inherit" style={{ textDecoration: "none", color: "#333" }}>
                就業服務機構許可證
              </Link>
            </Typography>
            <Typography>
              <Link href="#" color="inherit" style={{ textDecoration: "none", color: "#333" }}>
                歷年評鑑成績
              </Link>
            </Typography>
            <Typography>
              <Link href="#" color="inherit" target="_blink" style={{ textDecoration: "none", color: "#333" }}>
                產業新聞
              </Link>
            </Typography>
            <Typography>
              <Link href="#" color="inherit" style={{ textDecoration: "none", color: "#333" }}>
                收費項目金額明細表
              </Link>
            </Typography>
          </Grid>

          {/* 快速連結 2 */}
          <Grid item md={2} sm={6} xs={12}>
            <Typography variant="h6" >
                求職者資訊
            </Typography>
            <Typography>
              <Link href="#" color="inherit" style={{ textDecoration: "none", color: "#333" }}>
                申訴處理機制
              </Link>
            </Typography>
            <Typography>
              <Link target="_blank" href="https://bola.gov.taipei/News_Content.aspx?n=9C30ECD2C9D31116&sms=B81E4E16FE8825B0&s=A520830439CE2567" color="inherit" style={{ textDecoration: "none", color: "#333" }}>
                求職反詐騙
              </Link>
            </Typography>
            <Typography>
              <Link href="#" color="inherit" style={{ textDecoration: "none", color: "#333" }}>
                違反勞動法名單
              </Link>
            </Typography>
          </Grid>

          {/* 聯絡按鈕 */}
          <Grid item md={2} sm={12} xs={12} textAlign={isMobile ? "center" : "left"}>
            <Typography variant="h6" >
                法規資訊
            </Typography>
            <Typography>
              <Link target="_blank" href="https://bola.gov.taipei/News_Content.aspx?n=9C30ECD2C9D31116&sms=B81E4E16FE8825B0&s=A520830439CE2567" color="inherit" style={{ textDecoration: "none", color: "#333" }}>
                求職反詐騙
              </Link>
            </Typography>
            <Typography>
              <Link href="#" color="inherit" style={{ textDecoration: "none", color: "#333" }}>
                性騷擾防治措施、申訴及懲戒辦法
              </Link>
            </Typography>
          </Grid>
        </Grid>

        {/* 版權區 */}
        <Box mt={4} textAlign="center" sx={{ color: "#555", fontSize: "14px" }}>
          <Typography>北市就服字 第0229號</Typography>
          <Typography>© 2012-{year} Ju Jiang Human Resources Consultant Co., Ltd.</Typography>
        </Box>
      </Container>
    </Box>
  );
}
