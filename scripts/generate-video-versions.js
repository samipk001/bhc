const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration for different video qualities
const VIDEO_QUALITIES = [
  {
    name: 'mobile-low',
    width: 480,
    bitrate: '500k',
    crf: 30,
    preset: 'medium',
    outputDir: 'mobile/low'
  },
  {
    name: 'mobile-high',
    width: 640,
    bitrate: '800k',
    crf: 28,
    preset: 'medium',
    outputDir: 'mobile'
  },
  {
    name: 'tablet',
    width: 960,
    bitrate: '1200k',
    crf: 26,
    preset: 'medium',
    outputDir: 'tablet'
  },
  {
    name: 'desktop',
    width: 1280,
    bitrate: '2000k',
    crf: 23,
    preset: 'medium',
    outputDir: 'desktop'
  }
];

// Check if ffmpeg is installed
const checkFFmpeg = () => {
  return new Promise((resolve, reject) => {
    exec('ffmpeg -version', (error) => {
      if (error) {
        console.error('FFmpeg is not installed. Please install FFmpeg to use this script.');
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

// Create directory if it doesn't exist
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

// Optimize video for a specific quality
const optimizeVideo = (inputPath, outputPath, options) => {
  const {
    width,
    bitrate,
    crf,
    preset
  } = options;

  return new Promise((resolve, reject) => {
    // Create directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    ensureDirectoryExists(outputDir);

    // FFmpeg command to optimize video
    const command = `ffmpeg -i "${inputPath}" -vf "scale=${width}:-1" -c:v libx264 -preset ${preset} -crf ${crf} -b:v ${bitrate} -movflags +faststart "${outputPath}"`;
    
    console.log(`Optimizing video: ${inputPath} -> ${outputPath}`);
    console.log(`Command: ${command}`);
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error optimizing video: ${error.message}`);
        reject(error);
        return;
      }
      
      console.log(`Video optimized successfully: ${outputPath}`);
      resolve();
    });
  });
};

// Generate all video versions
const generateAllVersions = async (inputPath) => {
  const baseOutputDir = path.join(path.dirname(inputPath), 'videos');
  ensureDirectoryExists(baseOutputDir);
  
  const fileName = path.basename(inputPath);
  const fileNameWithoutExt = path.parse(fileName).name;
  const ext = path.parse(fileName).ext;
  
  for (const quality of VIDEO_QUALITIES) {
    const outputDir = path.join(baseOutputDir, quality.outputDir);
    ensureDirectoryExists(outputDir);
    
    const outputPath = path.join(outputDir, fileName);
    
    try {
      await optimizeVideo(inputPath, outputPath, quality);
      console.log(`Generated ${quality.name} version: ${outputPath}`);
    } catch (error) {
      console.error(`Failed to generate ${quality.name} version:`, error);
    }
  }
};

// Main function
const main = async () => {
  try {
    // Check if FFmpeg is installed
    await checkFFmpeg();
    
    // Define input path
    const inputPath = path.join(__dirname, '..', 'public', '2.mp4');
    
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.error(`Input file not found: ${inputPath}`);
      process.exit(1);
    }
    
    // Generate all video versions
    await generateAllVersions(inputPath);
    
    console.log('All video versions generated successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
};

// Run the main function
main();