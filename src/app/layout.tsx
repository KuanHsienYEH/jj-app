export const metadata = {
  title: "My Next.js App",
  description: "A modern Next.js app with TypeScript",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-tw">
      <body>{children}</body>
    </html>
  );
}
