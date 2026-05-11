# PRD — Jain Associates Website

## Original Problem Statement
Build a website for an investment & insurance business with: (1) interactive site with lots of graphs and calculators, (2) Vision/philosophy page with text + video, (3) lead capture form with email notification to the owner, (4) styled like reference sites pdwealth.in / krjfinserv.com / wiseinvest.co.in / myfundguide.com.

## Business Profile
- **Brand**: Jain Associates — *Your Trusted Choice Since 1987*
- **Type**: Mutual Funds & Insurance Distributor
- **Founders**: Navin Kumar Jain (Senior Advisor), Rakesh Jain (Insurance & Lending), Sambhav Jain (CFA, USA — Research)
- **HQ**: 80, Janakpuri 1st, Imli Phatak, Jaipur 302015
- **Lead Email**: Jainasambhav@gmail.com

## Architecture
- **Frontend**: React 19 + Tailwind + shadcn/ui + Recharts + Sonner toasts
- **Backend**: FastAPI + Motor (Mongo) + Resend (email, lazy-init)
- **Routes**: `/`, `/about`, `/team`, `/calculators`, `/contact`
- **API**: `/api/health`, `/api/leads` (POST, GET)

## Design System
- Palette: Navy `#0A2540`, Blue `#0056b3`, Bright `#0066FF`, Bone `#F8F9FA`
- Typography: Playfair Display (headings) + Outfit (body)
- Style: Swiss & high-contrast minimal, generous spacing, premium financial vibe

## What's Implemented (May 8, 2026)
- Brand-aligned navbar (sticky, glassmorphism), footer, hero with modern office image + overlay
- Stats bar (100+ Cr, 1400+, Top 50, 45+/15+)
- Services overview (MF, Insurance, Bonds, LAS)
- Founder team page + home teaser
- Vision & Philosophy page (founder note + embedded video iframe + 4 principles)
- 6 Interactive calculators with live Recharts (SIP, Lumpsum, Goal, Retirement, EMI, Term Cover) — default 12% return, all sliders + numeric inputs interactive
- Contact page with lead form, advisor direct lines, office hours, addresses, embedded Google Map
- Backend: lead persistence in Mongo + graceful Resend integration (no-op if key missing)
- Toast notifications, scroll-to-top on route change, full data-testid coverage
- Tested end-to-end: backend 8/8 pytest, frontend Playwright e2e all critical flows passed

## Pending / P1 — Activate Email Delivery
- User must add **RESEND_API_KEY** in `/app/backend/.env` (sign up free at resend.com → API Keys)
- Optional: replace `SENDER_EMAIL` (currently `onboarding@resend.dev`) with a verified custom domain

## P2 / Nice-to-haves
- Replace placeholder YouTube video on Vision page with founder's actual recording
- Add `/admin` page (auth-gated) to view captured leads
- Replace stock founder portraits with real photos when available
- Add a blog / market commentary section
- WhatsApp click-to-chat floating button
- Tighten CORS to production frontend domain
- Simple rate limit on POST /api/leads (anti-spam)
- Custom domain + SSL deployment

## Test Credentials
N/A — no auth in this app yet.
