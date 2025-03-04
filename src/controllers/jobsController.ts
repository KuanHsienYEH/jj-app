import Job from "../models/Job";
import { JobApiResponse, ApiResponse } from "../types/api";

export async function getJobs(page: number = 1, limit: number = 10, keyword?: string): Promise<JobApiResponse> {
  try {
    let query = Job.find();

    // 處理關鍵字搜尋
    if (keyword && keyword !== "null") {
      query = query.where({
        jobTitle: { $regex: keyword, $options: "i" },
      });
    }

    // 計算總數量
    const totalJobs = await Job.countDocuments(query.getQuery());

    // 分頁處理
    const startIndex = (page - 1) * limit;
    query = query.sort({ createDate: -1 }).skip(startIndex).limit(limit);

    // 執行查詢
    const jobs = await query.exec();

    return {
      status: "success",
      data:{
        jobs,
        pagination: {
          totalItems: totalJobs,
          totalPages: Math.ceil(totalJobs / limit),
          currentPage: page,
          pageSize: limit,
        },  
      }
    };
  } catch (error) {
    console.error("Error in getJobs:", error);
    return { status: "error", message: "Failed to fetch jobs" };
  }
}

export async function getJob(id: string): Promise<ApiResponse> {
  if (!id) return { status: "error", message: "Job ID is required" };
  const job = await Job.findById(id);
  if (job) return { status: "success", data: job };
  return { status: "error", message: "Job not found" };
}

export async function addJob(data: {
  jobTitle: string;
  location: string;
  salary: string;
  requirement: string;
  benefit: string;
  jobDetail: string;
  jobType: string;
  createDate: string;
  education: string;
  seniority: string;
}): Promise<ApiResponse> {
  await Job.create({ ...data, createDate: new Date(data.createDate) });
  return { status: "success", data: { res: "ok" } };
}

export async function updateJob(data: {
  _id: string;
  jobTitle: string;
  location: string;
  salary: string;
  requirement: string;
  benefit: string;
  jobDetail: string;
  jobType: string;
  createDate: string;
  education: string;
  seniority: string;
}): Promise<ApiResponse> {
  const result = await Job.updateOne(
    { _id: data._id },
    { $set: { ...data, createDate: new Date(data.createDate) } }
  );
  if (result.modifiedCount > 0) return { status: "success", data: { res: "ok" } };
  return { status: "error", message: "Job not found" };
}

export async function deleteJob(id: string): Promise<ApiResponse> {
  if (!id) return { status: "error", message: "Job ID is required" };
  const result = await Job.deleteOne({ _id: id });
  if (result.deletedCount > 0) return { status: "success", data: { res: "ok" } };
  return { status: "error", message: "Job not found" };
}