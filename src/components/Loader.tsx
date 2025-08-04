import React, { useState, useEffect } from 'react';

const messages = [
  "Initializing audit sequence...",
  "Analyzing website layout and structure...",
  "Evaluating design aesthetics and branding...",
  "Assessing user experience heuristics...",
  "Checking for accessibility compliance (WCAG)...",
  "Compiling the final report...",
];

const LOADER_DURATION_MS = 20000; // 20 seconds

const Loader: React.FC = () => {
  const [message, setMessage] = useState(messages[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Message cycling
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setMessage(messages[messageIndex]);
    }, 2500);

    // Progress bar simulation
    let progressStartTime: number | null = null;
    let animationFrameId: number;

    const animateProgress = (timestamp: number) => {
      if (!progressStartTime) progressStartTime = timestamp;
      const elapsedTime = timestamp - progressStartTime;
      const currentProgress = Math.min((elapsedTime / LOADER_DURATION_MS) * 95, 95); // Stop at 95%
      setProgress(currentProgress);

      if (elapsedTime < LOADER_DURATION_MS) {
        animationFrameId = requestAnimationFrame(animateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    return () => {
      clearInterval(messageInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-10 opacity-0 animate-fadeInUp">
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Progress Circle */}
        <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle 
            className="text-gray-700/30"
            strokeWidth="4" 
            stroke="currentColor" 
            fill="transparent" 
            r={radius} 
            cx="50" 
            cy="50" 
          />
          <circle
            className="text-cyan-500"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
          />
        </svg>

        {/* Morphing Shape */}
        <svg className="w-24 h-24" viewBox="0 0 100 100">
            <path
              d="M20 20 H 80 V 80 H 20 Z"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="5"
              strokeLinejoin="round"
              strokeLinecap="round"
              className="animate-morph"
            />
        </svg>
      </div>
      <p className="mt-6 text-gray-300 text-lg transition-opacity duration-500 w-full text-center min-h-[28px]">
        {message}
      </p>
    </div>
  );
};

export default Loader;