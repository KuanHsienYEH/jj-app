import { ManageAccounts, Email, EditNote, HowToReg, Article, Message } from "@mui/icons-material";

export const MENU_ID = Object.freeze({
  MENU: "menu",
  ACCOUNT: "account",
  EMAIL: "email",
  JOBS: "jobs",
  JOBSEEKERS: "jobseekers",
  ARTICLE: "article",
  MESSAGE: "message",
});

export interface MenuItem {
  id: string;
  icon?: React.ReactNode; // 正確使用 React.ReactNode 作為類型
  text?: string;
}

export const menuItems: MenuItem[] = [
  { id: MENU_ID.MENU },
  { id: MENU_ID.ACCOUNT, icon: <ManageAccounts />, text: "帳號管理" },
  { id: MENU_ID.EMAIL, icon: <Email />, text: "收件人管理" },
  { id: MENU_ID.JOBS, icon: <EditNote />, text: "職缺管理" },
  { id: MENU_ID.JOBSEEKERS, icon: <HowToReg />, text: "應徵紀錄" },
  { id: MENU_ID.ARTICLE, icon: <Article />, text: "文章管理" },
  { id: MENU_ID.MESSAGE, icon: <Message />, text: "訊息管理" },
];