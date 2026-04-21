import subprocess
import sys
import os
import time
import shutil
import threading
from dotenv import load_dotenv

# Load .env from backend directory
root_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(root_dir, "backend")
env_path = os.path.join(backend_dir, ".env")
load_dotenv(env_path, override=True)

def is_command_available(cmd):
    """Check if a command is available in the system PATH."""
    return shutil.which(cmd) is not None

def run_command(cmd, cwd=None, shell=True):
    """Run a command and wait for it to complete."""
    print(f"RUNNING: {cmd} in {cwd or 'root'}...")
    return subprocess.run(cmd, cwd=cwd, shell=shell)

def get_required_env(key):
    """Get a required environment variable or raise an error."""
    value = os.getenv(key)
    if not value:
        raise RuntimeError(f"CRITICAL ERROR: {key} not found in environment or {env_path}. Please set it in your .env file.")
    return value

def install_dependencies(frontend_dir, backend_dir):
    """Automatically install missing dependencies."""
    print("Checking dependencies...")

    # Backend check
    print("Installing backend dependencies...")
    run_command(f'"{sys.executable}" -m pip install -r requirements.txt', cwd=backend_dir)

    # Frontend check
    node_modules = os.path.join(frontend_dir, "node_modules")
    if not os.path.exists(node_modules):
        print("node_modules not found. Installing frontend dependencies...")
        if is_command_available("bun") and os.path.exists(os.path.join(frontend_dir, "bun.lockb")):
            run_command("bun install", cwd=frontend_dir)
        elif is_command_available("npm"):
            run_command("npm install", cwd=frontend_dir)
        else:
            print("Error: npm or bun not found. Please install Node.js.")
            sys.exit(1)
    else:
        print("Frontend dependencies already installed.")

def run_services():
    # Paths to directories
    root_dir = os.path.dirname(os.path.abspath(__file__))
    frontend_dir = os.path.join(root_dir, "frontend")
    backend_dir = os.path.join(root_dir, "backend")

    # Ensure dependencies are installed
    install_dependencies(frontend_dir, backend_dir)

    # Load ports from environment - Must be set in .env
    backend_port = get_required_env("BACKEND_PORT")
    frontend_port = get_required_env("FRONTEND_PORT")

    print("\nStarting The Sandras Services...")

    # Start Backend (FastAPI)
    print(f"Starting Backend (FastAPI) on port {backend_port}...")
    backend_process = subprocess.Popen(
        f'"{sys.executable}" -m uvicorn app.main:app --reload --port {backend_port} --host 0.0.0.0',
        cwd=backend_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
        universal_newlines=True,
        shell=True
    )

    # Start Frontend
    frontend_cmd = f"npm run dev -- --port {frontend_port}"
    if is_command_available("bun") and os.path.exists(os.path.join(frontend_dir, "bun.lockb")):
        frontend_cmd = f"bun run dev -- --port {frontend_port}"
    
    print(f"Starting Frontend ({frontend_cmd})...")
    
    # Pass backend port to frontend for proxying and dynamic detection
    frontend_env = os.environ.copy()
    # FORCE 127.0.0.1 for the local proxy to ensure Vite can reach the backend
    frontend_env["VITE_PROXY_TARGET"] = f"http://127.0.0.1:{backend_port}"
    frontend_env["VITE_BACKEND_PORT"] = backend_port
    frontend_env["BACKEND_PORT"] = backend_port
    
    frontend_process = subprocess.Popen(
        frontend_cmd,
        cwd=frontend_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
        universal_newlines=True,
        shell=True,
        env=frontend_env
    )

    def print_output(process, prefix):
        for line in iter(process.stdout.readline, ""):
            if line:
                print(f"[{prefix}] {line.strip()}")

    # Threads for output
    backend_thread = threading.Thread(target=print_output, args=(backend_process, "BACKEND"), daemon=True)
    frontend_thread = threading.Thread(target=print_output, args=(frontend_process, "FRONTEND"), daemon=True)

    backend_thread.start()
    frontend_thread.start()

    try:
        while True:
            time.sleep(1)
            if backend_process.poll() is not None:
                print("Backend process terminated.")
                break
            if frontend_process.poll() is not None:
                print("Frontend process terminated.")
                break
    except KeyboardInterrupt:
        print("\nStopping services...")
    finally:
        # Cross-platform termination
        if os.name == 'nt': # Windows
            subprocess.call(['taskkill', '/F', '/T', '/PID', str(backend_process.pid)])
            subprocess.call(['taskkill', '/F', '/T', '/PID', str(frontend_process.pid)])
        else: # Unix/Linux/Mac
            backend_process.terminate()
            frontend_process.terminate()
        print("Cleanup complete.")

if __name__ == "__main__":
    run_services()
