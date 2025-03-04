'use client';

import { useState, useEffect } from 'react';
import JobPopup from './JobPopup';
import { Job, Pagination } from '@/types/jobs';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Skeleton from '@mui/material/Skeleton';

const JobManagement = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currPage, setCurrPage] = useState({ page: 0, limit: 10 });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`/api/jobs?page=${currPage.page}&limit=${currPage.limit}`);
        const data = await res.json();
        setJobs(data.jobs);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, [currPage]);

  return (
    <>
      <Button onClick={() => setPopupVisible(true)} variant="contained">新增職缺</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow><TableCell>職務名稱</TableCell><TableCell>工作地點</TableCell></TableRow>
          </TableHead>
          <TableBody>
            {jobs.map(job => (
              <TableRow key={job._id} onClick={() => setSelectedJob(job)}>
                <TableCell>{job.jobTitle}</TableCell><TableCell>{job.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isPopupVisible && <JobPopup jobs={jobs} updateJobsList={setJobs} job={selectedJob} emitPopup={setPopupVisible} open={isPopupVisible} />}
    </>
  );
};

export default JobManagement;
