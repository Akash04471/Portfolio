const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting custom build process...');

// 1. Compile CSS using PostCSS
try {
  console.log('Compiling Tailwind CSS...');
  execSync('npx postcss src/tailwind.css -o dist/tailwind.css --env production', { stdio: 'inherit' });
} catch (error) {
  console.error('PostCSS compilation failed:', error);
  process.exit(1);
}

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

// 2. Replicate directory structure into dist/
try {
  console.log('Replicating workspace to dist/...');
  
  // Make sure dist exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }

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
  console.error('Error during workspace replication:', error);
  process.exit(1);
}
