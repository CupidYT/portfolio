import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');
if (basePath && !/^\/[a-zA-Z0-9._-]+$/.test(basePath)) {
  throw new Error('NEXT_PUBLIC_BASE_PATH must be empty or a single repository path such as /portfolio');
}
const build = spawnSync('npm', ['run', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, GITHUB_PAGES: 'true', NEXT_PUBLIC_BASE_PATH: basePath },
});
if (build.status !== 0) process.exit(build.status ?? 1);

const target = `${basePath}/ro/`;
writeFileSync('out/index.html', `<!doctype html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${target}"><meta name="robots" content="noindex"><title>Cristian Sîrbu — Portfolio</title></head><body><a href="${target}">Deschide portofoliul lui Cristian Sîrbu</a></body></html>\n`);
writeFileSync('out/.nojekyll', '');
console.log('GitHub Pages static site ready in out/');
