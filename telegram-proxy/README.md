# telegram-proxy

Serverless proxy so the Telegram bot token never ships to the browser.

## Deploy

1. `npm i -g vercel` (or use the Vercel dashboard "Import Project").
2. From this folder: `vercel` (first deploy) then `vercel --prod`.
   - If importing via the dashboard instead, set **Root Directory** to `telegram-proxy`.
3. In the Vercel project settings → Environment Variables, add:
   - `TELEGRAM_BOT_TOKEN` — get a fresh one from @BotFather (`/revoke` the old leaked one first).
   - `TELEGRAM_CHAT_ID`
4. Redeploy after adding env vars so they take effect.
5. Copy the deployment URL (e.g. `https://dog-care-telegram-proxy.vercel.app`) and put
   `https://dog-care-telegram-proxy.vercel.app/api/send-telegram` into `TELEGRAM_PROXY_URL`
   in `index.html` and `grooming.html` at the repo root.
6. If the site is served from a different origin than `https://mr-sempai.github.io`
   (e.g. a custom domain), add it to `ALLOWED_ORIGINS` in `api/send-telegram.js`.
