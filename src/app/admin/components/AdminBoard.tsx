"use client"; // 因為使用了 onTabClick，需要客戶端邏輯

import { useRouter } from "next/navigation";
import { Container, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { MenuItem, menuItems, MENU_ID } from "../../../lib/menuItems";

interface AdminBoardProps {
  menuItems: MenuItem[] | undefined;
}

export default function AdminBoard({ menuItems }: AdminBoardProps) {
  const router = useRouter();

  const handleTabClick = (id: string) => {
    const newPath = id === MENU_ID.MENU ? "/admin" : `/admin/${id}`;
    router.push(newPath);
  };

  if (!Array.isArray(menuItems)) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">選單項數據無效</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <List className="menu">
        {menuItems
          .filter((item) => item.id !== "menu")
          .map((item) => (
            <ListItem
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className="menuItem"
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} className="menuItemText" />
            </ListItem>
          ))}
      </List>
    </Container>
  );
}