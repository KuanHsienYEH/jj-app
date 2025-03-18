import { useState } from "react";
import {
  Modal,
  Button,
  TextField,
  Typography,
  Card,
  CardMedia,
  CardActions,
} from "@mui/material";
import { CloudUpload, Cached } from "@mui/icons-material";
import TiptapEditor from "./TiptapEditor";

interface NewsPopupProps {
  title: string;
  content: string;
  image: string;
  excerpt: string;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  setImage: (value: string) => void;
  setExcerpt: (value: string) => void;
  onClose: () => void;
  isEdit: boolean;
  handleSubmit: () => void; // ✅ 來自 `NewsPage.tsx`
  uploading: boolean; // ✅ 來自 `NewsPage.tsx`
  setSelectedFile: (file: File | null) => void; // ✅ 讓 `NewsPage.tsx` 管理圖片
}

export default function NewsPopup({
  title,
  content,
  image,
  excerpt,
  setTitle,
  setContent,
  setImage,
  setExcerpt,
  onClose,
  isEdit,
  handleSubmit,
  uploading,
  setSelectedFile,
}: NewsPopupProps) {

  // ✅ 讓使用者選擇圖片，但先不上傳
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      alert("只允許上傳 JPG、PNG 或 GIF 圖片");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("圖片大小不可超過 2MB");
      return;
    }

    setSelectedFile(file); // ✅ 讓 `NewsPage.tsx` 處理圖片上傳
    setImage(URL.createObjectURL(file)); // 預覽圖片
  };

  return (
    <Modal open={true} onClose={onClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          width: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {isEdit ? "編輯新聞" : "新增新聞"}
        </Typography>

        {/* ✅ 標題 */}
        <TextField label="標題" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth required margin="normal" />

        {/* ✅ 上傳圖片按鈕 */}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          新聞封面圖片
        </Typography>
        

        {/* ✅ 預覽圖片 */}
        {image ? (
          <Card sx={{ maxWidth: "100%", mt: 2 }}>
            <CardMedia component="img" height="200" image={image} alt="新聞圖片" />
            <CardActions>
              <Button size="small" color="error" startIcon={<Cached />} onClick={() => {
                setImage("");
                setSelectedFile(null);
              }}>
                更新圖片
              </Button>
            </CardActions>
          </Card>
        ):(
          <>
            <input type="file" accept="image/*" style={{ display: "none" }} id="upload-image" onChange={handleImageSelect} />
            <label htmlFor="upload-image">
            <Button variant="outlined" component="span" startIcon={<CloudUpload />} fullWidth sx={{ mt: 1, mb: 1 }}>
                選擇圖片 (最大 2MB, JPG/PNG/GIF)
            </Button>
            </label>
          </>
        )}

        {/* ✅ 摘要 */}
        <TextField label="摘要" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} fullWidth multiline rows={3} margin="normal" />

        {/* ✅ 內容 */}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          內容
        </Typography>
        <TiptapEditor value={content} onChange={setContent} />

        {/* ✅ 提交按鈕 */}
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ mt: 3 }} disabled={uploading}>
          {uploading ? "提交中..." : isEdit ? "更新" : "發佈"}
        </Button>
      </div>
    </Modal>
  );
}
