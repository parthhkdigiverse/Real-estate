import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const backendDir = path.resolve(rootDir, 'backend');

// Get port from .env or environment
const envPath = path.join(backendDir, '.env');
let backendPort = '8000';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/BACKEND_PORT=(\d+)/);
  if (match) backendPort = match[1];
}

// Fallback to process.env.PORT (common in sandboxes)
const activePort = process.env.PORT || backendPort;
process.env.VITE_PROXY_TARGET = `http://localhost:${activePort}`;

console.log(`\n[Orchestrator] Starting Backend on port ${activePort}...`);
const backend = spawn('python3', ['-m', 'uvicorn', 'app.main:app', '--reload', '--port', activePort], {
  cwd: backendDir,
  shell: true,
  stdio: 'inherit',
  env: { ...process.env, PYTHONPATH: backendDir }
});

console.log(`[Orchestrator] Starting Frontend (Vite)...`);
const frontend = spawn('npx', ['vite', 'dev'], {
  cwd: __dirname,
  shell: true,
  stdio: 'inherit'
});

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});
