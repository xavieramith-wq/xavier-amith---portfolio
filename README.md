# Xavier Amith — Portfolio

A personal portfolio website built with React, Vite and Tailwind CSS, including a small Express backend for handling contact form submissions and email delivery.

**Live demo**: (add link here if deployed)

## Features

- **Interactive UI**: Animated components and smooth transitions.
- **Content driven**: Portfolio content pulled from local data and Sanity (optional).
- **Contact form**: Backend API to store/send messages.
- **Responsive**: Mobile-first design with Tailwind CSS.

## Tech Stack

- **Frontend**: Vite, React, Tailwind CSS
- **Backend**: Node.js, Express, Mongoose (MongoDB)
- **CMS**: Sanity (optional, configured in `lib/sanityClient.js`)

## Architecture & Implementation

### Frontend
1. **Project Entry & Setup**: The browser loads `index.html` which pulls in the Vite-bundled JS/CSS. React mounts from `src/main.jsx`.
2. **App Layout & Routing**: `App.jsx` wires together global styles and page sections. `AnimatedPortfolioApp.jsx` handles orchestration.
3. **UI Components**: Reusable primitives in `src/ui/*` and page sections in `src/sections/*`.

### Content & Data
- Content is fetched via `useLivePortfolioContent.js` hook, falling back to `src/data/portfolio.js` if Sanity is not configured.

### Backend
- An Express server in `backend/` handles contact form submissions, validating and persisting them to MongoDB via Mongoose and sending emails via Nodemailer.

## Getting Started

### Prerequisites
- Node.js 18+ installed
- (Optional) MongoDB instance for the backend

### Installation
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install
```

### Running Locally
```bash
# Run frontend (Vite dev server)
npm run dev

# Run backend (API server)
cd backend && npm start
```

## Project Structure
- `index.html`: Entry HTML
- `src/main.jsx`: React entry
- `src/App.jsx`: Main layout
- `src/sections/`: UI Sections (About, Projects, etc.)
- `backend/server.js`: Express API entry

## License
This project is open source.
