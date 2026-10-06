# Webstead

A responsive five-page agency site with a React/Vite frontend and an Express API for project enquiries. The layout follows the general clarity, confident typography and conversion-focused approach visible on EcomBold, interpreted through Webstead's blue-and-orange identity.

## Requirements

- Node.js 20 or later
- SMTP credentials for direct contact-form email delivery

## Architecture

- `client/` — React, Vite, React Router, Tailwind, Framer Motion and reusable page components.
- `server/` — Express API, validation, rate limiting and direct SMTP email delivery. No database is required for contact submissions.
- The main routes are `/`, `/services`, `/about`, `/work` and `/contact`.

## Local setup

1. Install root and app dependencies:

   ```sh
   npm install
   npm install --prefix client
   npm install --prefix server
   ```

2. Copy `server/.env.example` to `server/.env` and configure `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, and `CONTACT_RECEIVER`. The default recipient is `webstead.in@gmail.com`. For a Gmail sender, use its app password. Credentials stay on the server; never use a `VITE_` prefix for credentials. Without SMTP credentials, submission returns an error and preserves the form details.

3. Start both apps:

   ```sh
   npm run dev
   ```

   The frontend runs at `http://localhost:5173`; the API runs at `http://localhost:5000`. To point the frontend at a separately hosted API, set `VITE_API_URL` in `client/.env.local` to the API origin.

## Build

```sh
npm run build
```

The production frontend bundle is written to `client/dist`. Start the API with `npm start` (or `npm start --prefix server` from the repository root).

## API

- `GET /api/health` — health check
- `POST /api/contact` — validates and emails an enquiry to the configured recipient; returns `sent: true` only after SMTP acceptance

The contact API is rate limited. Required request fields are `name`, `email`, `service`, `message` and `privacy: true`. The form has no delivery-method selection or email-app handoff. No enquiry is stored in a database. SMTP acceptance confirms handoff to the mail provider, not inbox placement.

## Deployment

### Vercel frontend

- Set the Vercel project root to `client`.
- Build command: `npm run build`; output directory: `dist`.
- Set `VITE_API_URL` to the deployed backend origin.
- Configure SPA fallback rewrites so React Router routes serve `index.html`.

### Render or Railway backend

- Set the service root to `server` (or use the repository root with `npm start --prefix server`).
- Build/install command: `npm install`; start command: `npm start`.
- Configure `CLIENT_ORIGIN`, `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, and `CONTACT_RECEIVER` as provider environment variables. Set `PORT` only if the platform does not inject it.

## Content notes

Project cards and testimonials are clearly marked as illustrative placeholders. Replace them with approved client work, quotes, photos and verified results before launch. Contact email and social destinations are editable in `client/src/components/Site.jsx` and `client/src/pages/Contact.jsx`.

## Webstead content

The Webstead logo is served from client/public/webstead-logo.jpg. Replace it with an optimized transparent PNG or SVG when available. The supplied active project URLs, Instagram profile, Indian phone numbers, and contact email are wired into the portfolio and contact details. Website packages are in client/src/data/packages.js; adjust included scope with the prices before publication.
