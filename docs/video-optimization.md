# Video Optimization Guide

## Overview

This document outlines the video optimization strategy implemented for the BCH Creation Hub website to improve loading times on mobile devices and slower connections.

## Problem

The original video (`/2.mp4`) was approximately 19.55 MB, causing slow loading times on mobile devices and potentially consuming excessive data for users on limited data plans.

## Solution

We implemented a comprehensive video optimization strategy with the following components:

1. **Responsive Video Loading**: Different video qualities based on device type
2. **Lazy Loading**: Videos only load when needed
3. **Loading Indicators**: Visual feedback during video loading
4. **Fallback Mechanisms**: Image placeholders when videos fail to load

## Implementation Details

### 1. Video Quality Variants

We created multiple versions of each video optimized for different devices:

| Version | Resolution | Bitrate | CRF | Target Device |
|---------|------------|---------|-----|---------------|
| Low     | 480p       | 500k    | 30  | Mobile (slow connections) |
| Mobile  | 640p       | 800k    | 28  | Mobile (standard) |
| Tablet  | 960p       | 1200k   | 26  | Tablets |
| Desktop | 1280p      | 2000k   | 23  | Desktop |

### 2. Directory Structure

```
public/
  videos/
    mobile/
      low/
        2.mp4       # Low quality mobile version
      2.mp4         # Standard mobile version
    tablet/
      2.mp4         # Tablet optimized version
    desktop/
      2.mp4         # Desktop optimized version
  2.mp4             # Original video (fallback)
```

### 3. Components

#### VideoLoader Component

The `VideoLoader` component (`src/components/video-loader.tsx`) handles:

- Detecting device type (mobile/tablet/desktop)
- Loading the appropriate video quality
- Providing fallbacks when videos fail to load
- Showing loading indicators

```tsx
<VideoLoader
  src="/2.mp4"                    // Default source (fallback)
  mobileSrc="/videos/mobile/2.mp4" // Mobile-optimized source
  tabletSrc="/videos/tablet/2.mp4" // Tablet-optimized source
  desktopSrc="/videos/desktop/2.mp4" // Desktop-optimized source
  poster="/bch logo.jpg"          // Image placeholder
  quality="medium"                // Quality preference
  disableOnMobile={false}         // Whether to disable video on mobile
/>
```

#### VideoLoadingIndicator Component

The `VideoLoadingIndicator` component (`src/components/video-loading-indicator.tsx`) provides visual feedback during video loading:

- Spinner animation
- Optional progress bar
- Customizable loading message
- Smooth transitions

### 4. Utility Functions

The `video-utils.ts` file contains utility functions:

- `checkFileExists`: Verifies if a video file exists
- `getVideoSource`: Determines the best video source based on device and quality preference
- `getOptimalVideoDimensions`: Calculates optimal video dimensions for different devices

### 5. Video Generation Scripts

We created scripts to automate the generation of optimized video versions:

- `scripts/generate-video-versions.js`: Node.js script to generate all video variants
- `scripts/optimize-videos.bat`: Batch file to run the optimization process

## How to Generate Optimized Videos

1. Ensure FFmpeg is installed on your system
2. Place your original video in the `public/` directory
3. Run the optimization script:

```bash
cd scripts
./optimize-videos.bat
```

## Performance Improvements

- **File Size Reduction**: Mobile versions are ~70-80% smaller than the original
- **Initial Load Time**: Reduced by using appropriate quality for each device
- **Bandwidth Usage**: Significantly reduced for mobile users
- **User Experience**: Improved with loading indicators and smooth transitions

## Future Improvements

- Implement video compression on the server side
- Add support for WebM format for browsers that support it
- Implement adaptive bitrate streaming (HLS/DASH)
- Add more granular quality controls based on connection speed