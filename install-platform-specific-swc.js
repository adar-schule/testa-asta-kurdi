const { execSync } = require('child_process');
const os = require('os');

const platform = os.platform();
const cpuArch = os.arch();

// Check if the platform is macOS and architecture is ARM64 (Apple Silicon)
if (platform === 'darwin' && cpuArch === 'arm64') {
    console.log('Detected macOS (ARM64). Installing @next/swc-darwin-arm64...');
    execSync('npm install @next/swc-darwin-arm64@14.2.15 --save-dev', { stdio: 'inherit' });
} else {
    console.log('Non-macOS platform or not ARM64. Skipping platform-specific package installation.');
}