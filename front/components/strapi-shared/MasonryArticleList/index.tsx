import { MasonryListData } from "@/lib/types";
import { getArticlesByDocIds } from "@/lib/strapi/api/articles";
import getImageHeight from "./helpers/getImageHeight";
import ArticleCard from "./ArticleCard";


const MasonryPostList = async (data: MasonryListData) => {

  const articleDocIds = data.articles?.selected_ids ?? [];

  const articles = await getArticlesByDocIds(articleDocIds);

  const fixedHeightArticles = articles.map((article) => ({
    ...article,
    imageH: getImageHeight(article.id),
  }));

  return (
    <div className="min-h-screen sm:p-5 lg:p-8">
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
          {fixedHeightArticles.map((article) => (
            <li key={article.id} className="list-none">
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default MasonryPostList;