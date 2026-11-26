// makefun-x-reposts-02 entry (Node 22, standard library only).
//
// The entry is the X posts themselves: posts of our own on X, each one a
// quote of, or a direct reply to, a different one of make.fun's newest
// posts on x.com/makefunai, all from one public account, carrying make.fun
// (or @makefunai) and our play code in their own words. POSTS.json at the
// repository root names those posts; this program checks the list is
// well-formed and copies it to /output/POSTS.json, where the gate reads it.
// Nothing this program writes about the posts is scored: the house reads
// the posts themselves through FxTwitter, and the score is the sum over
// all our posts of (likes + 2 x reposts + 2 x quotes). Views move nothing.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const MAX_POSTS = 15;

// The address forms the rules accept: x.com or twitter.com, with an
// optional www./mobile. prefix, either /<handle>/status/<digits> or
// /i/web/status/<digits>. A query or fragment after the id is read past,
// so strip it before matching.
const POST_URL =
  /^https?:\/\/(?:www\.|mobile\.)?(?:x\.com|twitter\.com)\/(?:[^/\s]+\/status\/(\d+)|i\/web\/status\/(\d+))(?:[?#].*)?$/;

function fail(message: string): never {
  console.error(`POSTS.json refused: ${message}`);
  process.exit(1);
}

function readPostList(): string[] {
  let raw: string;
  try {
    raw = readFileSync(join(BOT_DIR, 'POSTS.json'), 'utf8');
  } catch (err) {
    fail(`could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw!);
  } catch (err) {
    fail(`is not valid JSON: ${(err as Error).message}`);
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    fail('must be a JSON object of the form {"posts": [...]}');
  }
  const posts = (parsed as { posts?: unknown }).posts;
  if (!Array.isArray(posts)) {
    fail('"posts" must be a list of post addresses');
  }
  if (posts.length < 1 || posts.length > MAX_POSTS) {
    fail(`"posts" must name 1 to ${MAX_POSTS} posts, got ${posts.length}`);
  }
  const seen = new Set<string>();
  for (const item of posts) {
    if (typeof item !== 'string') {
      fail(`every post address must be a string, got ${JSON.stringify(item)}`);
    }
    const match = POST_URL.exec(item);
    if (match === null) {
      fail(
        `${JSON.stringify(item)} is not an X post address ` +
          '(expected https://x.com/<handle>/status/<digits>)',
      );
    }
    const id = match[1] ?? match[2];
    // A post by @makefunai itself is refused: the entry's posts must be
    // our own, never make.fun's own account. The /i/web/status form
    // carries no handle, so it has nothing to check here.
    const handleMatch = /(?:x\.com|twitter\.com)\/([^/\s]+)\/status\//.exec(item);
    if (handleMatch !== null && handleMatch[1]!.toLowerCase() === 'makefunai') {
      fail(`post ${id} is by @makefunai itself, which the rules refuse`);
    }
    if (seen.has(id!)) {
      fail(`post ${id} is named twice`);
    }
    seen.add(id!);
    console.log(`accepted post ${id}`);
  }
  return posts as string[];
}

const posts = readPostList();
mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POSTS.json'), join(OUTPUT_DIR, 'POSTS.json'));
} catch (err) {
  console.error(
    `POSTS.json could not be copied to ${OUTPUT_DIR}: ${(err as Error).message}`,
  );
  process.exit(1);
}
console.log(`wrote ${posts.length} post(s) to ${join(OUTPUT_DIR, 'POSTS.json')}`);
