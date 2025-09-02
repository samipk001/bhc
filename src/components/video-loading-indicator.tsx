'use client';

import { useState, useEffect } from 'react';

interface VideoLoadingIndicatorProps {
  isLoading?: boolean;
  className?: string;
  showProgressBar?: boolean;
  progressPercent?: number;
  message?: string;
}

export default function VideoLoadingIndicator({ 
  isLoading = true, 
  className = '',
  showProgressBar = false,
  progressPercent = 0,
  message = 'Loading video...'
}: VideoLoadingIndicatorProps) {
  const [visible, setVisible] = useState(isLoading);
  const [progress, setProgress] = useState(progressPercent);
  
  // Simulate progress if no progress is provided
  useEffect(() => {
    if (!showProgressBar || progressPercent > 0) return;
    
    let interval: NodeJS.Timeout;
    if (isLoading) {
      // Simulate loading progress that slows down as it approaches 90%
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          const increment = Math.max(1, 10 * (1 - prev / 100));
          return Math.min(90, prev + increment);
        });
      }, 500);
    }
    
    return () => clearInterval(interval);
  }, [isLoading, showProgressBar, progressPercent]);
  
  // Update progress when progressPercent changes
  useEffect(() => {
    if (progressPercent > 0) {
      setProgress(progressPercent);
    }
  }, [progressPercent]);
  
  // Handle visibility with delay for smooth transitions
  useEffect(() => {
    if (isLoading) {
      setVisible(true);
    } else {
      // Complete the progress bar before hiding
      if (showProgressBar) {
        setProgress(100);
        const completeTimer = setTimeout(() => {
          // Add a small delay before hiding to ensure smooth transition
          const hideTimer = setTimeout(() => {
            setVisible(false);
          }, 500);
          
          return () => clearTimeout(hideTimer);
        }, 300);
        
        return () => clearTimeout(completeTimer);
      } else {
        // Add a small delay before hiding to ensure smooth transition
        const timer = setTimeout(() => {
          setVisible(false);
        }, 500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, showProgressBar]);
  
  if (!visible) return null;
  
  return (
    <div className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0'} ${className}`}>
      <div className="flex flex-col items-center max-w-xs w-full px-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
        
        {showProgressBar && (
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        <p className="text-white text-sm font-medium text-center">
          {message}
          {showProgressBar && ` (${Math.round(progress)}%)`}
        </p>
      </div>
    </div>
  );
}