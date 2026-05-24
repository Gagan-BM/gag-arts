export type Availability = "Available" | "Sold" | "Commissioned";

export type ArtworkMediaKind = "hero" | "progress" | "timelapse" | "texture";

export type ArtworkMedia = {
  id: string;
  kind: ArtworkMediaKind;
  url: string;
  alt: string;
  caption?: string;
};

export type Artwork = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  heroAlt: string;
  story: string;
  emotion: string;
  process: string;
  musicInspiration: string;
  materials: string[];
  dimensions: string;
  timeSpent: string;
  availability: Availability;
  price: number | null;
  collectorNotes: string;
  moodTags: string[];
  roomColors: string[];
  aestheticTags: string[];
  media: ArtworkMedia[];
  dominantPalette: string[];
};

export type InquiryIntent = "Inquire" | "Reserve" | "Commission Similar";

export type InquiryPayload = {
  artworkId?: string;
  artworkTitle?: string;
  intent: InquiryIntent;
  name: string;
  email: string;
  message: string;
};

export type AiContentResult = {
  instagramCaptions: string[];
  poeticCaptions: string[];
  luxuryCaptions: string[];
  hashtags: string[];
  reelHooks: string[];
  artworkTitles: string[];
  etsySeoTags: string[];
  storySnippets: string[];
};
