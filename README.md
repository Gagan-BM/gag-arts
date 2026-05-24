<<<<<<< HEAD
# gag-arts
G△g Arts | Digital gallery for emotionally experiencing paintings, process, texture, and collector storytelling.
=======
# G△g Arts

Premium full-stack digital gallery and storytelling platform for emotionally experiencing paintings.

Parent brand: `G△g`
Brand tagline: `Rooted Beyond`
Application line: `Paintings, Rooted Beyond.`
Artist sign: `G△gನ್`

## Stack

- Next.js App Router, TypeScript, Tailwind CSS 4
- Framer Motion for cinematic transitions
- Supabase for artworks, media, inquiries, generated AI content, and room previews
- Cloudinary-ready media configuration
- OpenAI Responses API content engine

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment

Set these in `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1
ARTIST_INQUIRY_EMAIL=artist@example.com
```

The app runs without Supabase or OpenAI keys. API routes use local fallbacks where possible, then persist to Supabase once keys are configured.

## Database

Run `supabase/schema.sql` in Supabase SQL editor. It creates:

- `artworks`
- `artwork_media`
- `artwork_moods`
- `ai_content`
- `inquiries`
- `room_previews`

## Feature Map

- Landing page: cinematic brand intro, featured works, mood discovery
- Gallery: editorial artwork exploration
- Artwork detail: hero, story tabs, fullscreen texture zoom, QR sharing, inquiry
- AI Content Studio: captions, hooks, titles, hashtags, Etsy tags, snippets
- AI Room Preview: draggable-style overlay controls via sliders, frame styles, shadows
- Dashboard: upload/manage/generate/view-inquiries architecture surface
- APIs: `/api/ai/content`, `/api/recommendations`, `/api/inquiries`, `/api/room-previews`

## Deployment

1. Create a Supabase project and run `supabase/schema.sql`.
2. Create Cloudinary credentials for future upload flows.
3. Add env vars to Vercel or your host.
4. Deploy with `npm run build`.

Note: the current local Node is `20.12.2`; the latest scaffold installed successfully, but one ESLint dependency asks for Node `20.19+`. Use Node `20.19+` or `22.13+` in production.
>>>>>>> 3bb35dc (Initial Gag Arts digital gallery)
