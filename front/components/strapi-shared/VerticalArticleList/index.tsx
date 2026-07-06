import { DEFAULT_ARTICLE_PAGE_SIZE } from "@/lib/strapi/api/articles";
import ArticleCard from "./ArticleCard";
import ArticlePaginationNav from "./ArticlePaginationNav";
import { VERTICAL_ARTICLE_LIST_DATA } from "@/lib/types";

interface VerticalArticleListProps extends VERTICAL_ARTICLE_LIST_DATA {
  page?: number;
}

const VerticalArticleList = ({
  page = 1,
  ...data
}: VerticalArticleListProps) => {
  const allArticles = data.articles?.articles ?? [];
  const pageSize = DEFAULT_ARTICLE_PAGE_SIZE;
  const total = allArticles.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), pageCount);
  const start = (currentPage - 1) * pageSize;
  const articlesData = allArticles.slice(start, start + pageSize);

  if (!articlesData.length) return null;

  return (
    <section
      className="overflow-hidden rounded-2xl"
      data-company={data.theme}
    >
      {articlesData.map((article, index) => (
        <div key={article.id}>
          <div className="border-t border-gray-200" aria-hidden />
          <div className="section-container">
            <ArticleCard data={article} />
          </div>
          {index === articlesData.length - 1 && (
            <div className="border-t border-gray-200" aria-hidden />
          )}
        </div>
      ))}
      <ArticlePaginationNav
        currentPage={currentPage}
        totalPages={pageCount}
      />
    </section>
  );
};

export default VerticalArticleList;
