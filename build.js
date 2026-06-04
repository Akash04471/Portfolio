const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwindPostcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

console.log('Starting native Node.js build process...');

// Helper to copy directory recursively
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function runBuild() {
  try {
    // 1. Make sure dist exists
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist', { recursive: true });
    }

    // 2. Compile Tailwind CSS using native PostCSS API
    console.log('Compiling Tailwind CSS natively...');
    const cssInput = fs.readFileSync(path.join('src', 'tailwind.css'), 'utf8');
    const result = await postcss([tailwindPostcss, autoprefixer])
      .process(cssInput, { 
        from: 'src/tailwind.css', 
        to: 'dist/tailwind.css' 
      });
    
    fs.writeFileSync(path.join('dist', 'tailwind.css'), result.css);
    console.log('Tailwind CSS compiled successfully!');

    // 3. Replicate workspace files
    console.log('Replicating workspace to dist/...');
    
    // Copy index.html
    fs.copyFileSync('index.html', path.join('dist', 'index.html'));
    
    // Clear and copy src/
    const distSrc = path.join('dist', 'src');
    if (fs.existsSync(distSrc)) {
      fs.rmSync(distSrc, { recursive: true, force: true });
    }
    copyDirSync('src', distSrc);
    
    // Clear and copy public/
    const distPublic = path.join('dist', 'public');
    if (fs.existsSync(distPublic)) {
      fs.rmSync(distPublic, { recursive: true, force: true });
    }
    copyDirSync('public', distPublic);
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build process failed:', error);
    process.exit(1);
  }
}

runBuild();
