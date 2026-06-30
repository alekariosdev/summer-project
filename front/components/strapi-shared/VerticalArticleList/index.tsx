import ArticleCard from "./ArticleCard";
import { MOCK_EVENTS } from "./mockData";


const VerticalArticleList = () => {
  return (
    <section
      className="overflow-hidden rounded-2xl"
    >
      {MOCK_EVENTS.map((article, index) => (
        <div key={article.id}>
          <div className="border-t border-gray-200" aria-hidden />
          <div className="section-container">
            <ArticleCard event={article} />
          </div>
          {index === MOCK_EVENTS.length - 1 && (
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