import { getArticlesByDocIds } from "@/lib/strapi/api/articles";
import ArticleCard from "./ArticleCard";
import { VERTICAL_ARTICLE_LIST_DATA } from "@/lib/types";


const VerticalArticleList = async (data: VERTICAL_ARTICLE_LIST_DATA) => {
  const articlesData = await getArticlesByDocIds(data.articles.selected_ids);

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
      {/* <ArticlePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      /> */}
    </section>
  );
}

export default VerticalArticleList;