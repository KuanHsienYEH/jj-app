import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark,faCircle,faGear } from '@fortawesome/free-solid-svg-icons';
// import { solid, regular } from '@fortawesome/fontawesome-svg-core' // <-- import styles to be used

const JobTableBody =({job, emitJob,emitPopup }) =>{
    const handleClickSetting = (job)=>{
        emitJob(job)
        emitPopup(true)
    }
    return(
        <TableRow
            key={job._id}
            sx={{ '&:last-child TableCell, &:last-child th': { border: 0 } }}
        >
            <TableCell>
            {/* <FontAwesomeIcon color={job.isActive?'lightgreen':'red'} icon={faCircle} /> */}

                {job.isActive ? 
                <FontAwesomeIcon size="2x" color='red' icon={faXmark} />:
                <FontAwesomeIcon size="2x" color='lightgreen' icon={faCircle} />}
                 {/* <FontAwesomeIcon style={{'color':'lightgreen'}} icon={regular('circle')} size="2x" /> :
                 <FontAwesomeIcon style={{'color':'lightgray'}} icon={solid('xmark')} size="2x"/>} */}
            </TableCell>
            <TableCell>{job.jobTitle}</TableCell>
            <TableCell>{job.location}</TableCell>
            <TableCell>{job.jobType}</TableCell>
            <TableCell>{job.salary}</TableCell>
            <TableCell>{job.education}</TableCell>
            <TableCell>{job.seniority}</TableCell>
            <TableCell>
                {/* <FontAwesomeIcon style={{cursor:'pointer'}}  onClick={(e)=>handleClickSetting(job)} color="grey" icon={solid('gear')} size="2x" /> */}
                <FontAwesomeIcon size="2x" color='DodgerBlue ' style={{cursor:'pointer'}} onClick={(e)=>handleClickSetting(job)} icon={faGear} />
                </TableCell>
        </TableRow>
    )
}

export default JobTableBody