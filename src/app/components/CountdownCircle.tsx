import React, { useState, useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";

// ✅ Define TypeScript interface for props
interface CountdownCircleProps {
  timeLeft: number;      // Time remaining in the countdown
  duration: number;      // Total countdown duration
  count: number;         // Total number of slides
  currentSlide: number;  // Current slide index (0-based)
}

// ✅ Apply types to component props
const CountdownCircle: React.FC<CountdownCircleProps> = ({ timeLeft, duration, count, currentSlide }) => {
  const [progress, setProgress] = useState<number>(0); // Ensures progress is a number

  useEffect(() => {
    setProgress((1 - timeLeft / duration) * 100);
  }, [timeLeft, duration]);

  return (
    <div style={{ position: "relative", width: "100px", height: "100px" }}>
      <CircularProgress
        variant="determinate"
        value={progress}
        size={100}
        thickness={3}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <Typography
        variant="h6"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {currentSlide + 1} / {count}
      </Typography>
    </div>
  );
};

export default CountdownCircle;
