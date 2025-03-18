"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Card, CardContent, CardMedia, Typography, Button, Pagination } from "@mui/material";

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  image?: string;
  excerpt?: string;
  date: string;
}

interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

interface NewsApiResponse {
  status: "success" | "error";
  data?: {
    news: NewsItem[];
    pagination: Pagination;
  };
  message?: string;
}

export default function NewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
  });
  const keyword = searchParams.get("keyword") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    fetchNews();
  }, [page, keyword]);

  const fetchNews = async () => {
    const res = await fetch(
      `/api/news/get-news?page=${page}&limit=10&keyword=${encodeURIComponent(keyword)}`,
      { cache: "no-store" }
    );
    const data: NewsApiResponse = await res.json();
    if (data.status === "success" && data.data) {
      setNews(data.data.news);
      setPagination(data.data.pagination);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography align="center" variant="h4" gutterBottom>
      最新消息
      </Typography>
      <Typography align="center" variant="h6" gutterBottom>
      最新法規動態、防詐安全提醒與企業榮耀資訊
      </Typography>
      {news.map((item) => (
        <Card key={item._id} sx={{ display: "flex", mb: 2, p: 2 }}>
          {item.image && (
            <CardMedia
              component="img"
              sx={{ width: 200, height: 150, objectFit: "cover", mr: 2 }}
              image={item.image}
              alt={item.title}
            />
          )}
          <Box sx={{ flex: 1 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Button variant="outlined" size="small">
                  最新動態
                </Button>
                <Typography variant="caption" color="text.secondary">
                  {new Date(item.date).toLocaleDateString("zh-TW")}
                </Typography>
              </Box>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {item.excerpt}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
      <Pagination
        count={pagination.totalPages}
        page={pagination.currentPage}
        onChange={handlePageChange}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
}