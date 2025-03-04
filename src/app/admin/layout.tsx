import AdminMenu from "./components/AdminMenu";
import '../../styles/main.scss';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <AdminMenu />
      <main style={{ flexGrow: 1, padding: "20px" }}>{children}</main>
    </div>
  );
}
