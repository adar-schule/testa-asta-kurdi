const { execSync } = require('child_process');
const os = require('os');

// Determine platform
const platform = os.platform();
const arch = os.arch();

if (platform === 'darwin' && arch === 'arm64') {
    // MacOS ARM64 (Apple Silicon)
    console.log('Installing @next/swc-darwin-arm64...');
    execSync('npm install @next/swc-darwin-arm64 --no-save', { stdio: 'inherit' });
} else if (platform === 'linux' && arch === 'x64') {
    // Linux x64 (like on Heroku)
    console.log('Installing @next/swc-linux-x64...');
    execSync('npm install @next/swc-linux-x64 --no-save', { stdio: 'inherit' });
} else {
    console.log(`Unsupported platform: ${platform}, architecture: ${arch}. Skipping @next/swc installation.`);
}