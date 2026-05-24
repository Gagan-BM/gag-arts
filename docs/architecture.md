# G△g Arts Architecture

## 1. Architecture

G△g Arts is organized as a Next.js App Router product with server-rendered editorial pages, client islands for motion and interaction, and modular API routes for AI, inquiry, recommendation, and room-preview workflows.

Brand system:

- Parent brand: `G△g`
- Tagline: `Rooted Beyond`
- App line: `Paintings, Rooted Beyond.`
- Artist sign: `G△gನ್`

## 2. Folder Structure

```txt
src/
  app/
    api/
    artwork/[slug]/
    gallery/
    room-preview/
    content-studio/
    about/
    contact/
    dashboard/
  components/
    ai/
    artwork/
    dashboard/
    providers/
    site/
    ui/
  lib/
    ai/
    cloudinary/
    data/
    recommendations/
    supabase/
  types/
supabase/
  schema.sql
```

## 3. Database Schema

The schema models artworks, media, moods, AI generations, inquiries, and room preview saves. Relationships are intentionally simple: artworks own media and moods; AI generations and room previews can optionally reference artworks; inquiries store email-ready collector intent.

## 4. UI System

The visual system uses forest green, charcoal black, mist grey, coffee brown, and warm ivory. Typography pairs Geist for interface text with Cormorant Garamond for editorial headings. Components avoid ecommerce grid language in favor of strips, immersive sections, tabs, and cinematic image fields.

## 5. Pages

Landing, Gallery, Artwork Detail, AI Room Preview, AI Content Studio, About Artist, Contact, and Artist Dashboard are implemented as App Router pages.

## 6. Components

Reusable components include nav/footer shells, reveal animation, artwork strips, artwork tabs, fullscreen texture viewing, room preview controls, content studio, mood discovery, inquiry forms, and dashboard overview.

## 7. APIs

- `POST /api/ai/content`: OpenAI Responses API with structured JSON and retry handling.
- `POST /api/recommendations`: mood/color/aesthetic matching.
- `POST /api/inquiries`: Supabase persistence and email-ready response payload.
- `POST /api/room-previews`: saves preview metadata for future AI correction.

## 8. Animations

Framer Motion powers progressive reveals and tab transitions. CSS handles smooth scroll, texture grain, image scale, and gallery hover states.

## 9. Deployment

Run the SQL schema in Supabase, add env vars, connect the repository to Vercel, and build with Node `20.19+` or newer.
