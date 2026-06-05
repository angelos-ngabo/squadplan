# SquadPlan

Link-based group event manager for birthdays, trips, squad dinners, and more. Organizers sign in to create private events; guests join through a shared link with no account required.

Built with React, Vite, TypeScript, Tailwind CSS, and Firebase (Auth + Firestore).

## Features

- Public marketing site with auth for organizers
- Create events with budget targets and payment methods (MOMO, Airtel Money, Cash, Bank Transfer)
- Private guest join links — RSVP, pledge, and pick a payment method
- Organizer-only event dashboard with funding progress, participants, and activity log
- Real-time updates via Firestore listeners
- WhatsApp share and copy-link for guest invites

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication → Email/Password**.
3. Enable **Cloud Firestore**.
4. Register a web app and copy your config values.
5. Copy `.env.example` to `.env` and fill in your keys.

For production builds, Vite reads `.env` (or `.env.production`) **at build time**. If you deploy without those values, the hosted app cannot reach Firebase.

Alternatively, copy `public/firebase-config.example.json` to `public/firebase-config.json`, fill in your keys, then build — that file is copied into `dist/` and loaded at runtime.

### 3. Deploy Firestore rules

```bash
npx firebase-tools deploy --only firestore:rules --project YOUR_PROJECT_ID
```

Rules in `firestore.rules` restrict participant/activity reads to the event organizer while allowing guests to join.

### 4. Run locally

```bash
npm run dev
```

## Deploy to Firebase Hosting

```bash
# Ensure .env exists OR public/firebase-config.json is filled in first
npm run build
npx firebase-tools deploy --only hosting,firestore:rules --project YOUR_PROJECT_ID
```

Hosting serves the Vite build from `dist` with SPA rewrites configured in `firebase.json`.

## Routes

| Path | Description |
|------|-------------|
| `/` | Marketing home |
| `/auth` | Login / register |
| `/app` | Organizer hub (protected) |
| `/event/:slug` | Guest join page |
| `/event/:slug/dashboard` | Organizer event dashboard (protected) |

## Firestore structure

### `events/{eventId}`

Document ID = event slug.

| Field | Type |
|-------|------|
| title | string |
| description | string |
| date | string |
| location | string |
| budgetTarget | number |
| contributionPerPerson | number |
| paymentMethods | string[] |
| organizerName | string |
| organizerPhone | string (optional) |
| organizerId | string |
| createdAt | timestamp |

### `events/{eventId}/participants/{participantId}`

| Field | Type |
|-------|------|
| name | string |
| phone | string (optional) |
| attendance | `attending` \| `maybe` \| `not_attending` |
| pledgeAmount | number |
| paidAmount | number |
| paymentStatus | `unpaid` \| `partial` \| `paid` |
| paymentMethod | string |
| joinedAt | timestamp |

### `events/{eventId}/activityLog/{logId}`

| Field | Type |
|-------|------|
| message | string |
| createdAt | timestamp |

## Tech stack

- React 18 + Vite + TypeScript
- Tailwind CSS + tailwind-variants
- Firebase Auth + Firestore
- React Router v6 + TanStack Query
- React Hook Form + Zod

## License

Copyright © 2026 SquadPlan. Licensed under the [MIT License](LICENSE).
