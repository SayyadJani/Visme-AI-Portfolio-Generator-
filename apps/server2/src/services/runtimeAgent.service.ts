import { spawn, execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { logger } from '@repo/shared-utils';

// Total timeout for the entire startup sequence:
// first start  = npm install (~20–60s) + Vite start (~4s) = up to ~90s
// subsequent   = Vite start only (~2–4s)
const STARTUP_TIMEOUT_MS = 180_000;

export class RuntimeAgentService {

  static spawn(instancePath: string, port: number): Promise<number> {
    return new Promise((resolve, reject) => {

      // ── Step 1: npm install (only if package.json exists and node_modules doesn't) ────
      const pkgPath = path.join(instancePath, 'package.json');
      const nodeModulesPath = path.join(instancePath, 'node_modules');

      if (fs.existsSync(pkgPath) && !fs.existsSync(nodeModulesPath)) {
        logger.info(
          `package.json found but node_modules missing — running npm install in ${instancePath}`,
          undefined,
          'runtime-agent'
        );

        try {
          const hasPnpmLock = fs.existsSync(path.join(instancePath, 'pnpm-lock.yaml'));
          const pnpmCmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
          const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

          // Use D: drive for all caches/stores
          const baseDataPath = process.env.INSTANCES_PATH || 'data/instances';
          const npmCachePath = path.join(baseDataPath, '..', 'npm-cache');
          const pnpmStorePath = path.join(baseDataPath, '..', 'pnpm-store');

          if (!fs.existsSync(npmCachePath)) fs.mkdirSync(npmCachePath, { recursive: true });
          if (!fs.existsSync(pnpmStorePath)) fs.mkdirSync(pnpmStorePath, { recursive: true });

          if (hasPnpmLock) {
            logger.info(`pnpm-lock.yaml found - using pnpm with store at ${pnpmStorePath}`, undefined, 'runtime-agent');
            execSync(`${pnpmCmd} install --store-dir "${pnpmStorePath}"`, {
              cwd: instancePath,
              timeout: 120_000,
              stdio: 'pipe',
            });
          } else {
            logger.info(`Using npm with cache at ${npmCachePath}`, undefined, 'runtime-agent');
            execSync(`${npmCmd} install --legacy-peer-deps --cache "${npmCachePath}"`, {
              cwd: instancePath,
              timeout: 120_000,
              stdio: 'pipe',
            });
          }

          logger.info(
            `Dependencies installed successfully at ${instancePath}`,
            undefined,
            'runtime-agent'
          );

        } catch (installErr) {
          logger.error('Install failed', installErr, 'runtime-agent');
          return reject(new Error(`Install failed: ${String(installErr)}`));
        }

      } else if (!fs.existsSync(pkgPath)) {
        logger.info(
          `No package.json found — skipping npm install for ${instancePath}`,
          undefined,
          'runtime-agent'
        );
      }

      // ── Step 2: Start dev server or static server ───────────────────────
      const hasPackageJson = fs.existsSync(pkgPath);
      const hasIndexHtml = fs.existsSync(path.join(instancePath, 'index.html'));
      const hasPnpmLock = fs.existsSync(path.join(instancePath, 'pnpm-lock.yaml'));

      const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
      const pnpmCmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
      const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';

      let proc;

      if (hasPackageJson) {
        let scriptToRun = 'dev';
        try {
          const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
          if (pkg.scripts) {
            if (pkg.scripts.dev) scriptToRun = 'dev';
            else if (pkg.scripts.start) scriptToRun = 'start';
          }
        } catch (e) { }

        const runnerCmd = hasPnpmLock ? pnpmCmd : npmCmd;

        proc = spawn(
          runnerCmd,
          ['run', scriptToRun, '--', '--port', port.toString()],
          {
            cwd: instancePath,
            env: { ...process.env, PORT: port.toString() },
            stdio: ['ignore', 'pipe', 'pipe'],
            shell: true // Important for Windows
          }
        );
      } else if (hasIndexHtml) {
        logger.info(
          `Found index.html but no package.json — starting static server for ${instancePath}`,
          undefined,
          'runtime-agent'
        );
        // Use http-server via npx
        proc = spawn(
          npxCmd,
          ['-y', 'http-server', '.', '-p', port.toString(), '-c-1'],
          {
            cwd: instancePath,
            env: { ...process.env, PORT: port.toString() },
            stdio: ['ignore', 'pipe', 'pipe'],
            shell: true
          }
        );
      } else {
        return reject(new Error(`No package.json or index.html found in ${instancePath}. Cannot start preview.`));
      }

      let output = '';
      let isResolved = false;

      const checkReady = (data: Buffer) => {
        if (isResolved) return;

        output += data.toString();
        const lowerOut = output.toLowerCase();

        // Support Vite, Parcel, and http-server readiness strings
        if (
          lowerOut.includes('ready in') ||
          lowerOut.includes('local:') ||
          lowerOut.includes('built in') ||
          lowerOut.includes('server running') ||
          lowerOut.includes('available on:') ||
          lowerOut.includes('hit ctrl-c to stop') ||
          lowerOut.includes('preview at')
        ) {
          isResolved = true;
          clearTimeout(timeoutHandle);
          logger.info(
            `Server ready on port ${port} (pid ${proc.pid}) for ${instancePath}`,
            undefined,
            'runtime-agent'
          );
          resolve(proc.pid!);
        }
      };

      proc.stdout?.on('data', checkReady);

      proc.stderr?.on('data', (data: Buffer) => {
        if (!isResolved) checkReady(data);
        // Log stderr but don't fail — Vite/Parcel sometimes writes non-fatal info here
        logger.warn(`Dev Server [Port ${port}] stderr: ${data.toString()}`, undefined, 'runtime-agent');
      });

      proc.on('error', (err) => {
        if (isResolved) return;
        isResolved = true;
        clearTimeout(timeoutHandle);
        reject(err);
      });

      proc.on('exit', (code) => {
        if (!isResolved) {
          isResolved = true;
          clearTimeout(timeoutHandle);
          reject(new Error(`Dev Server exited prematurely with code ${code}`));
        }
        if (code !== 0 && code !== null) {
          logger.error(`Dev Server exited with code ${code} on port ${port}`, undefined, 'runtime-agent');
        }
      });

      // Overall timeout covers both npm install + Dev Server startup
      const timeoutHandle = setTimeout(() => {
        if (isResolved) return;
        isResolved = true;

        logger.warn(`Startup timed out for ${instancePath}. Killing process ${proc.pid}...`);
        this.kill(proc.pid!);

        reject(new Error(
          `Startup timed out after ${STARTUP_TIMEOUT_MS}ms on port ${port}. ` +
          `Path: ${instancePath}`
        ));
      }, STARTUP_TIMEOUT_MS);
    });
  }

  /**
   * Kills a process and all its children.
   * On Windows, we need 'taskkill /T /F /PID' to ensure the whole process tree is gone.
   * Without this, 'npm run dev' shell might die but the actual 'vite' or 'parcel' process stays alive.
   */
  static kill(pid: number): void {
    try {
      if (process.platform === 'win32') {
        execSync(`taskkill /F /T /PID ${pid}`, { stdio: 'ignore' });
      } else {
        // Unix: kill the entire process group if we had set detached: true, 
        // but here we just do a regular kill for the top level.
        // For more robustness on Unix, we might need a similar group-kill approach.
        process.kill(pid, 'SIGKILL');
      }
    } catch (err) {
      // Ignore errors if process already exited
    }
  }
}
