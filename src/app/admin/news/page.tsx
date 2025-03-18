"use client";

import { useState, useEffect } from "react";
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton } from "@mui/material";
import NewsPopup from "../components/NewsPopup";

interface NewsItem {
  _id?: string;
  title: string;
  content: string;
  image?: string;
  excerpt?: string;
  date?: string;
}

export default function NewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  // 🔹 獲取新聞列表
  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/news/get-news`);
      const data = await res.json();
      setNewsList(data?.data?.news || []);
    } catch (error) {
      console.error("獲取新聞失敗:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 提交新聞 (新增或更新)
  const handleSubmit = async () => {
    setUploading(true);
  
    const formData = new FormData();
    formData.append("data", JSON.stringify(selectedNews)); // ✅ 傳遞 JSON 資料
    if (selectedFile) {
      formData.append("file", selectedFile); // ✅ 傳遞圖片檔案
    }
  
    const endpoint = selectedNews?._id ? `/api/news/update-news/${selectedNews._id}` : "/api/news/add-news";
    const method = selectedNews?._id ? "PUT" : "POST";
  
    try {
      const res = await fetch(endpoint, { method, body: formData });
  
      if (!res.ok) {
        alert("新聞儲存失敗");
        setUploading(false);
        return;
      }
  
      alert(selectedNews?._id ? "新聞更新成功！" : "新聞發佈成功！");
      fetchNews();
      setPopupVisible(false);
    } catch (error) {
      console.error("❌ 提交新聞失敗:", error);
      alert("新聞提交失敗，請稍後重試");
    }
  
    setUploading(false);
  };

  // 🔹 刪除新聞
  const handleDelete = async (id: string) => {
    if (confirm("確定刪除此新聞？")) {
      try {
        await fetch(`/api/news/delete-news/${id}`, { method: "DELETE" });
        fetchNews();
      } catch (error) {
        console.error("刪除新聞失敗:", error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        最新消息
      </Typography>

      <Button
        variant="contained"
        sx={{mb:"30px"}}
        onClick={() => {
          setSelectedNews({ title: "", content: "", image: "", excerpt: "" });
          setPopupVisible(true);
        }}
      >
        新增新聞
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ whiteSpace: "nowrap", width: "20%" }}>標題</TableCell>
              <TableCell align="center" sx={{ whiteSpace: "nowrap", width: "50%" }}>摘要</TableCell>
              <TableCell align="center" sx={{ whiteSpace: "nowrap", width: "15%" }}>日期</TableCell>
              <TableCell align="center" sx={{ whiteSpace: "nowrap", width: "15%" }}>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Skeleton width="80%" height={50} />
                </TableCell>
              </TableRow>
            ) : (
              newsList.map((news) => (
                <TableRow key={news._id}>
                  <TableCell align="center" >{news.title}</TableCell>
                  <TableCell align="left">{news.excerpt || "無摘要"}</TableCell>
                  <TableCell align="center">{new Date(news.date || "").toLocaleDateString("zh-TW")}</TableCell>
                  <TableCell align="center" >
                    <Button
                      onClick={() => {
                        setSelectedNews(news);
                        setPopupVisible(true);
                      }}
                    >
                      編輯
                    </Button>
                    <Button color="error" onClick={() => handleDelete(news._id!)}>
                      刪除
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isPopupVisible && selectedNews && (
        <NewsPopup
          {...selectedNews}
          setTitle={(value) => setSelectedNews((prev) => ({ ...prev!, title: value }))}
          setContent={(value) => setSelectedNews((prev) => ({ ...prev!, content: value }))}
          setImage={(value) => setSelectedNews((prev) => ({ ...prev!, image: value }))}
          setExcerpt={(value) => setSelectedNews((prev) => ({ ...prev!, excerpt: value }))}
          handleSubmit={handleSubmit}
          onClose={() => setPopupVisible(false)}
          setSelectedFile={setSelectedFile}
          isEdit={!!selectedNews._id}
        />
      )}
    </Box>
  );
}
