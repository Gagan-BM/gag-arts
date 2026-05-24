import { artworks } from "@/lib/data/artworks";

type DiscoveryInput = {
  moods?: string[];
  roomColors?: string[];
  aesthetics?: string[];
  emotion?: string;
};

export function recommendArtworks(input: DiscoveryInput) {
  const requested = [
    ...(input.moods ?? []),
    ...(input.roomColors ?? []),
    ...(input.aesthetics ?? []),
    input.emotion ?? "",
  ]
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (!requested.length) {
    return artworks.map((artwork, index) => ({
      artwork,
      score: artworks.length - index,
      reason: "Editorial pick for an atmospheric first visit.",
    }));
  }

  return artworks
    .map((artwork) => {
      const haystack = [
        ...artwork.moodTags,
        ...artwork.roomColors,
        ...artwork.aestheticTags,
        artwork.emotion,
        artwork.story,
      ]
        .join(" ")
        .toLowerCase();

      const score = requested.reduce(
        (total, token) => total + (haystack.includes(token) ? 2 : 0),
        0,
      );

      const reason =
        score > 0
          ? `Matches ${requested.filter((token) => haystack.includes(token)).slice(0, 3).join(", ")}.`
          : "A tonal contrast that may sharpen the room's emotional atmosphere.";

      return { artwork, score, reason };
    })
    .sort((a, b) => b.score - a.score);
}
