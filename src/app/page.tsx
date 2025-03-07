"use client";

import { useRouter } from "next/navigation";
import { Container, Box, Button, Stack } from "@mui/material";
import Shared from "./components/Shared"; // ✅ Import the UI Layout
import LatestJob from "./components/LatestJob";
import Service from "./components/Service";

// ✅ Import global SCSS
import "@/styles/main.scss"; // Ensure this file exists

export default function Homepage() {
  const router = useRouter();

  const handleJobSeekers = () => {
    router.push("/jobs");
  };

  return (
    <Shared> {/* ✅ Wrap the page inside <Layout> to include Navbar & Footer */}
      <Container>
        {/* Hero Section */}
        <div className="layoutRoot">
          <Container className="layoutContent" maxWidth="md">
            <div className="layoutCta">
              <h1>關鍵人才 盡在巨將</h1>
              <p>企業掌握關鍵人才的最佳合作夥伴</p>
              <Stack spacing={2} direction="row">
                <Button variant="contained">企業求才</Button>
                <Button onClick={handleJobSeekers} variant="outlined">我要求職</Button>
              </Stack>
            </div>
          </Container>
        </div>

        {/* Latest Job Section */}
        <LatestJob />

        {/* Services Section */}
        <Service />

        {/* Awards & Services Section */}
        <Container className="awardServiceContainer">
          <Box className="awardServiceBox">
            {/* <Reward /> */}
          </Box>
        </Container>
      </Container>
    </Shared>
  );
}
