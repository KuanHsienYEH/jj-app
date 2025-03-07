"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AppBar, Box, Button, CssBaseline, Divider, Drawer, Grid,
  IconButton, List, ListItem, ListItemButton, ListItemText,
  Slide, Toolbar, Typography, useScrollTrigger, useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";

// ✅ Import global styles
import "@/styles/main.scss"; 

const drawerWidth = 240;
const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" }
];

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();
  return <Slide appear={false} direction="down" in={!trigger}>{children}</Slide>;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const year = new Date().getFullYear();
  const isMobile = useMediaQuery("(max-width:425px)");

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Image src="/images/logo.png" alt="logo" width={130} height={40} />
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ label, path }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton component={Link} href={path} sx={{ textAlign: "center" }}>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="layout">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <HideOnScroll>
          <AppBar component="nav">
            <Toolbar sx={{ bgcolor: "#708090", padding: "0 3rem" }}>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
                <Image src="/images/logo.png" width={200} height={50} alt="Logo" onClick={() => router.push("/")} />
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map(({ label, path }) => (
                  <Button key={label} component={Link} href={path} sx={{ color: "#fff" }}>
                    {label}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <nav>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ width: "100%" }}>
          {children}
        </Box>
      </Box>

      <footer className="footer">
        <Grid container spacing={3}>
          <Grid item md={4} sm={12} xs={12}>
            <Typography className="corpname" variant={isMobile ? "body1" : "h5"} gutterBottom>
              <b>巨將人力資源顧問有限公司</b>
            </Typography>
            <Box mt={2}>
              <Typography>
                <FontAwesomeIcon icon={faLocationDot} />
                <Link href="https://maps.app.goo.gl/XSiGu9tZtJGRhQV19" target="_blank">
                  106001 台北市大安區信義路二段
                </Link>
              </Typography>
              <Typography>
                <FontAwesomeIcon icon={faPhone} />
                <Link href="tel:0223569977">(02) 2356-9977</Link>
              </Typography>
              <Typography>
                <FontAwesomeIcon icon={faEnvelope} />
                <Link href="mailto:service@jujianghr.com.tw">service@jujianghr.com.tw</Link>
              </Typography>
              <Link href="https://www.facebook.com/Jujianghr" target="_blank">
                <FacebookIcon fontSize="large" color="primary" />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography>北市就服字 第0229號</Typography>
          <Typography>© 2012-{year} Ju Jiang Human Resources Consultant Co., Ltd.</Typography>
        </Box>
      </footer>
    </div>
  );
}
