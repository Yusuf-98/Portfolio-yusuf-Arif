import { readFileSync, writeFileSync } from 'node:fs';

const FILE = '.next/server/app/index.html';
const MARKER = 'id="deferred-scripts"';
const ASYNC_SCRIPT =
  /<script src="(\/_next\/static\/chunks\/[^"]+\.js)"( id="([^"]+)")? async=""><\/script>/g;
const SCRIPT_PRELOAD =
  /<link rel="preload" as="script" fetchPriority="low" href="\/_next\/static\/chunks\/[^"]+\.js"\/>/g;
const BLOCKING_SCRIPT = /<script src="\/_next\/[^"]+"(?![^>]*(async|noModule))[^>]*>/;

// --- Check ---
const html = readFileSync(FILE, 'utf8');

if (process.argv.includes('--check')) {
  if (!html.includes(MARKER)) {
    console.error(`defer-next-scripts: loader missing in ${FILE}`);
    process.exit(1);
  }
  console.log('defer-next-scripts: loader present');
  process.exit(0);
}

// --- Rewrite ---
if (html.includes(MARKER)) {
  console.log('defer-next-scripts: already applied');
  process.exit(0);
}

const scripts = [...html.matchAll(ASYNC_SCRIPT)].map((m) => ({
  src: m[1],
  id: m[3] ?? null,
}));

if (scripts.length < 5 || BLOCKING_SCRIPT.test(html) || !html.includes('</body>')) {
  console.warn('defer-next-scripts: unexpected HTML, left unchanged');
  process.exit(0);
}

const loader =
  `<script ${MARKER}>(function(){var s=${JSON.stringify(scripts)},d=!1;` +
  'function g(){if(d)return;d=!0;s.forEach(function(x){var e=document.createElement("script");' +
  'e.src=x.src;e.async=!0;if(x.id)e.id=x.id;document.body.appendChild(e)})}' +
  'requestAnimationFrame(function(){setTimeout(g,0)});setTimeout(g,3000)})()</script>';

writeFileSync(
  FILE,
  html
    .replace(ASYNC_SCRIPT, '')
    .replace(SCRIPT_PRELOAD, '')
    .replace('</body>', `${loader}</body>`)
);
console.log(`defer-next-scripts: ${scripts.length} scripts deferred`);
