export interface Job {
    _id: string;
    jobTitle: string;
    location: string;
    jobType: string;
    salary: string;
    education: string;
    seniority: string;
    jobDetail: string;
    requirement: string;
    isActive: boolean;
  }
  
  export interface Pagination {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    perPage: number;
    pageSize:number;
  }
  