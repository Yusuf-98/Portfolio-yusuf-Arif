import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const NEXT_FILE = '.next/server/app/index.html';
const VERCEL_OUTPUT = '/vercel/output';
const MARKER = 'id="deferred-scripts"';
const ASYNC_SCRIPT =
  /<script src="(\/_next\/static\/chunks\/[^"]+\.js)"( id="([^"]+)")? async=""><\/script>/g;
const SCRIPT_PRELOAD =
  /<link rel="preload" as="script" fetchPriority="low" href="\/_next\/static\/chunks\/[^"]+\.js"\/>/g;
const BLOCKING_SCRIPT = /<script src="\/_next\/[^"]+"(?![^>]*(async|noModule))[^>]*>/;

// --- Helpers ---
function rewrite(html) {
  if (html.includes(MARKER)) return null;
  const scripts = [...html.matchAll(ASYNC_SCRIPT)].map((m) => ({
    src: m[1],
    id: m[3] ?? null,
  }));
  if (scripts.length < 5 || BLOCKING_SCRIPT.test(html) || !html.includes('</body>')) {
    return null;
  }
  const loader =
    `<script ${MARKER}>(function(){var s=${JSON.stringify(scripts)},d=!1;` +
    'function g(){if(d)return;d=!0;s.forEach(function(x){var e=document.createElement("script");' +
    'e.src=x.src;e.async=!0;if(x.id)e.id=x.id;document.body.appendChild(e)})}' +
    'requestAnimationFrame(function(){setTimeout(g,0)});setTimeout(g,3000)})()</script>';
  return html
    .replace(ASYNC_SCRIPT, '')
    .replace(SCRIPT_PRELOAD, '')
    .replace('</body>', `${loader}</body>`);
}

function allFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) return allFiles(path);
    return stat.size < 2_000_000 ? [path] : [];
  });
}

function isHomePage(html) {
  return html.includes('id="hero"') && html.includes('</body>');
}

// --- Check ---
if (process.argv.includes('--check')) {
  if (!readFileSync(NEXT_FILE, 'utf8').includes(MARKER)) {
    console.error(`defer-next-scripts: loader missing in ${NEXT_FILE}`);
    process.exit(1);
  }
  console.log('defer-next-scripts: loader present');
  process.exit(0);
}

// --- Rewrite ---
const files = [NEXT_FILE];
if (existsSync(VERCEL_OUTPUT)) {
  const outputFiles = allFiles(VERCEL_OUTPUT);
  console.log(`defer-next-scripts: ${outputFiles.length} files in ${VERCEL_OUTPUT}`);
  outputFiles.slice(0, 40).forEach((f) => console.log(`  ${f}`));
  files.push(...outputFiles.filter((f) => isHomePage(readFileSync(f, 'utf8'))));
} else if (process.env.VERCEL) {
  console.warn(`defer-next-scripts: ${VERCEL_OUTPUT} not found`);
}

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  if (html.includes(MARKER)) {
    console.log(`defer-next-scripts: already applied in ${file}`);
    continue;
  }
  const output = rewrite(html);
  if (!output) {
    console.warn(`defer-next-scripts: unexpected HTML in ${file}, left unchanged`);
    continue;
  }
  writeFileSync(file, output);
  console.log(`defer-next-scripts: scripts deferred in ${file}`);
}
