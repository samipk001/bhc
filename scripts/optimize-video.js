const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

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

// Optimize video for mobile
const optimizeVideo = (inputPath, outputPath, options = {}) => {
  const {
    width = 640,
    bitrate = '800k',
    crf = 28,
    preset = 'medium'
  } = options;

  return new Promise((resolve, reject) => {
    // Create directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

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

// Main function
const main = async () => {
  try {
    // Check if FFmpeg is installed
    await checkFFmpeg();
    
    // Define paths
    const inputPath = path.join(__dirname, '..', 'public', '2.mp4');
    const outputPath = path.join(__dirname, '..', 'public', 'videos', 'mobile', '2.mp4');
    
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.error(`Input file not found: ${inputPath}`);
      process.exit(1);
    }
    
    // Optimize video for mobile
    await optimizeVideo(inputPath, outputPath, {
      width: 640,
      bitrate: '800k',
      crf: 28,
      preset: 'medium'
    });
    
    console.log('Video optimization completed successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
};

// Run the main function
main();