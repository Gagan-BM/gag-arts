import type { Artwork } from "@/types/artwork";

const image = (id: string, params = "auto=format&fit=crop&w=1800&q=86") =>
  `https://images.unsplash.com/${id}?${params}`;

export const artworks: Artwork[] = [
  {
    id: "aw-001",
    slug: "mist-remembers-the-hills",
    title: "Mist Remembers the Hills",
    subtitle: "A quiet topography of Coorg rain, late coffee, and withheld light.",
    heroImage: image("photo-1500530855697-b586d89ba3ee"),
    heroAlt: "Misty green mountain valley at dawn",
    story:
      "Painted after a morning when the valley disappeared and returned in slow breaths. The surface holds that pause: a hill half-seen, a house implied, a memory choosing not to explain itself.",
    emotion:
      "Calm, nostalgic, and restrained. It is for rooms that need silence without becoming empty.",
    process:
      "Thin forest washes were built over charcoal ground, then scraped back with a palette knife until the underpainting felt like wet stone.",
    musicInspiration:
      "Ambient piano, distant field recordings, and the first two minutes before a monsoon begins.",
    materials: ["Acrylic", "Charcoal dust", "Cold wax", "Linen canvas"],
    dimensions: "36 x 48 in",
    timeSpent: "42 hours across 18 days",
    availability: "Available",
    price: 4200,
    collectorNotes:
      "Best placed where side light can catch the waxed ridges. The work shifts from green to smoke through the day.",
    moodTags: ["Calm", "Nostalgic", "Earthy", "Minimal"],
    roomColors: ["Warm ivory", "Mist grey", "Forest green"],
    aestheticTags: ["Japandi", "Rustic", "Contemporary"],
    dominantPalette: ["#123026", "#7d867c", "#d8d1bf", "#4d382a"],
    media: [
      {
        id: "aw-001-hero",
        kind: "hero",
        url: image("photo-1500530855697-b586d89ba3ee"),
        alt: "Misty green mountain valley at dawn",
      },
      {
        id: "aw-001-progress-1",
        kind: "progress",
        url: image("photo-1518005020951-eccb494ad742"),
        alt: "Textured abstract painting detail",
        caption: "First charcoal ground before the green arrived.",
      },
      {
        id: "aw-001-texture",
        kind: "texture",
        url: image("photo-1541961017774-22349e4a1262"),
        alt: "Close view of layered paint texture",
        caption: "A lifted ridge of wax and pigment.",
      },
      {
        id: "aw-001-video",
        kind: "timelapse",
        url: "https://player.vimeo.com/video/76979871",
        alt: "Painting timelapse placeholder",
      },
    ],
  },
  {
    id: "aw-002",
    slug: "coffee-before-rain",
    title: "Coffee Before Rain",
    subtitle: "A brown-black interior memory with the warmth left on.",
    heroImage: image("photo-1495474472287-4d71bcdd2085"),
    heroAlt: "Coffee being prepared in a warm dark cafe",
    story:
      "This piece began as the color of roasted coffee and became a room. It carries the tenderness of waiting: a cup untouched, a window darkening, somebody almost arriving.",
    emotion:
      "Warm, intimate, and quietly dramatic. It suits spaces built for evening conversation.",
    process:
      "Coffee-brown glazes were layered over matte black, then interrupted with ivory graphite marks that behave like rain on glass.",
    musicInspiration: "Low cello, soft vinyl crackle, and rain against tiled roofs.",
    materials: ["Oil", "Graphite", "Walnut ink", "Canvas"],
    dimensions: "30 x 40 in",
    timeSpent: "31 hours across 12 days",
    availability: "Commissioned",
    price: null,
    collectorNotes:
      "A commission in this emotional family can be made with palette and scale adjustments.",
    moodTags: ["Dark", "Nostalgic", "Earthy"],
    roomColors: ["Coffee brown", "Charcoal black", "Warm ivory"],
    aestheticTags: ["Rustic", "Contemporary", "Minimal"],
    dominantPalette: ["#0b0d0c", "#4b3427", "#b7aa95", "#efe6d4"],
    media: [
      {
        id: "aw-002-hero",
        kind: "hero",
        url: image("photo-1495474472287-4d71bcdd2085"),
        alt: "Coffee being prepared in a warm dark cafe",
      },
      {
        id: "aw-002-progress",
        kind: "progress",
        url: image("photo-1513364776144-60967b0f800f"),
        alt: "Artist brushes and paint on a studio table",
        caption: "Walnut ink tests beside the first oil pass.",
      },
      {
        id: "aw-002-texture",
        kind: "texture",
        url: image("photo-1515405295579-ba7b45403062"),
        alt: "Dark textured abstract wall",
      },
    ],
  },
  {
    id: "aw-003",
    slug: "where-the-silence-blooms",
    title: "Where the Silence Blooms",
    subtitle: "A pale field interrupted by a single emotional flare.",
    heroImage: image("photo-1519681393784-d120267933ba"),
    heroAlt: "Soft night sky over a quiet mountain ridge",
    story:
      "Made during a week of almost no speech. The painting keeps its distance at first, then offers a small rupture of warmth when the viewer slows down.",
    emotion:
      "Dreamy, spare, and protective. It brings softness to modern interiors without becoming decorative.",
    process:
      "The base was sanded between thin layers until it became almost mineral. The final mark was placed once and left untouched.",
    musicInspiration: "Sparse vocal loops and sustained harmonium notes.",
    materials: ["Acrylic", "Pastel", "Marble dust", "Raw canvas"],
    dimensions: "48 x 60 in",
    timeSpent: "57 hours across 24 days",
    availability: "Sold",
    price: 6800,
    collectorNotes:
      "A companion study is available for collectors interested in this quieter palette.",
    moodTags: ["Dreamy", "Minimal", "Calm"],
    roomColors: ["Mist grey", "Warm ivory", "Forest green"],
    aestheticTags: ["Japandi", "Minimal", "Contemporary"],
    dominantPalette: ["#e8e0cf", "#8d928c", "#213b34", "#b85f42"],
    media: [
      {
        id: "aw-003-hero",
        kind: "hero",
        url: image("photo-1519681393784-d120267933ba"),
        alt: "Soft night sky over a quiet mountain ridge",
      },
      {
        id: "aw-003-progress",
        kind: "progress",
        url: image("photo-1459908676235-d5f02a50184b"),
        alt: "Large quiet art studio with a canvas",
        caption: "The week the surface became pale enough to hold one mark.",
      },
    ],
  },
];

export function getArtworkBySlug(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug);
}

export const moods = Array.from(new Set(artworks.flatMap((artwork) => artwork.moodTags))).sort();
export const roomColors = Array.from(new Set(artworks.flatMap((artwork) => artwork.roomColors))).sort();
export const aesthetics = Array.from(new Set(artworks.flatMap((artwork) => artwork.aestheticTags))).sort();
