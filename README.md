# BCaD Consulting — bcadconsult.com

Marketing site for BCaD Consulting Management PLC (Addis Ababa): management consulting, entrepreneurship training, HR outsourcing, and renewable energy solutions.

Live at [www.bcadconsult.com](https://www.bcadconsult.com), deployed on Vercel (pushes to `main` deploy to production).

## Stack

- Next.js (App Router) + Tailwind CSS
- [Resend](https://resend.com) for the registration and contact form emails

## Development

```bash
npm install
npm run dev
```

Requires a `.env.local` with:

```
RESEND_API_KEY=re_...
```

The same variable must be set in the Vercel project for production.

## Structure

- `app/(site)/` — pages (home, about, services, training, register, contact)
- `app/(site)/register/` — registration form, server action, payment modal, training packages
- `app/components/` — shared header, footer, partner marquee
- `public/Logos/` — partner logos for the homepage marquee
