'use client';
import { Button } from '@/components/ui/button';

import { ArrowUpRight } from 'lucide-react';

const WaveIcon = () => (
  <svg
    width="72"
    height="64"
    viewBox="0 0 72 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-80"
  >
    {/* Outer rings */}
    <ellipse
      cx="36"
      cy="32"
      rx="34"
      ry="30"
      stroke="#7C6BC4"
      strokeWidth="0.6"
      fill="none"
      transform="rotate(-20 36 32)"
    />
    <ellipse
      cx="36"
      cy="32"
      rx="28"
      ry="24"
      stroke="#7C6BC4"
      strokeWidth="0.6"
      fill="none"
      transform="rotate(-20 36 32)"
    />
    <ellipse
      cx="36"
      cy="32"
      rx="22"
      ry="18"
      stroke="#8B7AD4"
      strokeWidth="0.6"
      fill="none"
      transform="rotate(-20 36 32)"
    />
    <ellipse
      cx="36"
      cy="32"
      rx="16"
      ry="13"
      stroke="#9B8AE4"
      strokeWidth="0.6"
      fill="none"
      transform="rotate(-20 36 32)"
    />
    <ellipse
      cx="36"
      cy="32"
      rx="10"
      ry="8"
      stroke="#AB9AF4"
      strokeWidth="0.6"
      fill="none"
      transform="rotate(-20 36 32)"
    />
    <ellipse
      cx="36"
      cy="32"
      rx="5"
      ry="4"
      stroke="#BB9AF4"
      strokeWidth="0.7"
      fill="none"
      transform="rotate(-20 36 32)"
    />
    {/* Cross lines */}
    <line x1="4" y1="32" x2="68" y2="32" stroke="#7C6BC4" strokeWidth="0.5" />
    <line x1="36" y1="2" x2="36" y2="62" stroke="#7C6BC4" strokeWidth="0.5" />
    <line x1="10" y1="10" x2="62" y2="54" stroke="#7C6BC4" strokeWidth="0.4" />
    <line x1="62" y1="10" x2="10" y2="54" stroke="#7C6BC4" strokeWidth="0.4" />
  </svg>
);

export const SectionHeader = () => {
  return (
    <div className="w-full flex items-center justify-between px-8 py-6 bg-white">
      <div className="flex items-center gap-5">
        <div className="shrink-0">
          <WaveIcon />
        </div>
        <div className="w-px h-16 bg-gray-200 shrink-0" />
        <div>
          <h2 className="font-normal text-metlen-text">Our News</h2>
          <h2 className="font-normal text-metlen-text">Across the World</h2>
        </div>
      </div>
      <Button
        variant="outline"
        className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-metlen-accent
             text-metlen-accent text-sm font-medium bg-white
             hover:bg-metlen-accent! hover:text-white!
             transition-all duration-300 shrink-0 cursor-pointer"
      >
        <ArrowUpRight />
        <span>View all</span>
      </Button>
    </div>
  );
};
