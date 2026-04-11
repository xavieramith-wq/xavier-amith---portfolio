Frontend
1. Project entry & setup

The browser loads index.html which pulls in the Vite-bundled JS/CSS. React mounts from src/main.jsx and the app shell comes alive.
index.html
Minimal HTML shell — just a
and the script tag. Vite injects the bundle here.
src/main.jsx
React entry point — calls ReactDOM.createRoot() and renders into the root div.
vite.config.js
Configures the dev server (HMR, port) and production build (asset hashing, base path).

2. App layout & routing

App.jsx wires together global styles, the header/footer shell, and all page sections in one top-level tree.
src/App.jsx
Top-level layout — imports global CSS, SiteHeader, SiteFooter, and all section components.
AnimatedPortfolioApp.jsx
Wraps sections with animation timing and orchestration logic (GSAP/AOS coordination).
src/index.css + animated.css
Tailwind layers + custom keyframe animations used across the whole UI.

3. UI components & sections

Small, reusable UI primitives (buttons, fields, tiles) are composed into full page sections like About, Projects, and Contact.
src/ui/*
Generic building blocks — ActionButton, FloatingField, IconTile. No page-specific logic here.
src/sections/*
Page sections (Home, About, Projects, Contact) — each focused on one concern, composing ui/ primitives.
src/components/layout/*
SiteHeader, SiteFooter, and SVG icon components for consistent, accessible navigation.

Content
4. Content & data layer

Content is fetched from Sanity CMS if configured, or falls back to local data files. A custom hook abstracts this entirely.
useLivePortfolioContent.js
Custom hook — fetches content from CMS or local fallback, optionally subscribing to real-time updates.
src/data/portfolio.js
Local content (projects, skills, bio) — the fallback used when CMS is not configured.
src/lib/sanityClient.js
Wraps the Sanity API config. Swap in your project ID/dataset to enable live CMS content.

Backend
5. Express API server

An Express server in backend/ handles contact form submissions — validating, storing, and emailing them.
backend/server.js
Express entry — defines the /contact route, applies CORS, and wires up middleware.
backend/models/Contact.js
Mongoose schema for contact messages. Validates fields and persists to MongoDB.
Nodemailer
Sends email notifications on new contact submissions. Credentials live in environment variables.

Deploy
6. Build & deployment

The frontend builds to static assets for any CDN. The backend deploys as a Node service with env vars for secrets.
npm run build → dist/
Vite produces hashed HTML/CSS/JS. Deploy the dist/ folder to Netlify, Vercel, or S3.
Backend hosting
Run the Express server on Heroku, Render, or Railway. Set MONGO_URI, EMAIL_USER, EMAIL_PASS.
CI/CD
Automate: run build → deploy dist/ on push. Use PM2 or platform process manager for the API.

Security & Quality
7. Security & best practices

Lock down the contact endpoint, validate all input, and ensure accessible, performant output in production.
CORS + rate limiting
Restrict allowed origins on the API. Add rate limiting or CAPTCHA to prevent contact form abuse.
Input validation
Use express-validator on the contact route. Never trust raw user data from the request body.
Accessibility & performance
Semantic HTML, keyboard focus, ARIA where needed, prefers-reduced-motion, and Tailwind purge for small CSS.
