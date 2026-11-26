# Get the most reposts and likes on make.fun's newest X posts

[![make.fun bounty](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/skykc/x-reposts-02/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/skykc/x-reposts-02/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02)

Entry for the [make.fun bounty "Get the most reposts and likes on make.fun's
newest X posts"](https://make.fun/bounty/makefun-x-reposts-02) — pot $500
(1st $100, 2nd $60, 3rd $30, 4th–10th $10, 11th–50th $6), entries close
28 November 2026 14:30 WIB.

make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win. Its
account on X is [@makefunai](https://x.com/makefunai).

## How this entry scores

The entry is our own posts on X: each one a quote of, or a direct reply to,
a different one of make.fun's newest posts on x.com/makefunai (the pool
starts at
[the post of 24 November 2026](https://x.com/makefunai/status/2125053632605196760)
and every new @makefunai post joins it the moment it is made), all from one
public account, each carrying make.fun (or @makefunai) and our play code in
its own words. `POSTS.json` at this repository's root names them, up to 15.

The house reads each post's counts through FxTwitter and scores:

    score = sum over all our posts of (likes + 2 x reposts + 2 x quotes)

Views and replies move nothing. A post deleted, or its account made private,
before the deadline reading adds 0 — **the posts stay up and public until
the results are out. Never delete a posted entry post.**

## The program

`main.ts` (Node 22, standard library only) validates `POSTS.json` — a JSON
object `{"posts": [...]}`, 1 to 15 addresses, each an X post address
(`https://x.com/<handle>/status/<digits>`, twitter.com and
`/i/web/status/<id>` forms also accepted), no post named twice — and copies
it to `/output/POSTS.json`, where the gate reads it. That is all it has to do.

Run it the way the grader does:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

## Posting plan (for the person posting from @qoricu99)

Post from the one public X account @qoricu99, kept public until the results
are out. Each post is a **quote** (Repost button, then Quote, on make.fun's
post itself) or a **direct reply** (Reply on make.fun's post itself — never
a reply to someone else's reply). One of our posts per make.fun pool post.
Each post's own words carry make.fun (written out, or a link to make.fun)
and/or @makefunai, plus the play code `makefun-alley-donut-apron` exactly
as written. No video is attached, so no referral end card is needed.

### Post 1 — FINAL, ready to post (quote of the pool floor post)

Target: https://x.com/makefunai/status/2125053632605196760
("MADE WITH AI: Mike Houser built AOD: Age of Dragon with Claude in a few
days, after quitting their job with $1,400 left. Two months on, they're
profitable." — 24 Nov 2026)

> Quit his job with $1,400 left, built a dragon game with Claude in a few days — two months later it's profitable 🤯 My agent builds on make.fun and it actually works! @makefunai https://make.fun
> makefun-alley-donut-apron

### Posts 2–5 — drafts to tailor at posting time

Before posting, open https://x.com/makefunai and pick the newest pool posts
(any @makefunai post with an id at or above 2125053632605196760 that is not
a plain repost or a reply to another account). Rewrite each draft below in
words that answer THAT post — never paste a template unchanged under every
post. Keep each one short, enthusiastic, with the "it actually works" claim,
make.fun (or @makefunai) and the play code, and no word "bounty".

- New-bounty announcement post: "A new challenge just dropped on make.fun and my agent is already building 👀 It actually works — watch what it makes next! @makefunai https://make.fun
  makefun-alley-donut-apron"
- Winner announcement post: "Look at what an agent just built on make.fun — from one prompt to a finished thing that actually works 🤯 @makefunai https://make.fun
  makefun-alley-donut-apron"
- "Made with AI" story post: "Quit everything, built it with an agent, and it works — this is why I love make.fun 🚀 @makefunai https://make.fun
  makefun-alley-donut-apron"
- Any other pool post: "My AI agent builds on make.fun and it actually works — one prompt in, a real thing out 😄 @makefunai https://make.fun
  makefun-alley-donut-apron"

After posting, copy each post's address (Share → Copy link) and replace the
placeholder in `POSTS.json` with the real addresses, in the same order as
the drafts above. Then re-run the program, commit, push, and submit — the
last submission before the deadline counts, and only the posts it names.

## What the house checks

- Every listed post is readable, posted inside the window, by the same X
  account (never @makefunai), quoting or replying directly to a different
  pool post, carrying make.fun or @makefunai and one of our play codes in
  its own words, and not entered first by another account.
- Never buy reposts, quotes or likes, never use bots, engagement services
  or pods, and never repost, quote or like our own posts from our own or
  coordinated accounts: those disqualify the entry.
- Never post the same update again and again, and never ask anyone to
  repost the same thing many times.
