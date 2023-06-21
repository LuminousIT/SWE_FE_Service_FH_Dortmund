import React, { useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const ProgressIndicator = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="text-center w-full md:w-1/2 my-6 m-auto border-2 p-10 rounded-lg">
      <h2 className="text-white mb-6">
        {progress < 50
          ? "Performing Diagnostics..."
          : "Sending Error Code to Information Center..."}
      </h2>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};
export default ProgressIndicator;
