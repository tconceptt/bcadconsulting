# BCaD Consulting — bcadconsult.com

Marketing site for BCaD Consulting Management PLC (Addis Ababa): management consulting, entrepreneurship training, HR outsourcing, and renewable energy solutions.

Live at [www.bcadconsult.com](https://www.bcadconsult.com), deployed on Vercel (pushes to `main` deploy to production).

## Stack

- Next.js (App Router) + Tailwind CSS v4
- [Convex](https://convex.dev) — stores training registrations
- [Resend](https://resend.com) for the registration, contact form, and admin sign-in emails
- [shadcn/ui](https://ui.shadcn.com) (Base UI) — **admin pages only**, see the note below

## Development

```bash
npm install
npx convex dev     # in one terminal — pushes functions, watches convex/
npm run dev        # in another
```

`npx convex dev` writes `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` into `.env.local` for you. The rest must be set by hand:

```
RESEND_API_KEY=re_...
CONVEX_SERVER_SECRET=...     # must equal SERVER_SECRET on the Convex deployment
SESSION_SECRET=...           # signs the /admin session cookie
ADMIN_EMAILS=info@bcadconsult.com,someone@bcadconsult.com
```

Generate the two secrets with `openssl rand -base64 32`.

## Registrations

`/register` writes to Convex **before** sending any email, so a Resend outage
delays the notifications but never loses an applicant. The confirmation email's
success is recorded on the row, and `/admin` flags anyone we failed to write to.

The form is also protected by a hidden honeypot field, a 10-minute dedupe on
email + package, and per-email and site-wide rate limits.

### Admin dashboard

`/admin` is the reconciliation tool: staff match manual bank transfers to
registrations. It is not linked from the site and is excluded from
`robots.txt`.

- A dense table (cards on phones), one line per registration, defaulting to
  the **Needs attention** queue — anyone still unpaid, plus anyone whose
  confirmation email failed.
- **Amount ETB** per row with running Outstanding / Collected totals, because
  reconciliation is matching against the numbers on a bank statement.
- The current status doubles as a **Change status** menu (Pending / Paid /
  Cancelled), applied optimistically with an **Undo** toast rather than a
  confirmation dialog.
- Row detail opens in a docked side panel on desktop and a compact centred
  dialog on phones.
- Admin notes are **hidden from the UI** for now. The `adminNotes` field, the
  `setAdminNotes` mutation, the `saveNotes` action and the CSV column are all
  still in place, so surfacing it again is a UI-only change.
- The whole list is fetched once and filtered in the browser, so search and
  filters are instant and the chip counts stay honest across every view.
  Search is tokenised and order-independent, and normalises phone numbers so
  `0911…` matches a stored `+251911…`.
- CSV export mirrors the current filter and search.

### shadcn/ui and the public site

shadcn components are used **only** under `/admin`. `app/globals.css` is
shared with the marketing pages, so the integration is deliberately additive:

- The brand `--background`, `--foreground` and `--font-sans` declarations must
  stay as they are. `npx shadcn init` overwrites all three (and swaps
  Source Sans 3 for Geist in `app/layout.tsx`) — after **any** future `shadcn`
  command, run `git diff app/globals.css app/layout.tsx` and check them.
- `@custom-variant dark (&:is(.dark *))` binds shadcn's `dark:` classes to a
  class nothing sets. Without it Tailwind v4 falls back to
  `prefers-color-scheme` and the admin UI half-flips to dark styling.
- The default border colour shadcn components assume is scoped to
  `.admin-scope` (applied in `app/admin/layout.tsx`), never globally — the
  public pages have many bare `border` utilities that expect current
  behaviour.

Access is by emailed magic link — no shared password. Only addresses in
`ADMIN_EMAILS` can sign in, and that list is re-checked on every request, so
removing an address revokes access immediately even if their cookie is valid.
Sessions last 30 days.

### Convex security model

This app has no Convex auth provider — the admin session is a Next.js cookie,
which Convex cannot verify. Because Convex functions are reachable from the
public internet at the deployment URL, **every** function instead requires a
`secret` argument matched against `SERVER_SECRET` on the deployment. The
browser never calls Convex directly; all traffic goes through server actions
and route handlers.

## Deployment

The Vercel build command (`vercel.json`) is
`npx convex deploy --cmd 'npm run build'`, which pushes Convex functions and
injects the production `NEXT_PUBLIC_CONVEX_URL` before Next builds.

Required Vercel environment variables:

| Variable | Notes |
| --- | --- |
| `CONVEX_DEPLOY_KEY` | Production deploy key from the Convex dashboard |
| `CONVEX_SERVER_SECRET` | Must equal `SERVER_SECRET` on the **production** Convex deployment |
| `SESSION_SECRET` | Any 32-byte random string |
| `ADMIN_EMAILS` | Comma-separated allowlist |
| `RESEND_API_KEY` | Existing |

And on the production Convex deployment itself:

```bash
npx convex env set SERVER_SECRET "<same value as CONVEX_SERVER_SECRET>" --prod
```

## Structure

- `app/(site)/` — pages (home, about, services, training, register, contact)
- `app/(site)/register/` — registration form, server action, payment modal, packages, labels
- `app/admin/` — registrations dashboard, magic-link sign-in, CSV export
- `app/lib/` — admin session/allowlist helpers, Convex server secret
- `convex/` — schema, registration and admin-auth functions, rate limits
- `app/components/` — shared header, footer, partner marquee
- `public/Logos/` — partner logos for the homepage marquee
