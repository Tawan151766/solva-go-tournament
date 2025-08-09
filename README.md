
# Solva Go Tournament Management

A modern web application for managing e-sports tournaments, built with Next.js, Prisma, and a custom Valorant-inspired UI.

## Features
- Tournament creation and management
- Team registration and approval workflows
- Event and match management
- Dashboard with analytics and stats
- Mobile-friendly dashboard and tournament views
- PWA support for offline access

## Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Next.js API routes, Prisma ORM
- **Database:** (Configured via Prisma)
- **UI Theme:** Custom Valorant theme

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL (or your preferred database, update `prisma/schema.prisma` accordingly)

### Installation
1. Clone the repository:
	```sh
	git clone https://github.com/Tawan151766/solva-go-tournament.git
	cd solva-go-tourmenagement/my-app
	```
2. Install dependencies:
	```sh
	npm install
	# or
	yarn install
	```
3. Set up the database:
	- Update your database connection string in `prisma/schema.prisma`.
	- Run Prisma migrations:
	  ```sh
	  npx prisma migrate dev --name init
	  ```
	- (Optional) Seed the database:
	  ```sh
	  npx ts-node prisma/seed.ts
	  ```
4. Start the development server:
	```sh
	npm run dev
	# or
	yarn dev
	```

## Project Structure
- `src/app/` — Next.js app directory (pages, API routes)
- `src/components/` — React components (Dashboard, Event, Mobile, etc.)
- `src/lib/` — Database and utility libraries
- `src/types/` — TypeScript types
- `prisma/` — Prisma schema and seed scripts
- `public/` — Static assets

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npx prisma studio` — Open Prisma Studio (DB GUI)

## License
MIT

---

> Developed by Tawan151766 and contributors.
