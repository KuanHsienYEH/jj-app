import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // 儲存 HTML 格式的內容
  date: { type: Date, default: Date.now },
  image: { type: String }, // 圖片 URL
  excerpt: { type: String }, // 摘要
});

export default mongoose.models.News || mongoose.model("News", NewsSchema);