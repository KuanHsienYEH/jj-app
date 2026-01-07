import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

interface CountdownCircleProps {
  timeLeft: number;
  duration: number;
  count: number;
  currentSlide: number;
}

const CountdownCircle: React.FC<CountdownCircleProps> = ({ timeLeft, duration, count, currentSlide }) => {
  const progress = ((duration - timeLeft) / duration) * 100; // 0 -> 100

  return (
    <Box sx={{ position: "relative", width: 100, height: 100 }}>
      <CircularProgress
        variant="determinate"
        value={progress}
        size={100}
        thickness={3}
        sx={{ position: "absolute", top: 0, left: 0 }}
      />
      <Typography
        variant="h6"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {currentSlide+1} / {count}
      </Typography>
    </Box>
  );
};

export default CountdownCircle;
