# Mobile-Optimized Videos

This directory contains optimized versions of videos for mobile devices. These videos are compressed to reduce file size and improve loading times on mobile networks.

## Video Optimization Process

To optimize videos for mobile, we use FFmpeg with the following settings:

- Resolution: 640px width (height maintains aspect ratio)
- Codec: H.264 (libx264)
- CRF (Constant Rate Factor): 28 (higher value = more compression)
- Preset: medium (balance between compression speed and quality)
- Bitrate: 800k

## How to Generate Mobile Videos

If you have FFmpeg installed, you can run the optimization script:

```bash
node scripts/optimize-video.js
```

Or manually optimize videos using FFmpeg:

```bash
ffmpeg -i "../2.mp4" -vf "scale=640:-1" -c:v libx264 -preset medium -crf 28 -b:v 800k -movflags +faststart "2.mp4"
```

## Fallback Mechanism

The `VideoLoader` component will automatically:
1. Try to load the mobile-optimized version on mobile devices
2. Fall back to the original video if the mobile version doesn't exist
3. Show a loading indicator while the video loads