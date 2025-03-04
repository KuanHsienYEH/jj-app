"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from "@mui/material";
import Image from "next/image";
import { MenuItem, menuItems, MENU_ID } from "@/lib/menuItems";
import { ChevronLeft, Menu as MenuIcon } from "@mui/icons-material";

export default function AdminMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const toggleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleTabClick = (tab: string) => {
    const newPath = tab === MENU_ID.MENU ? "/admin" : `/admin/${tab}`;
    router.push(newPath);
  };

  const currentTab = pathname.split("/")[2] || MENU_ID.MENU;

  return (
    <Drawer
      sx={{
        width: open ? 200 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 200 : 60,
          boxSizing: "border-box",
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Header 包含 Logo & 收合按鈕 */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1, height: 64 }}>
        {open && (
          <Box
            sx={{ cursor: "pointer", flexGrow: 1, display: "flex", justifyContent: "center" }} // ✅ 讓 Logo 置中
            onClick={() => handleTabClick("menu")}
          >
            <Image src="/images/logo.png" alt="Logo" width={120} height={50} priority />
          </Box>
        )}
        <IconButton
          color="inherit"
          aria-label={open ? "close drawer" : "open drawer"}
          onClick={toggleDrawerOpen}
          sx={{ ml: open ? 0 : "auto" }} // 收合按鈕靠右對齊
        >
          {open ? <ChevronLeft /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Divider /> {/* ✅ 增加分隔線，讓 UI 更清晰 */}

      {/* Menu List */}
      <List sx={{ px: 0, flexGrow: 1 }}>
        {menuItems
          .filter((item) => item.id !== "menu")
          .map((menuItem) => (
            <ListItem
              key={menuItem.id}
              onClick={() => handleTabClick(menuItem.id)}
              selected={currentTab === menuItem.id}
              sx={{
                minHeight: 48,
                transition: "background-color 0.2s ease-in-out",
                px: open ? 2 : 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              {/* Icon 保持對齊 */}
              <ListItemIcon
                sx={{
                  minWidth: 48,
                  justifyContent: "center",
                }}
              >
                {menuItem.icon}
              </ListItemIcon>

              {/* 文字對齊 & 隱藏動畫 */}
              <ListItemText
                primary={menuItem.text}
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  transition: "opacity 0.2s ease-in-out",
                  opacity: open ? 1 : 0,
                  visibility: open ? "visible" : "hidden",
                }}
              />
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
}

