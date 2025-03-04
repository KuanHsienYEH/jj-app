import AdminBoard from "./components/AdminBoard";
import { menuItems } from "../../lib/menuItems";

export default function AdminPage() {
  return <AdminBoard menuItems={menuItems} />;
}