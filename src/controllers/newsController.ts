import News from "@/models/News";
import { ApiResponse } from "@/types/api";
import { S3Client, DeleteObjectCommand,PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";


const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET!;
const S3_REGION = process.env.AWS_REGION!;

/** ✅ 刪除 S3 上的圖片 */
async function deleteImageFromS3(imageUrl: string) {
  try {
    const key = imageUrl.split("/").pop();
    if (!key) throw new Error("無法解析 S3 圖片 Key");

    await s3.send(new DeleteObjectCommand({ Bucket: S3_BUCKET_NAME, Key: key }));
    console.log(`✅ S3 圖片刪除成功: ${imageUrl}`);
  } catch (error) {
    console.error("❌ 刪除 S3 圖片失敗:", error);
  }
}

/** ✅ 上傳 S3  */
async function uploadImageToS3(file: File): Promise<{ status: string; imageUrl?: string }> {
    try {
      const fileExt = mime.extension(file.type) || "jpg";
      const key = `news/${uuidv4()}.${fileExt}`; // ✅ 生成唯一 S3 Key
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      await s3.send(new PutObjectCommand({ Bucket: S3_BUCKET_NAME, Key: key ,Body: fileBuffer, ContentType: file.type,}));
      return { status: "success", imageUrl: `https://${S3_BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com/${key}` };
    } catch (error) {
      console.error("❌ S3 圖片上傳失敗:", error);
      return { status: "error" };
    }
  }

/** ✅ 取得新聞列表 */
export async function getNews(page: number = 1, limit: number = 10, keyword?: string): Promise<ApiResponse> {
  try {
    let query = News.find();

    if (keyword && keyword !== "null") {
      query = query.where({ title: { $regex: keyword, $options: "i" } });
    }

    const totalNews = await News.countDocuments(query.getQuery());
    const startIndex = (page - 1) * limit;
    query = query.sort({ date: -1 }).skip(startIndex).limit(limit);

    const news = await query.exec();

    return {
      status: "success",
      data: {
        news,
        pagination: {
          totalItems: totalNews,
          totalPages: Math.ceil(totalNews / limit),
          currentPage: page,
          pageSize: limit,
        },
      },
    };
  } catch (error) {
    console.error("❌ getNews 錯誤:", error);
    return { status: "error", message: "Failed to fetch news" };
  }
}

/** ✅ 透過 ID 取得新聞 */
export async function getNewsById(id: string): Promise<ApiResponse> {
  if (!id) return { status: "error", message: "News ID is required" };
  const news = await News.findById(id);
  return news ? { status: "success", data: news } : { status: "error", message: "News not found" };
}

/** ✅ 新增新聞 */
export async function addNews(data: {
  title: string;
  content: string;
  image?: string;
  excerpt?: string;
  newImageFile: File; 
}): Promise<ApiResponse> {
  try {
    const { title, content, excerpt, newImageFile } = data;

    const uploadResult = await uploadImageToS3(newImageFile);
    if (uploadResult.status === "error") {
        return { status: "error", message: "S3 圖片上傳失敗" };
    }

    const news = await News.create({ 
        title, 
        content, 
        excerpt, 
        image: uploadResult.imageUrl, // ✅ 更新 image 欄位
        date: new Date() 
      });

    return { status: "success", data: news };
  } catch (error) {
    console.error("❌ addNews 錯誤:", error);
    return { status: "error", message: "Failed to add news" };
  }
}


export async function updateNews(data: {
  _id: string;
  title: string;
  content: string;
  image?: string;
  excerpt?: string;
  newImageFile?: File; // ✅ 如果有新圖片，這裡會收到前端傳來的 `File`
}): Promise<ApiResponse> {
  try {
    const { _id, title, content, excerpt, newImageFile } = data;

    // ✅ 1. 取得舊新聞
    const oldNews = await News.findById(_id);
    if (!oldNews) return { status: "error", message: "News not found" };

    let imageUrl = oldNews.image; // 預設使用舊圖片

    // ✅ 2. 如果有新圖片，則：
    //    - 先上傳新圖片到 S3
    //    - 刪除舊圖片
    if (newImageFile) {
      const uploadResult = await uploadImageToS3(newImageFile);
      if (uploadResult.status === "error") {
        return { status: "error", message: "S3 圖片上傳失敗" };
      }
      imageUrl = uploadResult.imageUrl; // ✅ 替換為新的圖片 URL

      // ✅ 刪除舊圖片
      if (oldNews.image) {
        await deleteImageFromS3(oldNews.image);
      }
    }

    // ✅ 3. 更新 MongoDB
    const result = await News.updateOne({ _id }, { 
      $set: { title, content, excerpt, image: imageUrl }
    });

    if (result.modifiedCount > 0) return { status: "success", data: { res: "ok" } };
    return { status: "error", message: "News update failed" };
  } catch (error) {
    console.error("❌ 更新新聞失敗:", error);
    return { status: "error", message: "Failed to update news" };
  }
}
  

/** ✅ 刪除新聞 */
export async function deleteNews(id: string): Promise<ApiResponse> {
  try {
    if (!id) return { status: "error", message: "News ID is required" };

    // ✅ 1. 取得新聞，確認是否有圖片
    const news = await News.findById(id);
    if (!news) return { status: "error", message: "News not found" };

    // ✅ 2. 如果有圖片，先刪除 S3 上的圖片
    if (news.image) {
      console.log(`🟢 刪除 S3 圖片: ${news.image}`);
      await deleteImageFromS3(news.image);
    }

    // ✅ 3. 刪除 MongoDB 的新聞
    const result = await News.deleteOne({ _id: id });

    return result.deletedCount > 0
      ? { status: "success", message: "新聞刪除成功" }
      : { status: "error", message: "News not found" };
  } catch (error) {
    console.error("❌ 刪除新聞失敗:", error);
    return { status: "error", message: "Failed to delete news" };
  }
}
