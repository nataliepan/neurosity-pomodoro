import React from "react";

function ProgressCircle({ progress }) {
  const strokeWidth = 10; // The stroke width of the progress ring
  // Adjust the radius of the progress ring to be smaller by half the stroke width than the white circle
  const radius = 75; // Radius for the white circle
  const progressRadius = radius - strokeWidth / 2; // Radius for the progress ring

  const circumference = progressRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference}`;
  const strokeDashoffset = ((100 - progress) / 100) * circumference;

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
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="butt"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
    </div>
  );
}

export default ProgressCircle;
