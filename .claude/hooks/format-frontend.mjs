// PostToolUse hook: formats a frontend file with the project's Prettier after Claude edits it.
// Reads the hook payload (JSON) from stdin. Never blocks: formatting problems are only reported.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const FORMATTED_EXTENSIONS = new Set(['.ts', '.html', '.scss', '.css', '.json']);

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const frontendDir = join(repoRoot, 'frontend');
const prettierBin = join(frontendDir, 'node_modules', 'prettier', 'bin', 'prettier.cjs');

try {
  const payload = JSON.parse(readFileSync(0, 'utf8'));
  const filePath = payload.tool_input?.file_path ?? payload.tool_response?.filePath;
  if (!filePath) process.exit(0);

  const file = resolve(filePath);
  const pathInFrontend = relative(frontendDir, file);
  const isInFrontend = pathInFrontend && !pathInFrontend.startsWith('..');
  const isGenerated = /^(node_modules|dist|\.angular)[\\/]/.test(pathInFrontend);

  if (!isInFrontend || isGenerated || !FORMATTED_EXTENSIONS.has(extname(file))) process.exit(0);
  if (!existsSync(prettierBin)) {
    console.error('format-frontend: Prettier not installed, run npm install in frontend/');
    process.exit(0);
  }

  execFileSync(process.execPath, [prettierBin, '--write', file], { cwd: frontendDir, stdio: 'ignore' });
} catch (error) {
  console.error(`format-frontend: ${error.message}`);
}
