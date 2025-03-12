// // app/jobs/components/JobBoard.tsx
// 'use client';

// import { useState, useEffect, useRef, useTransition } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { 
//   Container, Paper, Box, TextField, Grid, 
//   Typography, Stack, Skeleton, CircularProgress, IconButton, Alert 
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import DeleteIcon from '@mui/icons-material/Delete';
// import JobList from './JobList';
// import JobDetail from './JobDetail';
// import JobApplyModal from './JobModal';
// import { Job } from '../types';
// import { getJobs } from '../actions';
// import { updateSearchParams } from '../utils';

// interface JobBoardProps {
//   initialJobs: Job[];
//   keyword: string;
//   hasMore: boolean;
// }

// export function JobBoard({ initialJobs, keyword, hasMore }: JobBoardProps) {
//   const [jobs, setJobs] = useState(initialJobs);
//   const [currJob, setCurrJob] = useState<Job | null>(initialJobs[0] || null);
//   const [searchTerm, setSearchTerm] = useState(keyword);
//   const [isPending, startTransition] = useTransition();
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [hasMoreJobs, setHasMoreJobs] = useState(hasMore);
//   const [error, setError] = useState<string | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const observerRef = useRef<HTMLDivElement>(null);
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const offset = useRef(initialJobs.length);

//   const loadMoreJobs = async () => {
//     if (isLoadingMore || !hasMoreJobs) return;

//     setIsLoadingMore(true);
//     setError(null);
//     const response = await getJobs({
//       keyword,
//       offset: offset.current,
//     });

//     if (response.status === 'error') {
//       setError(response.message || 'Failed to load more jobs');
//       setIsLoadingMore(false);
//       return;
//     }

//     setJobs((prev) => [...prev, ...response.jobs]);
//     setHasMoreJobs(response.hasMore);
//     offset.current += response.jobs.length;
//     setIsLoadingMore(false);
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasMoreJobs && !isLoadingMore) {
//           loadMoreJobs();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     const currentObserverRef = observerRef.current;
//     if (currentObserverRef) {
//       observer.observe(currentObserverRef);
//     }

//     return () => {
//       if (currentObserverRef) {
//         observer.unobserve(currentObserverRef);
//       }
//     };
//   }, [hasMoreJobs, isLoadingMore]);

//   const handleSearch = () => {
//     const filteredString = searchTerm.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, '');
//     if (filteredString !== keyword) {
//       startTransition(() => {
//         router.push(updateSearchParams({ keyword: filteredString }));
//         setJobs([]);
//         setError(null);
//         offset.current = 0;
//         setHasMoreJobs(true);
//       });
//     }
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//     startTransition(() => {
//       router.push(updateSearchParams({ keyword: '' }));
//       setJobs([]);
//       setError(null);
//       offset.current = 0;
//       setHasMoreJobs(true);
//     });
//   };

//   return (
//     <Container>
//       <Box className="search">
//         <Paper
//           component="form"
//           elevation={0}
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSearch();
//           }}
//         >
//           <Box className="search-box">
//             <TextField
//               sx={{ mb: 1, ml: 1, flex: 1 }}
//               label="搜尋職缺"
//               variant="standard"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value.trim())}
//             />
//             <IconButton type="submit" disabled={isPending}>
//               {isPending ? <CircularProgress size={24} /> : <SearchIcon />}
//             </IconButton>
//           </Box>
//         </Paper>
//       </Box>

//       <Grid container mt={6} spacing={2}>
//         <Grid item md={4} sm={4}>
//           {keyword && (
//             <Stack direction="row" alignItems="center">
//               <Typography variant="h6" color="text.secondary">
//                 搜尋關鍵字: {keyword}
//               </Typography>
//               <IconButton onClick={clearSearch}>
//                 <DeleteIcon />
//               </IconButton>
//             </Stack>
//           )}
//           {isPending ? (
//             <>
//               <Skeleton variant="rectangular" height={100} />
//               <Skeleton variant="rectangular" height={100} />
//               <Skeleton variant="rectangular" height={100} />
//             </>
//           ) : (
//             <>
//               {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//               <JobList
//                 jobs={jobs}
//                 curId={currJob?._id}
//                 emitJob={setCurrJob}
//               />
//               {isLoadingMore && <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 2 }} />}
//               <div ref={observerRef} style={{ height: '20px' }} />
//             </>
//           )}
//         </Grid>
//         <Grid item md={8} sm={8}>
//           {isPending ? (
//             <Skeleton variant="rectangular" height={800} />
//           ) : currJob ? (
//             <JobDetail currJob={currJob} toggleModal={() => setModalOpen(!modalOpen)} />
//           ) : null}
//         </Grid>
//       </Grid>
//       <JobApplyModal
//         job={currJob}
//         modalOpen={modalOpen}
//         toggleModal={() => setModalOpen(!modalOpen)}
//       />
//     </Container>
//   );
// }