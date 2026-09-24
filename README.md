# dog-care

Static site (index.html, admin.html, grooming.html) plus one serverless
function (`api/send-telegram.js`) that keeps the Telegram bot token off the
client. Deploy the whole repo as a single Vercel project — Vercel serves the
HTML/assets as static files and auto-detects `api/*.js` as functions.

## Deploy

1. `vercel` (from repo root) or import the repo via the Vercel dashboard.
2. In the project's Environment Variables, add:
   - `TELEGRAM_BOT_TOKEN` — get a fresh one from @BotFather (the old one
     leaked into git history and must be treated as compromised).
   - `TELEGRAM_CHAT_ID`
3. `vercel --prod` (or redeploy from the dashboard) after adding the env vars.
4. Set your own admin password in `admin.html` (`CREDS.pass`) before going live.
