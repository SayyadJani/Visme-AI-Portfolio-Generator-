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
          const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
          
          execSync(`${npmCmd} install`, {
            cwd:     instancePath,
            timeout: 120_000,   // 2 min max for install itself
            stdio:   'pipe',
          });

          logger.info(
            `npm install completed for project at ${instancePath}`,
            undefined,
            'runtime-agent'
          );

        } catch (installErr) {
          logger.error('npm install failed', installErr, 'runtime-agent');
          return reject(new Error(`npm install failed: ${String(installErr)}`));
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

      const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
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
        } catch(e) {}

        proc = spawn(
          npmCmd,
          ['run', scriptToRun, '--', '--port', port.toString()],
          {
            cwd:   instancePath,
            env:   { ...process.env, PORT: port.toString() },
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
          ['-y', 'http-server', '.', '-p', port.toString()],
          {
            cwd:   instancePath,
            env:   { ...process.env, PORT: port.toString() },
            stdio: ['ignore', 'pipe', 'pipe'],
            shell: true
          }
        );
      } else {
        return reject(new Error(`No package.json or index.html found in ${instancePath}. Cannot start preview.`));
      }

      let output = '';

      const checkReady = (data: Buffer) => {
        output += data.toString();
        const lowerOut = output.toLowerCase();

        // Support Vite, Parcel, and http-server readiness strings
        if (
            lowerOut.includes('ready in') || 
            lowerOut.includes('local:') ||
            lowerOut.includes('built in') ||
            lowerOut.includes('server running') ||
            lowerOut.includes('available on:') ||
            lowerOut.includes('hit ctrl-c to stop')
        ) {
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
        checkReady(data);
        // Log stderr but don't fail — Vite/Parcel sometimes writes non-fatal info here
        logger.warn(`Dev Server stderr on port ${port}`, data.toString(), 'runtime-agent');
      });

      proc.on('error', (err) => {
        clearTimeout(timeoutHandle);
        reject(err);
      });

      proc.on('exit', (code) => {
        if (code !== 0 && code !== null) {
          logger.error(`Dev Server exited with code ${code} on port ${port}`, undefined, 'runtime-agent');
        }
      });

      // Overall timeout covers both npm install + Dev Server startup
      const STARTUP_TIMEOUT_MS = 180_000; // Increased to 3 mins to cover slow installs
      const timeoutHandle = setTimeout(() => {
        proc.kill();
        reject(new Error(
          `Startup timed out after ${STARTUP_TIMEOUT_MS}ms on port ${port}. ` +
          `Path: ${instancePath}`
        ));
      }, STARTUP_TIMEOUT_MS);
    });
  }
}
