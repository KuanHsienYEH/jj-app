"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardActions, CardContent, CardActionArea, Button, Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/components/jobcard.module.scss"; // ✅ 使用 SCSS Modules


type Job = {
  _id: string;
  jobTitle: string;
  location: string;
  salary?: string;
};

export default function JobCard({ job }: { job: Job }) {
  const router = useRouter();

  return (
    <Card variant="outlined" className="slick-card">
      <Link style={{textDecoration:"none"}} href={`/jobs/${job._id}`} passHref>
        <CardActionArea>
          <CardContent>
            <Typography color="black" variant="h5" component="div">
              {job.jobTitle}
            </Typography>
            <Box sx={{ mt: 1.5 }} color="text.secondary">
              <FontAwesomeIcon icon={faLocationDot} />
              <Typography sx={{ display: "inline-block", ml: 1 }}>{job.location}</Typography>
            </Box>
            {job.salary && (
              <Box color="text.secondary">
                <FontAwesomeIcon icon={faDollarSign} />
                <Typography sx={{ display: "inline-block", ml: 1 }}>{job.salary}</Typography>
              </Box>
            )}
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button onClick={() => router.push(`/job/${job._id}`)} variant="outlined">
          我要應徵
        </Button>
      </CardActions>
    </Card>
  );
}
