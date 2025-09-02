'use client';

import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { checkFileExists, getVideoSource } from '@/lib/video-utils';
import VideoLoadingIndicator from './video-loading-indicator';

interface VideoLoaderProps {
  src: string;
  poster: string;
  mobileSrc?: string;
  tabletSrc?: string;
  desktopSrc?: string;
  className?: string;
  priority?: boolean;
  disableOnMobile?: boolean;
  quality?: 'low' | 'medium' | 'high';
}

export default function VideoLoader({ 
  src, 
  poster, 
  mobileSrc, 
  tabletSrc,
  desktopSrc,
  className = '', 
  priority = false,
  disableOnMobile = true,
  quality = 'medium'
}: VideoLoaderProps) {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [actualSrc, setActualSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [availableSources, setAvailableSources] = useState<{[key: string]: boolean}>({}); 
  
  // Determine the appropriate video source
  useEffect(() => {
    const determineSource = async () => {
      setIsLoading(true);
      
      // Get the best video source based on device and quality
      const bestSource = await getVideoSource({
        defaultSrc: src,
        mobileSrc,
        tabletSrc,
        desktopSrc,
        isMobile,
        quality
      });
      
      setActualSrc(bestSource || src);
      
      // Check which sources are available for <source> elements
      const sources = {
        mobile: mobileSrc ? await checkFileExists(mobileSrc) : false,
        tablet: tabletSrc ? await checkFileExists(tabletSrc) : false,
        desktop: desktopSrc ? await checkFileExists(desktopSrc) : false,
        default: await checkFileExists(src)
      };
      
      setAvailableSources(sources);
      setIsLoading(false);
    };
    
    determineSource();
  }, [src, mobileSrc, tabletSrc, desktopSrc, isMobile, quality]);
  
  useEffect(() => {
    // Reset states when component mounts or src changes
    setIsLoaded(false);
    setHasError(false);
    
    // Don't preload if disabled on mobile or still determining source
    if ((isMobile && disableOnMobile) || isLoading) return;
    
    // Preload video
    const videoElement = document.createElement('video');
    
    videoElement.onloadeddata = () => {
      setIsLoaded(true);
    };
    
    videoElement.onerror = () => {
      console.warn(`Error loading video: ${actualSrc}`);
      setHasError(true);
    };
    
    videoElement.src = actualSrc;
    videoElement.load();
    
    return () => {
      videoElement.onloadeddata = null;
      videoElement.onerror = null;
      videoElement.src = '';
    };
  }, [actualSrc, isMobile, disableOnMobile, isLoading]);
  
  // Don't render video if disabled on mobile, if there was an error, or if still loading
  if ((isMobile && disableOnMobile) || hasError || isLoading) {
    return null;
  }
  
  return (
    <div className="relative">
      {(isLoading || !isLoaded) && (
        <VideoLoadingIndicator 
          isLoading={isLoading || !isLoaded} 
          showProgressBar={true}
          message={hasError ? "Error loading video" : "Loading video..."}
        />
      )}
      <video
        autoPlay 
        loop 
        muted 
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        className={className}
        poster={poster}
        fetchPriority={priority ? 'high' : 'auto'}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoadedData={() => setIsLoaded(true)}
        onProgress={(e) => {
          if (e.target && 'buffered' in e.target && e.target.buffered.length > 0) {
            const bufferedEnd = e.target.buffered.end(e.target.buffered.length - 1);
            const duration = e.target.duration;
            const progress = (bufferedEnd / duration) * 100;
            // Update loading progress
          }
        }}
      >
        {/* Add source elements for different device types if available */}
        {availableSources?.mobile && (
          <source 
            src={mobileSrc} 
            type="video/mp4" 
            media="(max-width: 767px)"
            onError={(e) => {
              console.warn(`Error loading mobile video source: ${mobileSrc}`);
              setHasError(true);
            }} 
          />
        )}
        {availableSources?.tablet && (
          <source 
            src={tabletSrc} 
            type="video/mp4" 
            media="(min-width: 768px) and (max-width: 1023px)"
            onError={(e) => {
              console.warn(`Error loading tablet video source: ${tabletSrc}`);
              setHasError(true);
            }} 
          />
        )}
        {availableSources?.desktop && (
          <source 
            src={desktopSrc} 
            type="video/mp4" 
            media="(min-width: 1024px)"
            onError={(e) => {
              console.warn(`Error loading desktop video source: ${desktopSrc}`);
              setHasError(true);
            }} 
          />
        )}
        {/* Default source as fallback */}
        <source 
          src={actualSrc} 
          type="video/mp4" 
          onError={(e) => {
            console.warn(`Error loading video source: ${actualSrc}`);
            setHasError(true);
          }} 
        />
      </video>
      <VideoLoadingIndicator isLoading={!isLoaded} />
    </div>
  );
}