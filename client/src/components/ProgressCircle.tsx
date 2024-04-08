import React, { useState, useEffect } from "react";

function ProgressCircle({ progress }) {
  const strokeWidth = 10;
  const radius = 75;
  const progressRadius = radius - strokeWidth / 2;
  const circumference = progressRadius * 2 * Math.PI;
  const [isAnimating, setIsAnimating] = useState(true);

  // Calculate the strokeDashoffset based on progress, but skip animation when going back to 0
  const strokeDashoffset = progress <= 100 ? circumference - (progress / 100) * circumference : 0;

  // Effect to disable animation when progress goes back to 0
  useEffect(() => {
    if (progress === 0) {
      setIsAnimating(false);
      // Use a timeout to re-enable animation after a brief pause
      const timeout = setTimeout(() => setIsAnimating(true), 50); // Small delay
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <div className="flex items-center justify-center">
      <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
        {/* Background white circle */}
        <circle cx="80" cy="80" r={radius} fill="white" className="shadow-md" />
        {/* Progress ring */}
        <circle
          cx="80"
          cy="80"
          r={progressRadius}
          fill="transparent"
          stroke="rgb(113, 211, 211)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="butt"
          style={{ transition: isAnimating ? "stroke-dashoffset 1s ease-in-out" : "none" }}
        />
      </svg>
    </div>
  );
}

export default ProgressCircle;
