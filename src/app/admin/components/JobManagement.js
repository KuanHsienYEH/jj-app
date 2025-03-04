import { useState, useEffect } from 'react';
import JobPopup from './JobPopup';
import agent from '../../apis/agent';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import JobTableBody from './JobTableBody'
import Skeleton from '@mui/material/Skeleton';

const TableHeader = () => {
    return(
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
    )
  }

function JobManagement() {
    const [jobs, setJobs] = useState([]);  
    const [selectedJob, setSelectedJob] = useState(null);  
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [paginationData, setPaginationData] = useState(null); 
    const [currPage, setCurrPage] = useState({ page: 0, limit: 10 });

    useEffect(() => {
        const getJobs = async () => {
          try {
              const { jobs, pagination, status } = await agent.jobs.getJobs( currPage );
              if (status === 'ok') {
                setJobs(jobs);
                setPaginationData(pagination);
                console.log(pagination)
              }
          } catch (e) {
            console.error('Error fetching job data:', e);
          }
        };
        getJobs();
      
      }, [currPage]); 

    const updateJobsList = (jobs) => {
        setJobs(jobs);
      };
    
    const editJob = (job) =>{
        setSelectedJob(job)
    } 

    const togglePopup = (status) =>{
        setPopupVisible(status)
    } 

    const addNewJob = () =>{
        setSelectedJob(null)
        setPopupVisible(true)
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
                        {jobs.map((job,idx) => (
                            <JobTableBody key={job._id} job={job} emitJob={editJob} emitPopup={togglePopup}/>
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
            {isPopupVisible &&
                <JobPopup jobs={jobs} 
                updateJobsList={updateJobsList} 
                job={selectedJob} 
                emitPopup={togglePopup} 
                open={isPopupVisible}/>
            }
            <Button style={{marginTop:'10px'}} variant="contained" disableElevation onClick={addNewJob}>新增職缺</Button>

        </>
    );
}
export default JobManagement;
