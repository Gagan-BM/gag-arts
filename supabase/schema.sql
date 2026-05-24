create extension if not exists "pgcrypto";

create type artwork_availability as enum ('Available', 'Sold', 'Commissioned');
create type artwork_media_kind as enum ('hero', 'progress', 'timelapse', 'texture');
create type inquiry_intent as enum ('Inquire', 'Reserve', 'Commission Similar');

create table public.artworks (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  hero_image_url text not null,
  story text not null,
  emotion text,
  process text,
  music_inspiration text,
  materials text[] default '{}',
  dimensions text,
  time_spent text,
  availability artwork_availability not null default 'Available',
  price numeric(12, 2),
  collector_notes text,
  dominant_palette text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.artwork_media (
  id uuid primary key default gen_random_uuid(),
  artwork_id uuid not null references public.artworks(id) on delete cascade,
  kind artwork_media_kind not null,
  url text not null,
  alt text not null,
  caption text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.artwork_moods (
  id uuid primary key default gen_random_uuid(),
  artwork_id uuid not null references public.artworks(id) on delete cascade,
  mood text not null,
  room_color text,
  aesthetic text,
  unique (artwork_id, mood, room_color, aesthetic)
);

create table public.ai_content (
  id uuid primary key default gen_random_uuid(),
  artwork_id uuid references public.artworks(id) on delete set null,
  input_story text not null,
  input_moods text[] not null default '{}',
  image_url text,
  output jsonb not null,
  provider text not null default 'openai',
  created_at timestamptz not null default now()
);

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  artwork_id text,
  artwork_title text,
  intent inquiry_intent not null,
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table public.room_previews (
  id uuid primary key default gen_random_uuid(),
  artwork_id uuid references public.artworks(id) on delete set null,
  room_image_url text,
  artwork_image_url text,
  frame_style text,
  placement jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index artwork_media_artwork_id_idx on public.artwork_media(artwork_id);
create index artwork_moods_artwork_id_idx on public.artwork_moods(artwork_id);
create index inquiries_created_at_idx on public.inquiries(created_at desc);
create index ai_content_created_at_idx on public.ai_content(created_at desc);
