import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const backendDir = path.resolve(rootDir, 'backend');

// Get ports from .env or environment
const envPath = path.join(backendDir, '.env');
let backendPort;
let frontendPort;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const bMatch = envContent.match(/BACKEND_PORT=(\d+)/);
  const fMatch = envContent.match(/FRONTEND_PORT=(\d+)/);
  
  if (bMatch) backendPort = bMatch[1];
  else throw new Error(`CRITICAL ERROR: BACKEND_PORT not found in ${envPath}`);
  
  if (fMatch) frontendPort = fMatch[1];
  else throw new Error(`CRITICAL ERROR: FRONTEND_PORT not found in ${envPath}`);
} else {
  throw new Error(`CRITICAL ERROR: .env file not found at ${envPath}`);
}

// Support command line --port arg (passed by app.py)
const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
if (portIndex !== -1 && args[portIndex + 1]) {
  frontendPort = args[portIndex + 1];
}

const activeBackendPort = process.env.PORT || backendPort;
const activeFrontendPort = frontendPort;

process.env.VITE_PROXY_TARGET = `http://127.0.0.1:${activeBackendPort}`;
process.env.VITE_BACKEND_PORT = activeBackendPort;

console.log(`\n[Orchestrator] Starting Backend on port ${activeBackendPort}...`);
const backend = spawn('python3', ['-m', 'uvicorn', 'app.main:app', '--reload', '--port', activeBackendPort, '--host', '127.0.0.1'], {
  cwd: backendDir,
  shell: true,
  stdio: 'inherit',
  env: { ...process.env, PYTHONPATH: backendDir }
});

console.log(`[Orchestrator] Starting Frontend (Vite) on port ${activeFrontendPort}...`);
const frontend = spawn('npx', ['vite', 'dev', '--port', activeFrontendPort], {
  cwd: __dirname,
  shell: true,
  stdio: 'inherit',
  env: { ...process.env, VITE_BACKEND_PORT: activeBackendPort }
});

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});
