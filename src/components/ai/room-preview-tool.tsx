"use client";

import { useMemo, useState } from "react";
import { Frame, Move, Scan, Upload, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const roomFallback =
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1800&q=86";

const frames = [
  { label: "Raw edge", className: "border-[6px] border-stone-900" },
  { label: "Warm oak", className: "border-[10px] border-[#8b5f3c]" },
  { label: "Ivory float", className: "border-[14px] border-[#e8dfcd]" },
  { label: "Black gallery", className: "border-[12px] border-black" },
];

export function RoomPreviewTool({
  defaultArtwork,
  compact = false,
}: {
  defaultArtwork?: string;
  compact?: boolean;
}) {
  const [roomImage, setRoomImage] = useState(roomFallback);
  const [artworkImage, setArtworkImage] = useState(
    defaultArtwork ??
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&q=86",
  );
  const [size, setSize] = useState(34);
  const [x, setX] = useState(50);
  const [y, setY] = useState(38);
  const [shadow, setShadow] = useState(32);
  const [frameIndex, setFrameIndex] = useState(1);

  const frame = frames[frameIndex];
  const artworkStyle = useMemo(
    () => ({
      width: `${size}%`,
      left: `${x}%`,
      top: `${y}%`,
      transform: "translate(-50%, -50%)",
      boxShadow: `0 ${Math.round(shadow / 2)}px ${shadow}px rgba(0,0,0,0.38)`,
    }),
    [size, x, y, shadow],
  );

  const readUpload = (file: File | undefined, setter: (url: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div className={cn("grid gap-8", compact ? "lg:grid-cols-[1fr_0.72fr]" : "lg:grid-cols-[1.1fr_0.9fr]")}>
      <div className="relative min-h-[430px] overflow-hidden rounded-sm border border-white/10 bg-forest/20">
        <img src={roomImage} alt="Uploaded room preview" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
        <img
          src={artworkImage}
          alt="Artwork overlay"
          className={cn("absolute aspect-[4/5] object-cover", frame.className)}
          style={artworkStyle}
        />
        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink/62 px-4 py-2 text-xs text-ivory backdrop-blur">
          <Move className="size-4" aria-hidden="true" />
          MVP overlay now, future AI wall perspective later
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-mist/45">Preview Controls</p>
          <h2 className="mt-3 font-serif text-4xl text-ivory">
            Place the painting until the room feels altered.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="cursor-pointer rounded-sm border border-white/10 p-4 text-sm text-mist/70 transition hover:border-ivory/35">
            <Upload className="mb-4 size-5 text-ivory" aria-hidden="true" />
            Upload room image
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => readUpload(event.target.files?.[0], setRoomImage)}
            />
          </label>
          <label className="cursor-pointer rounded-sm border border-white/10 p-4 text-sm text-mist/70 transition hover:border-ivory/35">
            <Scan className="mb-4 size-5 text-ivory" aria-hidden="true" />
            Upload artwork
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => readUpload(event.target.files?.[0], setArtworkImage)}
            />
          </label>
        </div>

        {[
          ["Width", size, setSize, 18, 58],
          ["Horizontal", x, setX, 18, 82],
          ["Vertical", y, setY, 18, 76],
          ["Shadow", shadow, setShadow, 0, 80],
        ].map(([label, value, setter, min, max]) => (
          <label key={String(label)} className="block text-sm text-mist/68">
            <span className="mb-2 flex justify-between">
              <span>{String(label)}</span>
              <span>{String(value)}</span>
            </span>
            <input
              type="range"
              min={Number(min)}
              max={Number(max)}
              value={Number(value)}
              onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))}
              className="w-full accent-ivory"
            />
          </label>
        ))}

        <div>
          <p className="mb-3 text-sm text-mist/68">Frame style</p>
          <div className="grid grid-cols-2 gap-2">
            {frames.map((item, index) => (
              <button
                key={item.label}
                onClick={() => setFrameIndex(index)}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-sm transition",
                  frameIndex === index
                    ? "border-ivory bg-ivory text-ink"
                    : "border-white/10 text-mist/65 hover:border-ivory/35",
                )}
              >
                <Frame className="size-4" aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <Button className="w-full">
          <Wand2 className="size-4" aria-hidden="true" />
          Save Preview
        </Button>
      </div>
    </div>
  );
}
