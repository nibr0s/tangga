# Turning on Kak Tangga (the AI tutor)

You don't need to train a model. Kak Tangga's "brain" is already written (`www/ai.js`: tutor rules, lesson builder, topic splitter). This guide plugs it into Claude through a tiny server you own. About 30 minutes, once.

```
Student's phone (web / Android)
        │  question
        ▼
Tangga server  ── Cloudflare Worker, free plan (folder server/)
        │  holds the API key, daily limits, safety rules, reports
        ▼
Claude Haiku 5.5  ── Anthropic API, pay per use
```

The API key lives only on the server. It never ships inside the app, so nobody can copy it from the APK or the website.

## Why Claude and not Gemini

Tangga's users are mostly under 18. Google's Gemini API terms forbid using it in apps "directed towards or likely to be accessed by individuals under the age of 18". Anthropic allows apps for minors **if** you add safeguards. Tangga already has them:

| Anthropic asks for | In Tangga |
|---|---|
| Tell users they're talking to an AI | Consent screen + a note at the top of every chat |
| Age checks | Age question; under-18s must confirm a parent/guardian knows and agrees |
| Content filtering | Safety rules added on the server to every request (`server/src/index.js`, `SAFETY`) + Claude's own safety |
| Monitoring and reporting | "Laporkan jawaban ini" under every AI reply → your admin page |
| Guidance on safe use | Consent screen: no personal data, answers can be wrong, 112 in emergencies |
| Follow child-privacy law, say so publicly | `www/privasi.html` (Indonesia's UU 27/2022 PDP). **Read it and adjust — this isn't legal advice.** |

## What it costs

Claude Haiku 5.5: **$0.10 per million input tokens, $0.50 per million output tokens** ([pricing](https://platform.claude.com/docs/en/about-claude/pricing)).

One Kak Tangga reply ≈ 2,000 tokens in (rules + recent chat) + 250 tokens out ≈ **$0.0003**. A photo of a question adds about $0.0002. Building a whole AI lesson (custom ladders only) is about $0.002.

| Who | Messages | Per month |
|---|---|---|
| 50 friends, 10 messages/day each | 15,000 | ≈ $5 |
| 500 students, 10/day | 150,000 | ≈ $49 |
| 1,000 heavy users, 20/day | 600,000 | ≈ $195 |

Everything else is free at this size: Cloudflare Workers free plan (100,000 requests/day), its SQLite storage, and GitHub Pages.

**Your cost can't run away.** Three brakes, from soft to hard:

1. Each device gets **30 messages a day** (`DAILY_PER_DEVICE`).
2. The whole app stops at **1,000 messages a day** (`DAILY_GLOBAL`) — at most about $10–15 a month. Students see "Kak Tangga sedang istirahat… coba lagi besok".
3. A **monthly spend limit** you set in the Anthropic Console. When it's hit, Kak Tangga pauses; the rest of the app keeps working.

Raise the limits slowly as you see real usage on the admin page.

## Setup, step by step

You need: a card that works for international online payments (Anthropic sells API credit in USD), and about 30 minutes.

### 1. Anthropic (Claude)

1. Sign up at **platform.claude.com**.
2. **Billing** → buy a small amount of credit (start with $5). New accounts may also get a small free test credit.
3. **Billing → Spend limits** → set a monthly limit you're comfortable with (e.g. $10).
4. **API keys** → *Create key* → name it `tangga-server` → copy it somewhere safe. You'll only see it once.

### 2. Cloudflare (the server)

1. Sign up at **dash.cloudflare.com** (free).
2. Open **Workers & Pages** once. If it asks you to choose a `workers.dev` subdomain, pick one (e.g. `nibras`). Your server will live at `https://tangga-api.<subdomain>.workers.dev`.
3. Copy your **Account ID** (Workers & Pages overview, right side; or the URL `dash.cloudflare.com/<ACCOUNT_ID>/…`).
4. **My Profile → API Tokens → Create Token** → template **Edit Cloudflare Workers** → *Continue* → *Create* → copy the token.

### 3. GitHub (connects everything)

In this repo: **Settings → Secrets and variables → Actions → New repository secret**. Add four:

| Name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | the token from 2.4 |
| `CLOUDFLARE_ACCOUNT_ID` | the ID from 2.3 |
| `ANTHROPIC_API_KEY` | the key from 1.4 |
| `TANGGA_ADMIN_KEY` | a long random password you invent — it opens your admin page |

### 4. Deploy the server

**Actions → Server → Run workflow**. When it's green, open the run → step **Deploy to Cloudflare Workers** → copy the address ending in `workers.dev`.

(After this, any change inside `server/` redeploys automatically when pushed to `main`.)

### 5. Point the app at it

Edit `www/config.js` on GitHub (pencil icon):

```js
api: 'https://tangga-api.<subdomain>.workers.dev',
```

Commit to `main`. The website and the APK rebuild by themselves in ~5 minutes.

### 6. Try it

Open the site → tap ✦ (top right) → go through the "Kenalan dulu" screen → ask something. Then check your admin page:

```
https://tangga-api.<subdomain>.workers.dev/admin?key=<TANGGA_ADMIN_KEY>
```

It shows daily active devices, new devices, AI messages, tokens, an estimated cost for the month, every report and feedback message (with a **Selesai** button), and a form to delete a device's data when someone asks (they give you the 8-character code shown in their Settings).

## Knobs (server/wrangler.toml)

| Setting | Default | Meaning |
|---|---|---|
| `DAILY_PER_DEVICE` | 30 | messages per device per day (resets 00:00 WIB) |
| `DAILY_GLOBAL` | 1000 | messages per day for everyone together — your cost ceiling |
| `DAILY_PER_IP` | 400 | per network; high on purpose, because many students share mobile-carrier IPs |
| `MODEL` | `claude-haiku-5-5` | the Claude model |
| `AI_ENABLED` | `true` | `false` pauses Kak Tangga; reports and stats keep working |
| `ALLOWED_ORIGINS` | GitHub Pages + Android app | add your domain here if you move off `github.io` |

Change, commit, push — the Server workflow redeploys.

## Your weekly 10 minutes

- Read the admin page: reports first (they're your free QA team), then daily users.
- Fix wrong content you're told about; mark reports **Selesai**.
- Look at "Ditolak (batas)": if many students hit the daily limit, that's a signal to raise it — or a pricing experiment.

## Running the server on your laptop (optional)

```bash
cd server
npm install
cp .dev.vars.example .dev.vars   # put a real or test key inside
npx wrangler dev                 # http://localhost:8787
```
