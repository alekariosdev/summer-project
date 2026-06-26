import { MASONRY_LIST_DATA } from "@/lib/types";
import { getArticlesByDocIds } from "@/lib/strapi/api/articles";
import getImageHeight from "./helpers/getImageHeight";
import ArticleCard from "./ArticleCard";
import { getMASONRY_ARTICLE_LIST_THEME } from "@/lib/themes/masonry-article-list";


const MasonryArticleList = async (data: MASONRY_LIST_DATA) => {

  const articleDocIds = data.articles?.selected_ids ?? [];

  const articles = await getArticlesByDocIds(articleDocIds);

  const fixedHeightArticles = articles.map((article) => ({
    ...article,
    imageH: getImageHeight(article.id),
  }));

  const theme = getMASONRY_ARTICLE_LIST_THEME(data.theme);

  return (
    <section className="rounded-2xl" aria-labelledby="masonry-heading">
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
            <ArticleCard article={article} theme={theme} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MasonryArticleList;