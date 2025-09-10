// Debug script to read actual image dimensions and generate popup config
// Run this with: node debug-image-dimensions.js

const fs = require('fs');
const path = require('path');

// Get image dimensions using a simple approach
function getImageDimensions(imagePath) {
  return new Promise((resolve, reject) => {
    // For web usage, we'll create an img element and load it
    const img = new Image();
    img.onload = function() {
      resolve({
        width: this.naturalWidth,
        height: this.naturalHeight
      });
    };
    img.onerror = reject;
    img.src = imagePath;
  });
}

// Browser-compatible version
async function generatePopupConfig() {
  const popupFolder = './public/Popups/';
  
  // List of image files from your current config
  const imageFiles = [
    '8ball_1.png',
    '8ball_2.png', 
    '8ball_3.png',
    'apple.png',
    'construct.png',
    'doom.png',
    'you.png',
    'me.png',
    'friend.png',
    'frog.png',
    'gun.png',
    'hell.png',
    'hivemind.png',
    'holy_cow.png',
    'mona_lisa.png',
    'nerd.png',
    'my_movie.png',
    'octagon.png',
    'question.png',
    'ram.png',
    'rom.png',
    'shop.png',
    'sign.png',
    'tenna.png',
    'wizard.png'
  ];

  console.log('// Generated popup config with actual image dimensions:');
  console.log('const popupTypes = [');

  for (const filename of imageFiles) {
    try {
      const imagePath = `Popups/${filename}`;
      
      // Create an image element to get dimensions
      const img = new Image();
      
      await new Promise((resolve, reject) => {
        img.onload = function() {
          const width = this.naturalWidth;
          const height = this.naturalHeight;
          
          console.log(`  { type: 'image', url: '${imagePath}', width: ${width}, height: ${height} }, // ${filename}`);
          resolve();
        };
        
        img.onerror = function() {
          console.log(`  // ERROR: Could not load ${filename}`);
          console.log(`  { type: 'image', url: '${imagePath}', width: 200, height: 200 }, // ${filename} - DEFAULT DIMENSIONS`);
          resolve();
        };
        
        img.src = imagePath;
      });
      
    } catch (error) {
      console.log(`  // ERROR reading ${filename}: ${error.message}`);
      console.log(`  { type: 'image', url: 'Popups/${filename}', width: 200, height: 200 }, // ${filename} - DEFAULT`);
    }
  }

  console.log('  { type: \'component\', Component: VirusPopup },');
  console.log('  { type: \'component\', Component: ErrorPopup },');
  console.log('  { type: \'component\', Component: WarningPopup },');
  console.log('];');
}

// Export for browser usage
if (typeof window !== 'undefined') {
  window.generatePopupConfig = generatePopupConfig;
} else {
  // Node.js usage with sharp for server-side
  try {
    const sharp = require('sharp');
    
    async function generateConfigNode() {
      const popupFolder = './public/Popups/';
      
      const imageFiles = [
        '8ball_1.png', '8ball_2.png', '8ball_3.png', 'apple.png', 'construct.png',
        'doom.png', 'you.png', 'me.png', 'friend.png', 'frog.png', 'gun.png',
        'hell.png', 'hivemind.png', 'holy_cow.png', 'mona_lisa.png', 'nerd.png',
        'my_movie.png', 'octagon.png', 'question.png', 'ram.png', 'rom.png',
        'shop.png', 'sign.png', 'tenna.png', 'wizard.png'
      ];

      console.log('// Generated popup config with actual image dimensions:');
      console.log('const popupTypes = [');

      for (const filename of imageFiles) {
        try {
          const imagePath = path.join(popupFolder, filename);
          
          if (fs.existsSync(imagePath)) {
            const metadata = await sharp(imagePath).metadata();
            console.log(`  { type: 'image', url: 'Popups/${filename}', width: ${metadata.width}, height: ${metadata.height} }, // ${filename}`);
          } else {
            console.log(`  // File not found: ${filename}`);
            console.log(`  { type: 'image', url: 'Popups/${filename}', width: 200, height: 200 }, // ${filename} - DEFAULT`);
          }
        } catch (error) {
          console.log(`  // ERROR reading ${filename}: ${error.message}`);
          console.log(`  { type: 'image', url: 'Popups/${filename}', width: 200, height: 200 }, // ${filename} - DEFAULT`);
        }
      }

      console.log('  { type: \'component\', Component: VirusPopup },');
      console.log('  { type: \'component\', Component: ErrorPopup },');
      console.log('  { type: \'component\', Component: WarningPopup },');
      console.log('];');
    }

    generateConfigNode();
  } catch (err) {
    console.log('Sharp not available. Install with: npm install sharp');
    console.log('Or use the browser version by opening debug.html');
  }
}
