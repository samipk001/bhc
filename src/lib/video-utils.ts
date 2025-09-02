/**
 * Utility functions for video handling
 */

/**
 * Check if a file exists by attempting to fetch it
 * @param url The URL to check
 * @returns Promise that resolves to true if file exists, false otherwise
 */
export async function checkFileExists(url: string): Promise<boolean> {
  if (!url) return false;
  
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.warn(`Error checking file existence: ${url}`, error);
    return false;
  }
}

/**
 * Interface for getVideoSource parameters
 */
interface GetVideoSourceParams {
  defaultSrc: string;
  mobileSrc?: string;
  tabletSrc?: string;
  desktopSrc?: string;
  isMobile: boolean;
  quality?: 'low' | 'medium' | 'high';
}

/**
 * Get the best video source based on device and quality
 */
export async function getVideoSource({
  defaultSrc,
  mobileSrc,
  tabletSrc,
  desktopSrc,
  isMobile,
  quality = 'medium'
}: GetVideoSourceParams): Promise<string> {
  // Determine device type
  const isTablet = !isMobile && window.innerWidth < 1024;
  const isDesktop = window.innerWidth >= 1024;
  
  // Check if we're on mobile and have a mobile source
  if (isMobile && mobileSrc) {
    // For low quality on mobile, try to use mobile/low path if it exists
    if (quality === 'low') {
      const lowQualityPath = mobileSrc.replace('/mobile/', '/mobile/low/');
      if (await checkFileExists(lowQualityPath)) {
        return lowQualityPath;
      }
    }
    
    // Check if mobile source exists
    if (await checkFileExists(mobileSrc)) {
      return mobileSrc;
    }
  }
  
  // Check if we're on tablet and have a tablet source
  if (isTablet && tabletSrc) {
    if (await checkFileExists(tabletSrc)) {
      return tabletSrc;
    }
  }
  
  // Check if we're on desktop and have a desktop source
  if (isDesktop && desktopSrc) {
    if (await checkFileExists(desktopSrc)) {
      return desktopSrc;
    }
  }
  
  // Fall back to default source
  return defaultSrc;
}

/**
 * Calculate optimal video dimensions based on device
 * @param originalWidth Original video width
 * @param originalHeight Original video height
 * @param isMobile Whether the current device is mobile
 * @returns Object with width and height properties
 */
export function getOptimalVideoDimensions(
  originalWidth: number,
  originalHeight: number,
  isMobile: boolean
): { width: number; height: number } {
  // For mobile, limit width to 640px
  if (isMobile) {
    const aspectRatio = originalHeight / originalWidth;
    const width = Math.min(640, originalWidth);
    const height = Math.round(width * aspectRatio);
    return { width, height };
  }
  
  // For desktop, use original dimensions
  return { width: originalWidth, height: originalHeight };
}