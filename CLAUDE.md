# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static marketing site for a dog grooming business (`index.html`, `grooming.html`) plus a
password-gated admin panel (`admin.html`) for editing site content, and one Vercel serverless
function (`api/send-telegram.js`) that forwards booking-form submissions to Telegram. There is no
build step, no bundler, no package.json, and no test suite — pages are large single HTML files with
inline `<script>` blocks and CDN-loaded dependencies (React 18 + Babel standalone for JSX-in-browser,
GSAP/ScrollTrigger for animation, Firebase compat SDKs for Firestore).

`legacy/` holds an older, pre-refactor version of the site (separate `.jsx` files, old CSS) kept for
reference only — it is not deployed and should not be edited unless explicitly asked to.

## Running / testing locally

No install or build step exists. To preview:

```
vercel dev        # serves static files + api/*.js the same way production does
```

or simply open the HTML files directly in a browser (Firestore/Telegram features need network access
either way; there's no local mock). There is no lint or test command — verify changes by opening the
page in a browser and exercising the flow manually.

## Deployment

Single Vercel project (see `.vercel/project.json`, project name `dog-care`). Vercel serves the root
HTML/assets as static files and auto-detects `api/*.js` as serverless functions — no `vercel.json`
needed.

```
vercel            # preview deploy
vercel --prod     # production deploy
```

Required Vercel env vars: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (see `api/send-telegram.js`).
A GitHub Actions workflow (`.github/workflows/deploy.yml`) also mirrors `main` to a `gh-pages` branch
via `github-pages-deploy-action` — this is a secondary/legacy static mirror; the Vercel deployment is
the one with a working `/api` proxy.

**Note:** a Telegram bot token previously leaked into git history and was rotated; never commit real
token values into `api/send-telegram.js` or anywhere else — they belong only in Vercel's encrypted env
vars.

## Content architecture — how data flows between admin.html and the site

This is the part that isn't obvious from reading any single file:

- **Firestore is the source of truth** for editable content, in the `site_content` collection.
  Each doc holds one JSON blob under a `json` string field. The doc keys are fixed:
  `services`, `trainers`, `pricing`, `socials`, `grooming`, `grooming_meta` (see `SITE_KEYS` in
  `admin.html`).
- `admin.html` reads/writes these docs (`fsContent().doc(key)...`) after signing in with Firebase
  Authentication (email/password, `firebase.auth().onAuthStateChanged` opens the dashboard). The
  login UI is not the security boundary — `firestore.rules` is: public read, writes only for the
  admin UID. Those rules live in this repo for reference but are deployed by pasting them into the
  Firebase Console (there's no `firebase.json`/CLI setup).
- `index.html` and `grooming.html` read the same Firestore docs at page load (`firebase.firestore()
  .collection("site_content").doc(<key>).get()`) to hydrate content that an admin edited, falling
  back to `localStorage` (`dc_services`, `dc_trainers`, `dc_pricing`, `dc_socials`, `dc_grooming`,
  `dc_grooming_meta`) and then to hardcoded defaults if Firestore is unavailable/empty.
- Grooming gallery photos are a separate Firestore collection, `grm_photos` (add/delete/list ordered
  by `createdAt`), independent of the `site_content` docs.
- Firebase project id is `dog-care-9aef2`; the config object (apiKey etc.) is intentionally public
  client config — that's expected for Firebase web apps and is not a secret by itself, but Firestore
  security rules (`firestore.rules`) are what actually gate writes.
- The booking/contact form flow calls `/api/send-telegram` (same-origin on Vercel) rather than
  hitting the Telegram API directly, so the bot token stays server-side.

When editing content-related logic, changes to the shape of a `site_content` doc's JSON need to be
kept in sync across all three files that touch it (`admin.html`, `index.html`, `grooming.html`), plus
the `localStorage` fallback key and any hardcoded default.

## Working inside the big HTML files

`index.html`, `grooming.html`, and `admin.html` are each several thousand lines mixing markup, CSS,
and multiple `<script>` blocks (a small vanilla `<image-slot>` custom element, then a
`type="text/babel"` block containing the actual React app for that page). When making targeted edits,
search for the relevant section/component name rather than reading the whole file, and check whether
the same UI text/logic is duplicated across `index.html` and `grooming.html` (they share a header,
footer, and Telegram-proxy call pattern but are otherwise independent React trees compiled separately
by Babel in-browser).
