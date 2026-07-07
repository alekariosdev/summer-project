"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { VIDEO_DATA } from "@/lib/types";

import {
  extractYouTubeId,
  getYouTubeThumbnail,
  getYouTubeEmbedUrl,
} from "./utils";
import { getStrapiMediaUrl, getStrapiVideoUrl } from "@/lib/strapi/normalize";


const Video = ({
  title,
  source,
  url,
  thumbnail,
  duration,
  uploadedVideo,
  theme,
}: VIDEO_DATA) => {


  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);


  const youtubeId = useMemo(() => {
    if (source === "youtube") return extractYouTubeId(url);
    return null;
  }, [source, url]);

  const thumbnailUrl = useMemo(() => {
    if (thumbnail) return getStrapiMediaUrl(thumbnail);
    if (youtubeId) return getYouTubeThumbnail(youtubeId);
    return null;
  }, [thumbnail, youtubeId]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);


  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-neutral-900 select-none aspect-video",
      )}
      data-company={theme}
    >
      {!isPlaying && (
        <>
          {thumbnailUrl && !thumbnailError && (
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover"
              onError={() => setThumbnailError(true)}
            />
          )}
          <div className="absolute inset-0 bg-brand-video" />
          <button
            onClick={handlePlay}
            aria-label={`Play: ${title}`}
            className="absolute inset-0 flex items-center justify-center group focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
          >
            <span
              className={cn(
                "flex h-[68px] w-[68px] items-center justify-center rounded-full",
                "bg-white/95 shadow-[0_8px_32px_rgba(0,0,0,0.45)]",
                "transition-all duration-200 ease-out",
                "group-hover:scale-110 group-hover:bg-white group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.55)]",
                "group-active:scale-95"
              )}
            >
              <Play className="h-7 w-7 translate-x-[2px] fill-neutral-900 text-neutral-900" />
            </span>
          </button>
          {duration && (
            <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
              {duration}
            </span>
          )}
        </>
      )}
      {isPlaying && (
        <>
          {source === "youtube" && youtubeId && (
            <iframe
              src={getYouTubeEmbedUrl(youtubeId)}
              title={title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
          {source === "strapi" && (
            <video
              ref={videoRef}
              src={getStrapiVideoUrl(uploadedVideo)}
              className="absolute inset-0 h-full w-full object-cover"
              controls
              autoPlay
              playsInline
            />
          )}
        </>
      )}
    </div>
  );
};

export default Video;