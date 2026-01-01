"use client";

import { useState, useEffect,useMemo } from "react";
import { useRouter } from "next/navigation";
import { Container, Box, Button, Stack } from "@mui/material";
import LatestJob from "./components/LatestJob";
import Service from "./components/Service";
import { Job } from '@/types/jobs';
import { useJobs } from "./hooks/useJobs";

// ✅ Import global SCSS

export default function Homepage() {
  
  const router = useRouter();
  const handleJobSeekers = () => {
    router.push("/job");
  };

  // ✅ hook 一定要放在 component 最上層呼叫
  const { jobs, loading } = useJobs();

  // ✅ 只取前 9 筆
  const latest9 = useMemo(() => jobs.slice(0, 9), [jobs]);


  const style={
    awardServiceBox:{
      margin: '0  calc(-50vw + 50%)',
      backgroundColor:' rgba(250, 250, 250, 1)',
    }
  }

  return (
    
      <Container>
        {/* Hero Section */}
        <div className="layout__root">
        <Container className='layout__content' maxWidth="md">
          <div className="layout__cta">
            <h1>關鍵人才 盡在巨將</h1>
            <p>企業掌握關鍵人才的最佳合作夥伴</p>
            <Stack spacing={2} direction="row">
              <Button variant="contained">企業求才</Button>
              <Button onClick={()=>handleJobSeekers()} variant="outlined">我要求職</Button>
            </Stack>
            </div>
          </Container>
        </div>

        {/* Services Section */}
        <Service />

     <LatestJob jobs={latest9} loading={loading} />

        

        <Container>

        </Container>
      </Container>
  );
}
