import { useState, useEffect } from 'react';
import agent from '../../apis/agent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Skeleton from '@mui/material/Skeleton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const JobSeekerList=({jobSeeker})=>{

    const utcDate = new Date(jobSeeker.updatedAt);

    // 将 UTC 时间转换为本地时间（UTC+8）
    const localDate = new Date(utcDate.getTime() + (8 * 60 * 60 * 1000)); // 将 UTC 时间加上8小时的时间偏移量

    // 格式化本地时间
    const formattedDate = localDate.toLocaleString(); // 使用 toLocaleString() 方法将日期格式化为本地时间字符串


    return(
        <TableRow
            key={jobSeeker._id}
            sx={{ '&:last-child TableCell, &:last-child th': { border: 0 } }}
        >
            <TableCell>{jobSeeker.name}</TableCell>
            <TableCell>{jobSeeker.gender == 'male' ? "男" : "女"}</TableCell>
            <TableCell>{jobSeeker.email}</TableCell>
            <TableCell>
                <a href={jobSeeker.resume} download>
                <CloudDownloadIcon/>
                </a>
            </TableCell>
            <TableCell>{formattedDate}</TableCell>
        </TableRow>
    )
}

const TableHeader = () => {
    return(
      <TableHead>
        <TableRow>
          <TableCell><pre>姓名</pre></TableCell>
          <TableCell><pre>性別</pre></TableCell>
          <TableCell><pre>email</pre></TableCell>
          <TableCell><pre>履歷</pre></TableCell>
          <TableCell><pre>投遞時間</pre></TableCell>
          {/* <TableCell><pre>備註</pre></TableCell> */}
        </TableRow>
      </TableHead>
    )
  }

function ApplicationRecord() {
    const [jobSeekers, setJobSeekers] = useState([]);  
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [paginationData, setPaginationData] = useState(null); 
    const [currPage, setCurrPage] = useState({ page: 0, limit: 10 });

    useEffect(() => {
        const getJobSeekers = async () => {
          try {
              const { jobSeekers, pagination, status } = await agent.jobSeeker.getJobSeekers( currPage );
              if (status === 'ok') {
                console.log(jobSeekers);
                setJobSeekers(jobSeekers);
                setPaginationData(pagination);
                console.log(pagination)
              }
          } catch (e) {
            console.error('Error fetching job data:', e);
          }
        };
        getJobSeekers();
      
      }, [currPage]); 



    const togglePopup = (status) =>{
        setPopupVisible(status)
    } 

    const handleChangePage = (event, newPage) => {
        console.log(newPage)
        setCurrPage({...currPage, page: newPage});
    };
    const handleChangeRowsPerPage = (event) => {
      setCurrPage({...currPage, limit: event.target.value});
    };

    return (
        <>
            {paginationData ?
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 80+'vh' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHeader/>
                        <TableBody>
                        {jobSeekers.map((jobSeeker) => (
                            <JobSeekerList key={jobSeeker._id} jobSeeker={jobSeeker}/>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={paginationData.totalItems||10}
                    rowsPerPage={currPage.limit}
                    page={currPage.page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </Paper>
                :
                <Skeleton variant="rectangular" sx={{mt:1}} height={650} />
            }
        </>
    );
}
export default ApplicationRecord;
