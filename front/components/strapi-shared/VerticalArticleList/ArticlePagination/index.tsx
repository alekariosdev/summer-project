"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PageItem } from "../types";

interface ArticlePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function buildPageItems(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, "ellipsis", total];
  }

  if (current >= total - 3) {
    return [1, "ellipsis", total - 3, total - 2, total - 1, total];
  }

  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

const ArticlePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ArticlePaginationProps) => {
  const items = buildPageItems(currentPage, totalPages);

  const navBtnBase =
    "flex h-9 w-9 items-center justify-center rounded-full text-gray-500 \
     transition-colors hover:bg-violet-50 hover:text-violet-600 \
     disabled:pointer-events-none disabled:opacity-30";

  return (
    <nav aria-label="Events pagination" className="flex items-center justify-center gap-1 py-6">
      <Button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={navBtnBase}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="flex h-9 w-9 select-none items-center justify-center
                       text-sm text-gray-400"
          >
            ..
          </span>
        ) : (
          <Button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-label={`Page ${item}`}
            aria-current={currentPage === item ? "page" : undefined}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors",
              currentPage === item
                ? "bg-violet-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-violet-50 hover:text-violet-600"
            )}
          >
            {item}
          </Button>
        )
      )}

      <Button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={navBtnBase}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </nav>
  );
}

export default ArticlePagination;