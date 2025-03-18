"use client";

import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";

import Image from "next/image";
import { menuItems } from "@/lib/menuItems";
import { useRouter, usePathname } from "next/navigation";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? 0 : `-${drawerWidth}px`,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
  marginLeft: open ? `${drawerWidth}px` : 0,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [currentTab, setCurrentTab] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // 🔥 初始化為 `true`
  const router = useRouter();
  const pathname = usePathname();

  // ✅ 透過 API 檢查用戶登入狀態
  useEffect(() => {
    let isMounted = true; // 避免組件卸載後仍更新狀態
  
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
  
        if (!res.ok) throw new Error("Not authenticated");
  
        const data = await res.json();
        if (data.status !== "success") throw new Error("Not authenticated");
  
        if (isMounted) {
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setLoading(false);
          router.replace("/login"); // 🔥 只在錯誤時導向 `/login`
        }
      }
    };
  
    checkAuth();
  
    return () => {
      isMounted = false; // 避免內存洩漏
    };
  }, [router]);

  useEffect(() => {
    setCurrentTab(pathname.split("/")[2] || null);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" }); // ✅ 確保 Cookie 也會被清除
      router.replace("/login");
    } catch (error) {
      console.error("登出失敗:", error);
    }
  };

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleTabClick = (tab: string) => router.push(tab === "menu" ? "/admin" : `/admin/${tab}`);

  // ✅ 只有在驗證完成後，才渲染 UI，防止 `/admin` 閃爍
  if (loading) return null;

  const currentTitle = menuItems.find((item) => item.id === currentTab)?.text || "管理後台";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {currentTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <Image src="/images/logo.png" alt="logo" width={130} height={40} />
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, idx) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => handleTabClick(item.id)}
                selected={currentTab === item.id && idx !== 0}
                sx={{ cursor: "pointer", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" } }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <main>{children}</main>
      </Main>
    </Box>
  );
}
