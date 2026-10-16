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
  Authentication (email/password). The login UI is not the security boundary — `firestore.rules`
  is: public read, writes only for users that have a doc in `admins/{uid}`. Those rules live in
  this repo for reference but are deployed by pasting them into the Firebase Console (there's no
  `firebase.json`/CLI setup).
- Admin accounts are managed in `admin.html` itself, never by editing UIDs in the rules. While
  `meta/setup` doesn't exist the login screen is a sign-up form: the first user creates
  `admins/{own uid}` + `meta/setup` in one batch (an existing Auth account can claim it by signing
  in). The «Адміни» tab lets any admin add more: a new email gets an Auth account created on a
  secondary Firebase app (so the current admin stays signed in) plus a password-reset email; an
  email that already has an account gets an `admin_invites/{email}` doc that its owner claims on
  login once the email is verified. Removing an admin deletes only the `admins` doc (the Auth
  account stays; delete it in the console if needed). Admins can't remove themselves.
- `index.html` and `grooming.html` read the same Firestore docs at page load (`firebase.firestore()
  .collection("site_content").doc(<key>).get()`) to hydrate content that an admin edited, falling
  back to `localStorage` (`dc_services`, `dc_trainers`, `dc_pricing`, `dc_socials`, `dc_grooming`,
  `dc_grooming_meta`) and then to hardcoded defaults if Firestore is unavailable/empty.
- `services`, `trainers` and `pricing` defaults live in one place, `assets/js/site-content.js`
  (`window.DCContent`), loaded as a plain script by both `index.html` and `admin.html`.
  `DCContent.merge(kind, saved, schema)` is the single merge rule: saved items keep their order and
  membership, missing fields and an empty `src` fall back to the matching default (by `id`, or by
  `name` for trainers). Docs carry a `schema` number next to `json`; anything older than
  `DCContent.SCHEMA` gets a one-time legacy migration (old admin seed values replaced, dropped
  default items restored) and `admin.html` writes it back on load. Bump `SCHEMA` and extend the
  migration if the saved shape changes. `index.html` renders from the `localStorage` cache first,
  then re-renders once the Firestore docs arrive.
- Trainer photos and grooming gallery photos are uploaded from `admin.html` to Cloudinary
  (unsigned preset, `uploadToCloudinary`), and only the URL is stored in Firestore — no base64.
  Gallery photos are a separate Firestore collection, `grm_photos` (add/delete/list ordered by
  `createdAt`), independent of the `site_content` docs.
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
