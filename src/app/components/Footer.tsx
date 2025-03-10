import Image from "next/image";
import Link from "next/link";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";

interface FooterProps {
  year: number;
}

export default function Footer({ year }: FooterProps) {
  const isMobile = useMediaQuery("(max-width:425px)");

  return (
    <footer>
      <Grid container spacing={3}>
        <Grid item md={4} sm={12} xs={12}>
          <Typography className="corpname" variant={isMobile ? "body1" : "h5"} gutterBottom>
            <b>巨將人力資源顧問有限公司</b>
          </Typography>
          <Box mt={2}>
            <Typography>
              <FontAwesomeIcon icon={faLocationDot} />
              <Link href="https://maps.app.goo.gl/XSiGu9tZtJGRhQV19" target="_blank" rel="noopener" color="inherit">
                106001 台北市大安區信義路二段
              </Link>
            </Typography>
            <Typography>
              <FontAwesomeIcon icon={faPhone} />
              <Link href="tel:0223569977" color="inherit">
                (02) 2356-9977
              </Link>
            </Typography>
            <Typography>
              <FontAwesomeIcon icon={faEnvelope} />
              <Link href="mailto:service@jujianghr.com.tw" color="inherit">
                service@jujianghr.com.tw
              </Link>
            </Typography>
            <Link className="fb" href="https://www.facebook.com/Jujianghr" target="_blank" rel="noopener">
              <FacebookIcon fontSize="large" color="primary" />
            </Link>
          </Box>
        </Grid>
        <Grid item md={2} xs={12}></Grid>
        <Grid item md={2} sm={6} xs={12}>
          <Typography>
            <Link href="#" color="inherit">公司介紹</Link>
          </Typography>
          <Typography>
            <Link href="#" color="inherit">服務內容</Link>
          </Typography>
          <Typography>
            <Link href="#" color="inherit">產業新聞</Link>
          </Typography>
        </Grid>
        <Grid item md={2} sm={6} xs={12}>
          <Typography>
            <Link href="#" color="inherit">我要求職</Link>
          </Typography>
          <Typography>
            <Link href="#" color="inherit">求職反詐騙</Link>
          </Typography>
          <Typography>
            <Link href="#" color="inherit">違反勞動法名單</Link>
          </Typography>
        </Grid>
        <Grid item md={2} sm={12} xs={12}>
          <Button variant="outlined" size="large">
            聯絡我們
          </Button>
        </Grid>
      </Grid>
      <Box mt={4} textAlign="center">
        <Typography>北市就服字 第0229號</Typography>
        <Typography>© 2012-{year} Ju Jiang Human Resources Consultant Co., Ltd.</Typography>
      </Box>
    </footer>
  );
}
