'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Footer from './components/Footer';
import "@/styles/main.scss"; // Ensure this file exists

interface HideOnScrollProps {
  children: React.ReactElement;
}

interface NavItem {
  label: string;
  path: string;
  subItems?: { label: string; path: string }[];
}

const drawerWidth = 240;

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  {
    label: "About",
    path: "/about",
    subItems: [
      { label: "公司介紹", path: "/about/company-profile" },
      { label: "許可證", path: "/about/license" },
      { label: "歷年評鑑成績", path: "/about/evaluation-results" },
    ],
  },
  { label: "Contact", path: "/contact" },
];

function HideOnScroll({ children }: HideOnScrollProps) {
  const trigger = useScrollTrigger();
  return <Slide appear={false} direction="down" in={!trigger}>{children}</Slide>;
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // 控制下拉選單
  const router = useRouter();
  const year = new Date().getFullYear();
  const isMobile = useMediaQuery("(max-width:425px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
    <html>
      <body>
      <div className="layout">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <HideOnScroll>
          <AppBar component="nav">
            <Toolbar
              sx={{
                bgcolor: "#2E4A7D",
                padding: "0 3rem",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Box
                  sx={{
                    bgcolor: "#FFFFFF",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    display: "inline-block",
                  }}
                >
                  <Image
                    src="/images/logo.png"
                    width={200}
                    height={50}
                    alt="Logo"
                    onClick={() => router.push("/")}
                    style={{ cursor: "pointer" }}
                  />
                </Box>
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map(({ label, path, subItems }) => (
                  <Box key={label} sx={{ display: "inline-block" }}>
                    {subItems ? (
                      <>
                        <Button
                          onMouseEnter={handleMenuOpen}
                          sx={{
                            color: "#FFFFFF",
                            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                          }}
                        >
                          {label}
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                          MenuListProps={{ onMouseLeave: handleMenuClose }}
                          disableScrollLock={true}
                          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                          transformOrigin={{ vertical: "top", horizontal: "left" }}
                          sx={{
                            "& .MuiPaper-root": {
                              bgcolor: "#F5F7FA",
                              color: "#333333",
                              minWidth: "200px",
                              maxWidth: "300px",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                              border: "1px solid #E0E5EA",
                            },
                          }}
                        >
                          {subItems.map((subItem) => (
                            <MenuItem
                              key={subItem.label}
                              component={Link}
                              href={subItem.path}
                              onClick={handleMenuClose}
                              sx={{
                                "&:hover": { bgcolor: "#E0E5EA" },
                                padding: "10px 24px",
                                borderBottom: "1px solid #E0E5EA",
                                "&:last-child": { borderBottom: "none" },
                                textAlign: "center",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {subItem.label}
                            </MenuItem>
                          ))}
                        </Menu>
                      </>
                    ) : (
                      <Button
                        component={Link}
                        href={path}
                        sx={{
                          color: "#FFFFFF",
                          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                        }}
                      >
                        {label}
                      </Button>
                    )}
                  </Box>
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
        <Box component="main" sx={{ width: "100%" , margin:"120px 0"}}>
          {children}
        </Box>
      </Box>
      <Footer year={year} />
    </div>
      </body>
    </html>
  );
}