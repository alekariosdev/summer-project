"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ArticlePagination from "../ArticlePagination";

interface ArticlePaginationNavProps {
  currentPage: number;
  totalPages: number;
  paramKey?: string;
}

const ArticlePaginationNav = ({
  currentPage,
  totalPages,
  paramKey = "page",
}: ArticlePaginationNavProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete(paramKey);
    } else {
      params.set(paramKey, String(page));
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <ArticlePagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default ArticlePaginationNav;
