import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION!, // ✅ 確保 region 設定正確
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ status: "error", message: "No file uploaded" }, { status: 400 });
    }

    const fileName = `${randomUUID()}-${file.name}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // 🔹 上傳到 S3
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.type,
      })
    );

    const imageUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;
    return NextResponse.json({ status: "success", imageUrl });
  } catch (error) {
    console.error("S3 上傳失敗:", error);
    return NextResponse.json({ status: "error", message: "S3 上傳失敗" }, { status: 500 });
  }
}
