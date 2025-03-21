// app/news/page.tsx
"use client";

import { Suspense } from "react";
import NewsContent from "@/app/components/NewsContent"

export default function NewsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewsContent />
    </Suspense>
  );
}
