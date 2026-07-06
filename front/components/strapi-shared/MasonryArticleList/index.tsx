import { MASONRY_LIST_DATA } from "@/lib/types";
import getImageHeight from "./helpers/getImageHeight";
import ArticleCard from "./ArticleCard";


const MasonryArticleList = ({
  articles,
  theme,
}: MASONRY_LIST_DATA) => {
  const resolvedArticles = articles?.articles ?? [];

  if (!resolvedArticles.length) return null;

  const fixedHeightArticles = resolvedArticles.map((article, id) => ({
    ...article,
    imageH: getImageHeight(id),
  }));

  return (
    <section className="rounded-2xl" aria-labelledby="masonry-heading" data-company={theme}>
      <ul
        className="
            grid grid-cols-1 gap-x-4 gap-y-4
            sm:grid-cols-2
            lg:grid-cols-4 lg:items-start
          "
        role="list"
        aria-label="Latest posts"
      >
        {fixedHeightArticles.map((article) => (
          <li key={article.id} className="list-none">
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MasonryArticleList;
