'use client'

import { menuItems } from "@/lib/menuItems";
import { Container, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter, usePathname } from "next/navigation";
import "@/styles/main.scss"; // 匯入全局 SCSS


export default function AdminPage() {
  const router = useRouter();
  const pathname = usePathname();
  const currentTab = pathname.split("/")[2] || "menu";
  const handleTabClick = (tab: string) => {
    router.push(tab === "manage-menu" ? "/admin" : `/admin/${tab}`);
  };
  
  return (
    <Container sx={{mt:4}}>
        <List className="menu"> 
            {menuItems.filter(item => item.id != 'menu').map(item => (
                <ListItem onClick={() => handleTabClick(item.id)} key={item.id} className="menuItem">
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} className="menuItemText" />
                </ListItem>
            ))}
        </List>
    </Container>
  )
}