"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = "Announcement" | "Press";

interface Post {
  id: number;
  category: Category;
  image: string;
  alt: string;
  title: string;
  excerpt: string;
  href: string;
  imageH: number;
}


//
const H = { tall: 300, short: 200 } as const;

// ─── Data ─────────────────────────────────────────────────────────────────────
const POSTS: Post[] = [
  // ── Row 1 ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    category: "Announcement",
    image:
      "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=700&fit=crop&q=80",
    alt: "Industrial power plant with large cooling towers against a blue sky",
    title: "A leading global industrial and energy company",
    excerpt:
      "The expansion, heavily focused on scaling operations in high-growth networks throughout Italy, Spain..",
    href: "/posts/1",
    imageH: H.tall,   // col 0 → TALL
  },
  {
    id: 2,
    category: "Press",
    image:
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=700&fit=crop&q=80",
    alt: "Abstract motion blur of industrial turbine blades",
    title: "A leading global industrial and energy company",
    excerpt:
      "The expansion, heavily focused on scaling operations in high-growth networks throughout Italy, Spain..",
    href: "/posts/2",
    imageH: H.short,  // col 1 → short
  },
  {
    id: 3,
    category: "Announcement",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=700&fit=crop&q=80",
    alt: "Wind turbine viewed from below against a cloudy sky",
    title: "A leading global industrial and energy company",
    excerpt:
      "The expansion, heavily focused on scaling operations in high-growth networks throughout Italy, Spain..",
    href: "/posts/3",
    imageH: H.tall,   // col 2 → TALL
  },
  {
    id: 4,
    category: "Announcement",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=700&fit=crop&q=80",
    alt: "Wind turbines standing in an open field against a blue sky",
    title: "A leading global industrial and energy company",
    excerpt:
      "The expansion, heavily focused on scaling operations in high-growth networks throughout Italy, Spain..",
    href: "/posts/4",
    imageH: H.short,  // col 3 → short
  },

  // ── Row 2 — inverted ───────────────────────────────────────────────────────
  {
    id: 5,
    category: "Press",
    image:
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=700&fit=crop&q=80",
    alt: "Abstract close-up motion blur of industrial machinery",
    title: "A leading global industrial and energy company",
    excerpt:
      "The expansion, heavily focused on scaling operations in high-growth networks throughout Italy, Spain..",
    href: "/posts/5",
    imageH: H.short,  // col 0 → short  (inverted)
  },
  {
    id: 6,
    category: "Announcement",
    image:
      "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=700&fit=crop&q=80",
    alt: "Large industrial power generation facility with smokestacks",
    title: "A leading global industrial and energy company",
    excerpt:
      "The expansion, heavily focused on scaling operations in high-growth networks throughout Italy, Spain..",
    href: "/posts/6",
    imageH: H.tall,   // col 1 → TALL  (inverted)
  },
  {
    id: 7,
    category: "Announcement",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=700&fit=crop&q=80",
    alt: "Single wind turbine against a vivid blue sky with white clouds",
    title: "A leading global industrial and energy company",
    excerpt:
      "The expansion, heavily focused on scaling operations in high-growth networks throughout Italy, Spain..",
    href: "/posts/7",
    imageH: H.short,  // col 2 → short (inverted)
  },
  {
    id: 8,
    category: "Announcement",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=700&fit=crop&q=80",
    alt: "Close-up view of a wind turbine hub and three blades",
    title: "A leading global industrial and energy company",
    excerpt:
      "The expansion, heavily focused on scaling operations in high-growth networks throughout Italy, Spain..",
    href: "/posts/8",
    imageH: H.tall,   // col 3 → TALL  (inverted)
  },
];

const ArrowNEIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

const CategoryBadge = ({ category }: { category: Category }) => {
  return (
    <span
      className="
        inline-flex items-center rounded-full
        bg-cyan-400 px-3 py-[5px]
        text-[11px] font-semibold tracking-wide text-white shadow-sm
      "
      role="note"
      aria-label={`Category: ${category}`}
    >
      {category}
    </span>
  );
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group overflow-hidden rounded-2xl bg-white shadow-sm
                 transition-shadow duration-300 ease-out hover:shadow-xl"
    >
      <a
        href={post.href}
        aria-label={`${post.category}: ${post.title}`}
        className="block rounded-2xl
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-violet-500 focus-visible:ring-offset-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {/* ── Image — height driven by imageH ── */}
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ height: post.imageH }}
        >
          <img
            src={post.image}
            alt={post.alt}
            loading="lazy"
            decoding="async"
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              "transition-transform duration-500 ease-out motion-reduce:transition-none",
              hovered ? "scale-110" : "scale-100"
            )}
          />

          {/* Scrim */}
          <div
            className="pointer-events-none absolute inset-0
                       bg-gradient-to-t from-black/25 via-transparent to-transparent"
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute left-3 top-3 z-10">
            <CategoryBadge category={post.category} />
          </div>

          <div
            className={cn(
              "absolute inset-0 z-10 flex items-center justify-center",
              "bg-black/10 transition-opacity duration-300 motion-reduce:transition-none",
              hovered ? "opacity-100" : "opacity-0"
            )}
            aria-hidden="true"
          >
            <span
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full",
                "bg-white shadow-lg",
                "transition-transform duration-200 motion-reduce:transition-none",
                hovered ? "scale-100" : "scale-75"
              )}
            >
              <ArrowNEIcon className="text-gray-800" />
            </span>
          </div>
        </div>

        {/* ── Text ── */}
        <div className="p-4">
          <h2 className="mb-1.5 text-[15px] font-bold leading-snug text-gray-900">
            {post.title}
          </h2>
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-400">
            {post.excerpt}
          </p>
        </div>
      </a>
    </article>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
const MasonryPostList = () => {
  return (
    <div className="min-h-screen p-3 sm:p-5 lg:p-8">
      <section className="rounded-2xl p-3 sm:p-5" aria-labelledby="masonry-heading">
        <ul
          className="
            grid grid-cols-1 gap-x-4 gap-y-4
            sm:grid-cols-2
            lg:grid-cols-4 lg:items-start
          "
          role="list"
          aria-label="Latest posts"
        >
          {POSTS.map((post) => (
            <li key={post.id} className="list-none">
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default MasonryPostList;