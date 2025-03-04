export type ApiResponse<T = any> = {
    status: "ok" | "error";
    data?: T;
    message?: string;
  };