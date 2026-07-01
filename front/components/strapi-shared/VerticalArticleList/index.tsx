import {
  DEFAULT_ARTICLE_PAGE_SIZE,
  getArticlesByDocIds,
} from "@/lib/strapi/api/articles";
import ArticleCard from "./ArticleCard";
import ArticlePaginationNav from "./ArticlePaginationNav";
import { VERTICAL_ARTICLE_LIST_DATA } from "@/lib/types";

interface VerticalArticleListProps extends VERTICAL_ARTICLE_LIST_DATA {
  page?: number;
}

const VerticalArticleList = async ({
  page = 1,
  ...data
}: VerticalArticleListProps) => {
  const { data: articlesData, meta } = await getArticlesByDocIds(
    data.articles.selected_ids,
    { page, pageSize: DEFAULT_ARTICLE_PAGE_SIZE }
  );

  const pagination = meta.pagination;
  const currentPage = pagination?.page ?? 1;
  const totalPages = pagination?.pageCount ?? 1;

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
        totalPages={totalPages}
      />
    </section>
  );
};

export default VerticalArticleList;
