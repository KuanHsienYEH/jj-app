import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const newsId = searchParams.get("newsId");

  if (!newsId) {
    return NextResponse.json({ status: "error", message: "Missing newsId" }, { status: 400 });
  }

  const fileKey = `news/${newsId}.jpg`; // **確認 S3 Key 路徑對應**

  try {
    await s3.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: fileKey,
    }));

    return NextResponse.json({ status: "success", message: "Image deleted" });
  } catch (error) {
    console.error("S3 刪除失敗:", error);
    return NextResponse.json({ status: "error", message: "Failed to delete image" }, { status: 500 });
  }
}
