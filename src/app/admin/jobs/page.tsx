"use client";

import { useState, useEffect, useCallback } from "react";
import JobPopup from "../components/JobPopup";
import { Job, Pagination } from "@/types/jobs";
import { JobApiResponse } from "@/types/api";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { debounce } from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark,faCircle,faGear } from '@fortawesome/free-solid-svg-icons';



export default function JobPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currPage, setCurrPage] = useState({ page: 1, limit: 10, keyword: "" });
  const [loading, setLoading] = useState(true);

  // ✅ 請求 API 取得職缺資料
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/jobs/get-jobs?page=${currPage.page}&limit=${currPage.limit}&keyword=${currPage.keyword}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data: JobApiResponse = await res.json();

        if (data.status === "success" && data.data) {
          setJobs(data.data.jobs);
          setPagination(data.data.pagination);
        } else {
          console.error("Invalid response:", data);
          setJobs([]);
          setPagination(null);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currPage]);

  // ✅ 使用 debounce 處理搜尋輸入，避免過多 API 請求
  const handleSearchChange = useCallback(
    debounce((keyword: string) => {
      setCurrPage((prev) => ({ ...prev, keyword, page: 1 }));
    }, 500), // 500ms 延遲
    []
  );

  // ✅ 更新分頁
  const handlePageChange = (_event: unknown, newPage: number) => {
    setCurrPage({ ...currPage, page: newPage + 1 });
  };

  // ✅ 更新每頁顯示筆數
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrPage({ ...currPage, limit: parseInt(event.target.value, 10), page: 1 });
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4, p: 4, borderRadius: 2, boxShadow: 3 }}>
      {/* ✅ 標題置中 & 加粗 */}
      

      {/* ✅ 搜尋 & 按鈕置於同一行 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          color="primary"
          gutterBottom
          sx={{ flex: 1, textAlign: "center" }}
        >
          職缺管理
      </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "primary.main",
            color: "white",
            px: 3,
            py: 1.5,
            borderRadius: 2,
            boxShadow: 2,
            "&:hover": { bgcolor: "primary.dark" }
          }}
          onClick={() => {
            setSelectedJob(null);
            setPopupVisible(true);
          }}
        >
          新增職缺
        </Button>
      </Box>
      <TextField
          label="搜尋職缺"
          variant="outlined"
          fullWidth
          onChange={(e) => handleSearchChange(e.target.value)}
        />

      {/* ✅ 職缺表格 */}
      <Table>
        <TableHead>
          <TableRow>
           <TableCell><pre>顯示</pre></TableCell>
           <TableCell><pre>職務名稱</pre></TableCell>
           <TableCell><pre>工作地點</pre></TableCell>
           <TableCell><pre>工作性質</pre></TableCell>
           <TableCell><pre>薪資待遇</pre></TableCell>
           <TableCell><pre>學歷科系</pre></TableCell>
           <TableCell><pre>工作年資</pre></TableCell>
           <TableCell><pre>編輯</pre></TableCell>
         </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            // ✅ 載入中 (Skeleton)
            Array.from(new Array(currPage.limit)).map((_, index) => (
              <TableRow key={index}>
                <TableCell colSpan={8}>
                  <Skeleton variant="rectangular" width="100%"  height={50} />
                </TableCell>
              </TableRow>
            ))
          ) : jobs.length > 0 ? (
            // ✅ 顯示職缺資料
            jobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>
                {job.isActive ? 
                <FontAwesomeIcon size="2x" color='red' icon={faXmark} />:
                <FontAwesomeIcon size="2x" color='lightgreen' icon={faCircle} />}
                </TableCell>
                <TableCell>{job.jobTitle}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.jobType}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>{job.education}</TableCell>
                <TableCell>{job.seniority}</TableCell>
                
                <TableCell>
                  <Button variant="outlined" onClick={() => {
                    setSelectedJob(job);
                    setPopupVisible(true);
                  }}>
                    編輯
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            // ✅ 沒有職缺資料
            <TableRow>
              <TableCell colSpan={4} align="center">無職缺數據</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ✅ 分頁控制 */}
      {pagination && (
        <TablePagination
          component="div"
          count={pagination.totalItems || 0}
          rowsPerPage={currPage.limit}
          page={currPage.page - 1}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[10, 25, 50]}
        />
      )}

      {/* ✅ 職缺編輯彈窗 */}
      {isPopupVisible && (
        <JobPopup
          jobs={jobs}
          updateJobsList={setJobs}
          job={selectedJob}
          emitPopup={setPopupVisible}
          open={isPopupVisible}
        />
      )}
    </TableContainer>
  );
}
