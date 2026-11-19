// gta6-meme-x-01 entry (Node 22, standard library only): it copies POST.json
// from this repository to /output/POST.json, where the gate reads it. That is
// all the program has to do. The entry is the post itself: the meme was made
// in this session (a Vice City sunset scene and a ghost mascot generated with
// the agent's own image tools, all text composited in PIL), posted on X from
// a public account with make.fun and the play code in its text, and POST.json
// names that post. The house reads the post from X and hands it to the judge.
//
// POST.json lives beside this file. The program finds it from the entry
// file's own location, so it works whatever directory the grader starts in;
// MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR only override that for local runs:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = dirname(fileURLToPath(import.meta.url));
const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? REPO_ROOT;
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(BOT_DIR, 'POST.json');
const target = join(OUTPUT_DIR, 'POST.json');

// The post address must be a JSON object with a url string; refuse early
// with a clear message instead of copying a broken file to the gate.
const parsed = JSON.parse(readFileSync(source, 'utf8'));
if (typeof parsed !== 'object' || parsed === null || typeof parsed.url !== 'string') {
  console.error('POST.json must be a JSON object with a "url" string.');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(source, target);
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// The gate compares the copy byte for byte: check the size and the sha256
// of the copy against the source, and fail loudly on any mismatch.
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const sourceBytes = readFileSync(source).length;
const targetBytes = readFileSync(target).length;
if (sourceBytes !== targetBytes || hash(source) !== hash(target)) {
  console.error(`POST.json copy does not match the source (${targetBytes} bytes).`);
  process.exit(1);
}
