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
              <Typography sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FontAwesomeIcon icon={faLocationDot} />
                <Link 
                  href="https://maps.app.goo.gl/XSiGu9tZtJGRhQV19" 
                  target="_blank" 
                  rel="noopener" 
                  color="inherit"
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  106001 台北市大安區信義路二段
                </Link>
              </Typography>
              <Typography sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FontAwesomeIcon icon={faPhone} />
                <Link 
                  href="tel:0223569977" 
                  color="inherit"
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  (02) 2356-9977
                </Link>
              </Typography>
              <Typography sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FontAwesomeIcon icon={faEnvelope} />
                <Link 
                  href="mailto:service@jujianghr.com.tw" 
                  color="inherit"
                  style={{ textDecoration: "none", color: "#007bff" }}
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
            <Typography>
              <Link href="#" color="inherit" style={{ textDecoration: "none", color: "#333" }}>
                公司介紹
              </Link>
            </Typography>
            <Typography>
              <Link href="#" color="inherit" style={{ textDecoration: "none", color: "#333" }}>
                服務內容
              </Link>
            </Typography>
            <Typography>
              <Link href="#" color="inherit" style={{ textDecoration: "none", color: "#333" }}>
                產業新聞
              </Link>
            </Typography>
          </Grid>

          {/* 快速連結 2 */}
          <Grid item md={2} sm={6} xs={12}>
            <Typography>
              <Link href="#" color="inherit" style={{ textDecoration: "none", color: "#333" }}>
                我要求職
              </Link>
            </Typography>
            <Typography>
              <Link href="#" color="inherit" style={{ textDecoration: "none", color: "#333" }}>
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
            <Button variant="contained" size="large" sx={{ background: "#007bff", color: "white" }}>
              聯絡我們
            </Button>
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
