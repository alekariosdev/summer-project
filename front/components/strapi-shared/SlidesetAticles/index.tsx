import { getArticlesByDocIds } from "@/lib/strapi/api/articles";
import SlidesetArticleLists from "./SlidesetArticleLists";
import type { SLIDESET_LIST_DATA } from "@/lib/types";

const SlidesetAticles = async (data: SLIDESET_LIST_DATA) => {
  const [slidesResponse, cardsResponse] = await Promise.all([
    getArticlesByDocIds(data.slides?.selected_ids ?? []),
    getArticlesByDocIds(data.cards?.selected_ids ?? []),
  ]);

  return (
    <div className="w-full py-10 bg-brand-accent" data-company={data.theme}>
      <SlidesetArticleLists
        data={data}
        slides={slidesResponse.data}
        cards={cardsResponse.data}
      />
    </div>
  );
};

export default SlidesetAticles;