// import { useEffect } from 'react';
// import { useForm } from "react-hook-form";
// import agent from '../../apis/agent';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faXmark } from '@fortawesome/free-solid-svg-icons';
// //import { solid } from '@fortawesome/fontawesome-svg-core' // <-- import styles to be used

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 600,
//     bgcolor: 'background.paper',
//     border: '1px solid #eee',
//     boxShadow: 24,
//     p: 4,
// };

// function JobPopup({jobs, updateJobsList, job, emitPopup, open }) {
    
//     const { register, handleSubmit, reset, formState: { errors }, setValue  } = useForm();
    
//     const updateJobs = (jobs) => {
//         updateJobsList(jobs)
//     }

//     useEffect(() => {
//         if (job) {
//           setValue('jobTitle', job.jobTitle);
//           setValue('location', job.location);
//           setValue('jobType', job.jobType);
//           setValue('salary', job.salary);
//           setValue('education', job.education);
//           setValue('seniority', job.seniority);
//           setValue('jobDetail', job.jobDetail);
//           setValue('requirement', job.requirement);
//         }
//     }, [job,setValue]);

//     const setModalClose = ()=>{
//         reset();
//         emitPopup(false)
//     }
    
//     const handleDelete = async (e)=>{
//         try{
//             const { res } = await agent.jobs.delete(job._id);
//             if (res === 'ok') {
//                 emitPopup(false);
//                 const newList = [...jobs.filter(j => j._id !== job._id)]
//                 updateJobs(newList);
//                 reset();
//                 alert('刪除成功');
//             }
//         }catch(e){
//             alert('刪除失敗')
//             throw e
//         }
       
//         e.preventDefault();
//     }

//     const onFormSumbit = async (formObj, e) => {
//         try{
//             if (job) {
//                 const { res } = await agent.jobs.update({_id:job._id, ...formObj});
//                 if (res === 'ok') {
//                   emitPopup(false);
//                   updateJobs([formObj, ...jobs.filter(j => j._id !== job._id)]);
//                   reset();
//                   alert('更新成功');
//                 }
//               } else {
//                 const { res } = await agent.jobs.add(formObj);
//                 if (res === 'ok') {
//                   emitPopup(false);
//                   updateJobs([formObj, ...jobs]);
//                   reset();
//                   alert('新增成功');
//                 }
//               }
//         }catch(e){
//             alert('新增失敗')
//             throw e
//         }
//         e.preventDefault();
//       };

//     return (
//         <div className='job-popup'>
//             <Modal
//                 open={open}
//                 // onClose={setModalColse}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style} onSubmit={handleSubmit(onFormSumbit)}>
//                     <div style={{display:'flex',justifyContent:'space-between',margin:'20px 0'}}>
//                         <Typography id="modal-modal-title" variant="h6" component="h2">
//                             {job ? '編輯職缺' : '新增職缺'}
//                         </Typography>
//                         <FontAwesomeIcon onClick={()=>setModalClose()} cursor='pointer' icon={faXmark} size="x"/>
//                         {/* <FontAwesomeIcon onClick={()=>setModalClose()} style={{'color':'red',cursor:'pointer'}} icon={solid('xmark')} size="2x"/> */}
//                     </div>
//                     <Box
//                     component="form"
//                     sx={{
//                         '& > :not(style)': { m: 1, width: '70%' },
//                     }}
//                     noValidate
//                     autoComplete="off"
//                     style={{overflowY:'scroll',maxHeight:'80vh'}}
//                     >
//                         <TextField
//                             {...register("jobTitle",{required:'this is required'})} 
//                             error={!!errors.jobTitle}
//                             id="standard-error-helper-text"
//                             label="職務名稱"
//                             helperText={errors.jobTitle?.message}
//                             variant="standard"
//                             />
//                         <TextField
//                             {...register("location",{required:'this is required'})} 
//                             error={!!errors.location}
//                             id="standard-error-helper-text"
//                             label="工作地點"
//                             helperText={errors.location?.message}
//                             variant="standard"
//                             />
//                         <TextField
//                             {...register("jobType",{required:'this is required'})} 
//                             error={!!errors.jobType}
//                             id="standard-error-helper-text"
//                             label="工作性質"
//                             helperText={errors.jobType?.message}
//                             variant="standard"
//                             />
//                         <TextField
//                             {...register("salary",{required:'this is required'})} 
//                             error={!!errors.salary}
//                             id="standard-error-helper-text"
//                             label="薪資待遇"
//                             helperText={errors.salary?.message}
//                             variant="standard"
//                             />
//                         <TextField
//                             {...register("education",{required:'this is required'})} 
//                             error={!!errors.education}
//                             id="standard-error-helper-text"
//                             label="學歷科系"
//                             helperText={errors.education?.message}
//                             variant="standard"
//                             />
//                         <TextField
//                             {...register("seniority",{required:'this is required'})} 
//                             error={!!errors.seniority}
//                             id="standard-error-helper-text"
//                             label="工作年資"
//                             helperText={errors.seniority?.message}
//                             variant="standard"
//                             />
//                         <TextField
//                             {...register("jobDetail",{required:'this is required'})} 
//                             error={!!errors.jobDetail}
//                             id="standard-error-helper-text"
//                             label="工作內容"
//                             helperText={errors.jobDetail?.message}
//                             variant="standard"
//                             multiline
//                             minRows={6}
//                             />
//                         <TextField
//                             {...register("requirement",{required:'this is required'})} 
//                             error={!!errors.requirement}
//                             id="standard-error-helper-text"
//                             label="其他條件"
//                             helperText={errors.requirement?.message}
//                             variant="standard"
//                             multiline
//                             minRows={6}
//                             />
//                         <Stack direction="row" spacing={2}>
//                             <Button size="medium" style={{marginTop:'10px'}} variant="contained" disableElevation
//                             onClick={handleSubmit(onFormSumbit)}>儲存</Button>
//                             {job && <Button size="medium"  style={{marginTop:'10px'}} variant="contained"  color="error" disableElevation
//                             onClick={handleDelete}>刪除</Button>}
//                         </Stack>
//                     </Box>
//                 </Box>
//             </Modal>
//         </div>
//     );
// }
// export default JobPopup;
