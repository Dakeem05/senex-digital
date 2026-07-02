# Senex Digital

A full multi-page React rebuild of the "Senex Digital" agency site, built from
scratch with its own visual identity rather than a clone of the original
blue-SaaS template.

## Run it

```bash
npm install
npm run dev       # local dev server, usually http://localhost:5173
npm run build     # production build into /dist
npm run preview   # serve the production build locally
```

Requires Node 18+.

## Stack

- React 18 + React Router v6 (real routes, not a single scrolling page)
- Vite
- Tailwind CSS (custom theme — see `tailwind.config.js`)
- lucide-react for icons
- No backend — the contact form and newsletter signup are client-side only
  (they validate and show a success state, but don't send anywhere). Wire
  them up to your email provider / CRM of choice when you're ready.

## Design direction

"Senex" is Latin for elder/sage. Most agency sites sell youth and hype —
generic blue gradients, rounded cards, stock-photo energy. This one leans
into the opposite: a confident, editorial "senior strategist" feel.

- **Type**: IBM Plex Serif (headlines), IBM Plex Sans (body), IBM Plex Mono
  (labels, stats, nav) — a deliberately paired type family instead of the
  usual Playfair + Inter combo.
- **Color**: warm paper, deep ink navy, and a brass/gold accent instead of
  blue-on-white.
- **Signature device**: corner-bracket framing on photography (see
  `src/components/BracketFrame.jsx`) instead of soft rounded cards, and
  numbered "case file" labels throughout, tying into the brand's "we measure
  everything" positioning.

## Pages

- `/` — Home
- `/about` — Story, values, process
- `/services` — Full service breakdown
- `/portfolio` — Filterable case studies
- `/blog` and `/blog/:slug` — Listing + post detail
- `/contact` — Full consultation form

## Where to edit content

Almost everything text/data-related — services, case studies, testimonials,
blog posts, stats, nav links, contact info — lives in one file:
`src/data/content.js`. Change it there and it propagates everywhere.

## Replacing the photography

All images currently point to Unsplash URLs (free to use, no attribution
required) as placeholders. Swap the `image` fields in `src/data/content.js`
and the two hardcoded photos in `src/pages/Home.jsx` for your own brand
photography before launch.

---

## Customer App — Build Progress (this phase)

The marketing site above is untouched. What's new is a full customer
dashboard wired to the real Senex API (Laravel + Sanctum), built from the
provided Postman collection.

### Setup

```bash
cp .env.example .env   # set VITE_API_BASE_URL to your API origin
npm install
npm run dev
```

### What's built and wired to real endpoints

- **Architecture**: `src/services` (one file per API resource, matching the
  Postman collection exactly), `src/hooks` (TanStack Query wrappers —
  caching, loading/error state, mutations), `src/store` (Zustand: auth
  session, toasts), `src/lib/http` (axios client, bearer-token injection,
  401 handling, normalized `ApiError`), `src/routes` (guards).
- **Auth**: register → OTP verify → login, forgot/reset password (send-code
  → verify-code → reset), logout, protected/guest route guards, global
  session-expiry handling.
- **Dashboard**: overview, wallet (balance, deposit via Kora/Paystack
  redirect, grouped transaction history), product discovery (categories,
  search, product detail + reviews), cart (quantities, coupons, wallet or
  gateway checkout), orders (list + detail), notifications (read/unread,
  delete), profile (update name, avatar upload, delete account).
- Toasts, empty/error/loading states, confirm dialogs for destructive
  actions, route-level code splitting for the auth/dashboard bundle.

### Decisions worth knowing about

- **No refresh-token flow.** The collection only issues a single long-lived
  Sanctum token at login — there's no refresh endpoint. The original spec
  asked for one; I didn't invent one that doesn't exist in the API. If the
  backend adds one later, `src/store/authStore.js` and `src/lib/http/apiClient.js`
  are the only places that need to change.
- **Token storage is localStorage**, documented inline in `authStore.js` —
  this API has no cookie-session support, so that's the realistic option for
  a bearer-token SPA. Mitigated by strict input handling elsewhere, not by
  where the token lives.
- **Profile update** mirrors the collection exactly (query-string params,
  empty body) rather than guessing a JSON shape that was never demonstrated.
- A couple of endpoints' field sets (e.g. profile `phone_number`) are
  inferred only where directly evidenced by a saved validation-error
  response in the collection — nothing was invented beyond that.

### Deliberately deferred (next phase)

- **Admin app** — the brief is explicit this must be a fully separate
  project (own auth, routing, deploy). It hasn't been started; building it
  inside this repo would violate that requirement. All admin endpoint paths
  are already mapped in `src/constants/endpoints.js` for when that project
  starts.
- Public blog pages (the `/blogs` endpoints are public/no-auth and unrelated
  to the dashboard build) and CI/CD pipeline config.

# senex-digital
