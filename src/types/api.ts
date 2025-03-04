export interface ApiResponse {
  status: "success" | "error";
  data?: any; // 或更具體的 Job[] | { res: string }
  message?: string;
}

export interface JobApiResponse {
  status: "success" | "error";
  data?: any; // 或更具體的 Job[] | { res: string }
  message?: string;
}